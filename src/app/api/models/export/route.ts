import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function escapeCsv(value: unknown): string {
  const str = value === null || value === undefined ? '' : String(value)
  const needsQuotes = /[",\n]/.test(str)
  const escaped = str.replace(/"/g, '""')
  return needsQuotes ? `"${escaped}"` : escaped
}

export async function GET() {
  try {
    const models = await prisma.model.findMany({
      orderBy: { eloRating: 'desc' },
    })

    const header = [
      'id',
      'name',
      'displayName',
      'eloRating',
      'clarity',
      'empathy',
      'helpfulness',
      'overall',
    ]

    const rows = models.map((m) => {
      const score = (m.eloRating / 200).toFixed(1)
      return [
        m.id,
        m.name,
        m.displayName,
        m.eloRating,
        `${score}/10`,
        `${score}/10`,
        `${score}/10`,
        `${score}/10`,
      ]
    })

    const csv = [
      header.map(escapeCsv).join(','),
      ...rows.map((r) => r.map(escapeCsv).join(',')),
    ].join('\n')

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="leaderboard.csv"',
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    console.error('Error exporting models:', error)
    return NextResponse.json(
      { error: 'Failed to export models' },
      { status: 500 }
    )
  }
}


