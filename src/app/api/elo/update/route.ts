import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateElo, calculateEloTie } from '@/lib/elo'

export async function POST(request: NextRequest) {
  try {
    const { winnerModelId, loserModelId, isTie } = await request.json()

    if (isTie) {
      // Handle tie case
      if (!winnerModelId || !loserModelId) {
        return NextResponse.json(
          { error: 'Both model IDs required for tie' },
          { status: 400 }
        )
      }

      const [model1, model2] = await Promise.all([
        prisma.model.findUnique({ where: { id: winnerModelId } }),
        prisma.model.findUnique({ where: { id: loserModelId } })
      ])

      if (!model1 || !model2) {
        return NextResponse.json(
          { error: 'One or both models not found' },
          { status: 404 }
        )
      }

      const { newRating1, newRating2 } = calculateEloTie(
        model1.eloRating,
        model2.eloRating
      )

      await Promise.all([
        prisma.model.update({
          where: { id: winnerModelId },
          data: { eloRating: newRating1 }
        }),
        prisma.model.update({
          where: { id: loserModelId },
          data: { eloRating: newRating2 }
        })
      ])

      return NextResponse.json({
        success: true,
        newRatings: {
          [winnerModelId]: newRating1,
          [loserModelId]: newRating2
        }
      })
    } else {
      // Handle winner/loser case
      if (!winnerModelId || !loserModelId) {
        return NextResponse.json(
          { error: 'Both winner and loser model IDs required' },
          { status: 400 }
        )
      }

      const [winnerModel, loserModel] = await Promise.all([
        prisma.model.findUnique({ where: { id: winnerModelId } }),
        prisma.model.findUnique({ where: { id: loserModelId } })
      ])

      if (!winnerModel || !loserModel) {
        return NextResponse.json(
          { error: 'One or both models not found' },
          { status: 404 }
        )
      }

      const { winnerNewRating, loserNewRating } = calculateElo(
        winnerModel.eloRating,
        loserModel.eloRating
      )

      await Promise.all([
        prisma.model.update({
          where: { id: winnerModelId },
          data: { eloRating: winnerNewRating }
        }),
        prisma.model.update({
          where: { id: loserModelId },
          data: { eloRating: loserNewRating }
        })
      ])

      return NextResponse.json({
        success: true,
        newRatings: {
          [winnerModelId]: winnerNewRating,
          [loserModelId]: loserNewRating
        }
      })
    }
  } catch (error) {
    console.error('Error updating ELO:', error)
    return NextResponse.json(
      { error: 'Failed to update ELO ratings' },
      { status: 500 }
    )
  }
}
