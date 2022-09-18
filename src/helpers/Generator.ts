import { Grid } from '../interfaces'
import { CoordinateObject } from '../types'
import { getGridWidthAndHeight, getRandomCoordinate } from './Utils'

export function generate(width: number, height: number, bombs: number) {
  let grid = generateGrid(width, height)
  grid = generateBombs(grid, bombs)
  grid = generateNumbers(grid)
  return grid
}

export function generateGrid(width: number, height: number) {
  const grid: Grid = {}

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      grid[`${x}:${y}`] = {
        x,
        y,
        is_flagged: false,
        is_bomb: false,
        close_bombs: 0,
        is_opened: false,
      }
    }
  }

  return grid
}

export function generateBombs(
  baseGrid: Grid,
  bombs: number,
  excludes: CoordinateObject[] = []
) {
  const grid = { ...baseGrid }
  const { width, height } = getGridWidthAndHeight(grid)

  if (width * height < bombs) {
    bombs = width * height
  }

  for (let i = 0; i < bombs; i++) {
    const { x, y } = getRandomCoordinate(width, height, excludes)
    grid[`${x}:${y}`].is_bomb = true
    excludes.push({ x, y })
  }

  return grid
}

export function generateNumbers(baseGrid: Grid) {
  const grid = { ...baseGrid }
  const { width, height } = getGridWidthAndHeight(grid)

  const countNeighbors = (x: number, y: number) => {
    grid[`${x}:${y}`] && grid[`${x}:${y}`].close_bombs++
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const is_bomb = grid[`${x}:${y}`].is_bomb
      if (!is_bomb) continue
      countNeighbors(x - 1, y - 1)
      countNeighbors(x - 1, y + 1)
      countNeighbors(x + 1, y - 1)
      countNeighbors(x + 1, y)
      countNeighbors(x - 1, y)
      countNeighbors(x + 1, y + 1)
      countNeighbors(x, y - 1)
      countNeighbors(x, y + 1)
    }
  }

  return grid
}
