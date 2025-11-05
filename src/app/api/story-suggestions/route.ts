import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const suggestions = await prisma.storySuggestion.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(suggestions)
  } catch (error) {
    console.error('Error fetching story suggestions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch story suggestions' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, category, agreedToTerms } = body ?? {}

    if (!title || !description || !category) {
      return NextResponse.json(
        { error: 'title, description, and category are required' },
        { status: 400 }
      )
    }

    if (!agreedToTerms) {
      return NextResponse.json(
        { error: 'You must agree to the terms' },
        { status: 400 }
      )
    }

    const created = await prisma.storySuggestion.create({
      data: {
        title,
        description,
        category,
        agreedToTerms,
      },
    })

    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error('Error creating story suggestion:', error)
    return NextResponse.json(
      { error: 'Failed to create story suggestion' },
      { status: 500 }
    )
  }
}

