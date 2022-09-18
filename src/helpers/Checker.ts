import { Grid } from '../interfaces'
import { CoordinateArray } from '../types'
import { getGridWidthAndHeight } from '../utils'

export function isGameClear(grid: Grid) {
  const { width, height } = getGridWidthAndHeight(grid)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const cell = grid[`${x}:${y}`]
      if (!cell.is_bomb && !cell.is_opened) return false
    }
  }
  return true
}

export function getAllBombCells(grid: Grid) {
  const { width, height } = getGridWidthAndHeight(grid)
  const cells: CoordinateArray[] = []
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const cell = grid[`${x}:${y}`]
      if (cell.is_bomb) cells.push([x, y])
    }
  }
  return cells
}
