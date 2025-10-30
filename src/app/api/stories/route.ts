import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const stories = await prisma.story.findMany({
      orderBy: { createdAt: 'asc' }
    })

    console.log('📚 Stories API returning:', {
      count: stories.length,
      stories: stories.map(s => ({
        id: s.id,
        title: s.title,
        hasFirstPrompt: !!s.firstPrompt,
        firstPromptLength: s.firstPrompt?.length || 0
      }))
    });

    return NextResponse.json(stories)
  } catch (error) {
    console.error('Error fetching stories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stories' },
      { status: 500 }
    )
  }
}
