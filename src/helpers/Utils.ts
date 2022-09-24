import { Grid } from '../interfaces'
import { CoordinateArray, CoordinateObject } from '../types'

export function getGridDimension(grid: Grid): {
  width: number
  height: number
} {
  return Object.values(grid).reduce(
    (acc, { x, y }) => {
      if (x > acc.width) acc.width = x + 1
      if (y > acc.height) acc.height = y + 1
      return acc
    },
    { width: 0, height: 0 }
  )
}

export function getAllBombCells(grid: Grid) {
  const { width, height } = getGridDimension(grid)
  const cells: CoordinateArray[] = []
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const cell = grid[`${x}:${y}`]
      if (cell.is_bomb) cells.push([x, y])
    }
  }
  return cells
}

export function isClear(grid: Grid) {
  const { width, height } = getGridDimension(grid)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const cell = grid[`${x}:${y}`]
      if (!cell.is_bomb && !cell.is_opened) return false
    }
  }
  return true
}

export function getNeighborsCoordinate(
  x: number,
  y: number
): CoordinateArray[] {
  return [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
  ]
}

export function getRandomCoordinate(
  max_x: number,
  max_y: number,
  excludes: CoordinateObject[] = []
): CoordinateObject {
  let random_x = Math.round(Math.random() * (max_x - 1))
  let random_y = Math.round(Math.random() * (max_y - 1))

  const is_exclude = excludes.find(
    ({ x: exclude_x, y: exclude_y }: CoordinateObject) =>
      exclude_x === random_x && exclude_y === random_y
  )

  if (is_exclude) {
    const { x, y } = getRandomCoordinate(max_x, max_y, excludes)
    random_x = x
    random_y = y
  }

  return { x: random_x, y: random_y }
}
