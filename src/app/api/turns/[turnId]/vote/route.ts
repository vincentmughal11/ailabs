import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateElo, calculateEloTie } from '@/lib/elo'

export async function POST(
  request: NextRequest,
  { params }: { params: { turnId: string } }
) {
  try {
    const { turnId } = params
    const { vote } = await request.json()

    if (!vote || !['MODEL_A', 'MODEL_B', 'TIE'].includes(vote)) {
      return NextResponse.json(
        { error: 'Invalid vote. Must be MODEL_A, MODEL_B, or TIE' },
        { status: 400 }
      )
    }

    // Get turn with session and models
    const turn = await prisma.turn.findUnique({
      where: { id: turnId },
      include: {
        session: {
          include: {
            modelA: true,
            modelB: true
          }
        }
      }
    })

    if (!turn) {
      return NextResponse.json(
        { error: 'Turn not found' },
        { status: 404 }
      )
    }

    // Update turn with vote
    console.log('📝 Updating turn with vote:', { turnId, vote })
    await prisma.turn.update({
      where: { id: turnId },
      data: { vote: vote as any }
    })
    console.log('✅ Turn updated successfully')

    // Create vote record and update ELO ratings
    let voteRecord
    if (vote === 'TIE') {
      // Handle tie
      const { newRating1, newRating2 } = calculateEloTie(
        turn.session.modelA.eloRating,
        turn.session.modelB.eloRating
      )

      voteRecord = await prisma.vote.create({
        data: {
          sessionId: turn.sessionId,
          turnId,
          isTie: true
        }
      })

      // Update both models' ratings
      await Promise.all([
        prisma.model.update({
          where: { id: turn.session.modelAId },
          data: { eloRating: newRating1 }
        }),
        prisma.model.update({
          where: { id: turn.session.modelBId },
          data: { eloRating: newRating2 }
        })
      ])
    } else {
      // Handle winner/loser
      const winnerModel = vote === 'MODEL_A' ? turn.session.modelA : turn.session.modelB
      const loserModel = vote === 'MODEL_A' ? turn.session.modelB : turn.session.modelA

      const { winnerNewRating, loserNewRating } = calculateElo(
        winnerModel.eloRating,
        loserModel.eloRating
      )

      voteRecord = await prisma.vote.create({
        data: {
          sessionId: turn.sessionId,
          turnId,
          winnerModelId: winnerModel.id,
          loserModelId: loserModel.id,
          isTie: false
        }
      })

      // Update both models' ratings
      await Promise.all([
        prisma.model.update({
          where: { id: winnerModel.id },
          data: { eloRating: winnerNewRating }
        }),
        prisma.model.update({
          where: { id: loserModel.id },
          data: { eloRating: loserNewRating }
        })
      ])
    }

    return NextResponse.json({
      success: true,
      voteId: voteRecord.id
    })
  } catch (error) {
    console.error('Error processing vote:', error)
    return NextResponse.json(
      { error: 'Failed to process vote' },
      { status: 500 }
    )
  }
}
