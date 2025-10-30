/**
 * Calculate ELO rating changes based on match results
 * @param winnerRating Current ELO rating of the winner
 * @param loserRating Current ELO rating of the loser
 * @param K K-factor for rating volatility (default: 32)
 * @returns Object with new ratings for both players
 */
export function calculateElo(
  winnerRating: number,
  loserRating: number,
  K: number = 32
): { winnerNewRating: number; loserNewRating: number } {
  // Calculate expected scores
  const expectedWinner = 1 / (1 + Math.pow(10, (loserRating - winnerRating) / 400))
  const expectedLoser = 1 / (1 + Math.pow(10, (winnerRating - loserRating) / 400))

  // Calculate new ratings
  const winnerNewRating = Math.round(winnerRating + K * (1 - expectedWinner))
  const loserNewRating = Math.round(loserRating + K * (0 - expectedLoser))

  return {
    winnerNewRating: Math.max(winnerNewRating, 0), // Ensure rating doesn't go below 0
    loserNewRating: Math.max(loserNewRating, 0)
  }
}

/**
 * Calculate ELO rating changes for a tie
 * @param rating1 Current ELO rating of player 1
 * @param rating2 Current ELO rating of player 2
 * @param K K-factor for rating volatility (default: 32)
 * @returns Object with new ratings for both players
 */
export function calculateEloTie(
  rating1: number,
  rating2: number,
  K: number = 32
): { newRating1: number; newRating2: number } {
  // Calculate expected scores
  const expected1 = 1 / (1 + Math.pow(10, (rating2 - rating1) / 400))
  const expected2 = 1 / (1 + Math.pow(10, (rating1 - rating2) / 400))

  // Calculate new ratings (0.5 points for each player in a tie)
  const newRating1 = Math.round(rating1 + K * (0.5 - expected1))
  const newRating2 = Math.round(rating2 + K * (0.5 - expected2))

  return {
    newRating1: Math.max(newRating1, 0),
    newRating2: Math.max(newRating2, 0)
  }
}
