import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { storyId, userId } = await request.json()

    if (!storyId || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields: storyId, userId' },
        { status: 400 }
      )
    }

    // Get all available models
    const models = await prisma.model.findMany()
    
    if (models.length < 2) {
      return NextResponse.json(
        { error: 'Not enough models available' },
        { status: 500 }
      )
    }

    // Randomly select 2 different models
    const shuffled = models.sort(() => 0.5 - Math.random())
    const modelA = shuffled[0]
    const modelB = shuffled[1]

    // Get the story to get the first prompt
    const story = await prisma.story.findUnique({
      where: { id: storyId }
    })

    if (!story) {
      return NextResponse.json(
        { error: 'Story not found' },
        { status: 404 }
      )
    }

    // Create session
    const session = await prisma.session.create({
      data: {
        userId,
        storyId,
        modelAId: modelA.id,
        modelBId: modelB.id,
        status: 'IN_PROGRESS'
      },
      include: {
        story: true,
        modelA: true,
        modelB: true
      }
    })

    // Return session ID immediately so user can navigate to chat page
    const responseData = {
      sessionId: session.id,
      story: session.story,
      modelA: {
        id: session.modelA.id,
        displayName: session.modelA.displayName
      },
      modelB: {
        id: session.modelB.id,
        displayName: session.modelB.displayName
      }
    }

    return NextResponse.json(responseData)
  } catch (error) {
    console.error('Error creating session:', error)
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    )
  }
}
