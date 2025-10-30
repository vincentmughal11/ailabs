import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateOpenRouterResponse, generateNextChoices, generateFinalChoices } from '@/lib/llm/openrouter'

export async function POST(request: NextRequest) {
  try {
    const { sessionId, userPrompt } = await request.json()

    if (!sessionId || !userPrompt) {
      return NextResponse.json(
        { error: 'Missing required fields: sessionId, userPrompt' },
        { status: 400 }
      )
    }

    // Get session with models
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        modelA: true,
        modelB: true,
        turns: {
          orderBy: { turnNumber: 'asc' }
        }
      }
    })

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    // Build conversation history
    const conversationHistory = session.turns.flatMap(turn => [
      { role: 'user' as const, content: turn.userPrompt },
      { role: 'assistant' as const, content: turn.modelAResponse },
      { role: 'assistant' as const, content: turn.modelBResponse }
    ])

    // Generate responses from both models in parallel
    const [modelAResponse, modelBResponse] = await Promise.all([
      generateOpenRouterResponse(userPrompt, session.modelA.name, conversationHistory),
      generateOpenRouterResponse(userPrompt, session.modelB.name, conversationHistory)
    ])

    // Generate next choices based on turn count
    const turnNumber = session.turns.length + 1
    let nextChoices = null

    // If this is turn 8 or beyond, mark session as completed and don't generate choices
    if (turnNumber >= 8) {
      await prisma.session.update({
        where: { id: sessionId },
        data: {
          status: 'COMPLETED',
          completedAt: new Date()
        }
      })
    } else {
      // Generate choices based on turn count
      if (turnNumber >= 5) {
        // Generate final choices (turns 5-7)
        nextChoices = await generateFinalChoices(
          session.storyId,
          conversationHistory,
          {
            modelA: modelAResponse.response,
            modelB: modelBResponse.response
          }
        )
      } else {
        // Generate standard next choices (turns 1-4)
        nextChoices = await generateNextChoices(
          session.storyId,
          conversationHistory,
          {
            modelA: modelAResponse.response,
            modelB: modelBResponse.response
          }
        )
      }
    }

    // Create turn
    const turn = await prisma.turn.create({
      data: {
        sessionId,
        turnNumber,
        userPrompt,
        modelAResponse: modelAResponse.response,
        modelBResponse: modelBResponse.response,
        nextChoices: nextChoices
      }
    })

    // If no choices generated (final turn), mark session as completed
    if (!nextChoices && turnNumber >= 8) {
      return NextResponse.json({
        turnId: turn.id,
        turnNumber: turn.turnNumber,
        modelAResponse: modelAResponse.response,
        modelBResponse: modelBResponse.response,
        nextChoices: [],
        sessionCompleted: true
      })
    }

    return NextResponse.json({
      turnId: turn.id,
      turnNumber: turn.turnNumber,
      modelAResponse: modelAResponse.response,
      modelBResponse: modelBResponse.response,
      nextChoices
    })
  } catch (error) {
    console.error('Error creating turn:', error)
    return NextResponse.json(
      { error: 'Failed to create turn' },
      { status: 500 }
    )
  }
}
