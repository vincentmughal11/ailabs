import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const reports = await prisma.report.findMany({
      orderBy: { createdAt: 'desc' },
      take: 200,
      select: {
        id: true,
        sessionId: true,
        turnId: true,
        model: true,
        reason: true,
        details: true,
        createdAt: true,
      },
    })
    return NextResponse.json(reports)
  } catch (error) {
    console.error('Error fetching reports:', error)
    return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { sessionId, turnId, model = 'UNKNOWN', reason, details, modelAName = '', modelBName = '', modelAResponse = '', modelBResponse = '' } = body ?? {}

    if (!sessionId || !turnId || !reason) {
      return NextResponse.json({ error: 'sessionId, turnId, and reason are required' }, { status: 400 })
    }

    const created = await prisma.report.create({
      data: {
        sessionId,
        turnId,
        model,
        reason,
        details: details ?? '',
        modelAName,
        modelBName,
        modelAResponse,
        modelBResponse,
      },
    })

    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error('Error creating report:', error)
    return NextResponse.json({ error: 'Failed to create report' }, { status: 500 })
  }
}


