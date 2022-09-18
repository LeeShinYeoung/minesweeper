import { Grid } from '../interfaces'
import { CoordinateArray } from '../types'

export function openCell(grid: Grid, x: number, y: number) {
  const opened: CoordinateArray = []

  let is_gameover = false

  const open_target: CoordinateArray = [[x, y]]
  while (open_target.length) {
    const [x, y] = open_target.pop()!

    const cell = grid[`${x}:${y}`]

    if (!cell) continue

    if (cell.is_opened) continue

    if (cell.is_flagged) continue

    if (cell.is_bomb) {
      is_gameover = true
      break
    }

    cell.is_opened = true
    opened.push([x, y])

    if (cell.close_bombs === 0) {
      open_target.push([x - 1, y - 1])
      open_target.push([x - 1, y])
      open_target.push([x - 1, y + 1])
      open_target.push([x, y - 1])
      open_target.push([x, y + 1])
      open_target.push([x + 1, y - 1])
      open_target.push([x + 1, y])
      open_target.push([x + 1, y + 1])
    }
  }

  return { grid, opened, is_gameover }
}

export function flagCell(grid: Grid, x: number, y: number) {
  const cell = grid[`${x}:${y}`]
  cell.is_flagged = !cell.is_flagged
  return { grid, flag: cell.is_flagged }
}
