import { Grid } from '../interfaces'
import { CoordinateObject, CoordinateString } from '../types'

export function getGridWidthAndHeight(grid: Grid): {
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

export function printGrid(grid: Grid, text?: string) {
  const { width, height } = getGridWidthAndHeight(grid)

  let canvas = ''
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const k: CoordinateString = `${x}:${y}`
      if (grid[k].is_opened) canvas += 'X '
      else if (grid[k].is_bomb) canvas += '$ '
      else if (grid[k].close_bombs) canvas += grid[k].close_bombs + ' '
      else canvas += '# '
    }
    canvas += '\n'
  }
  console.log(canvas, text || '')
}
