import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateOpenRouterResponse, generateNextChoices } from '@/lib/llm/openrouter'

export async function POST(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { sessionId } = params
    console.log('🎯 Generate first turn called for session:', sessionId)

    // Get session with models and story
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        story: true,
        modelA: true,
        modelB: true,
        turns: true
      }
    })

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    // Check if first turn already exists
    if (session.turns.length > 0) {
      return NextResponse.json(
        { message: 'First turn already exists' },
        { status: 200 }
      )
    }

    const firstPrompt = session.story.firstPrompt

    // Generate responses for the first turn
    console.log('🤖 Generating model responses...')
    const [modelAResponse, modelBResponse] = await Promise.all([
      generateOpenRouterResponse(firstPrompt, session.modelA.name, []),
      generateOpenRouterResponse(firstPrompt, session.modelB.name, [])
    ])
    console.log('✅ Model responses generated')

    // Generate next choices for the first turn
    console.log('🎲 Generating next choices...')
    const nextChoices = await generateNextChoices(
      session.storyId,
      [],
      {
        modelA: modelAResponse.response,
        modelB: modelBResponse.response
      }
    )
    console.log('✅ Next choices generated:', JSON.stringify(nextChoices, null, 2))

    // Create the first turn
    console.log('💾 Creating turn in database...')
    const turn = await prisma.turn.create({
      data: {
        sessionId,
        turnNumber: 1,
        userPrompt: firstPrompt,
        modelAResponse: modelAResponse.response,
        modelBResponse: modelBResponse.response,
        nextChoices: nextChoices
      }
    })
    console.log('✅ Turn created with ID:', turn.id)

    return NextResponse.json({
      success: true,
      turnId: turn.id
    })
  } catch (error) {
    console.error('Error generating first turn:', error)
    return NextResponse.json(
      { error: 'Failed to generate first turn' },
      { status: 500 }
    )
  }
}

