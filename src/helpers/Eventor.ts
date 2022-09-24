import { Grid } from '../interfaces'
import { CoordinateArray } from '../types'
import { getNeighborsCoordinate } from './Utils'

export function openCell(grid: Grid, open_x: number, open_y: number) {
  const opened: CoordinateArray[] = []

  let is_gameover = false

  const open_target: CoordinateArray[] = [[open_x, open_y]]

  const pushNeighbors = (x: number, y: number) => {
    const neighbors = getNeighborsCoordinate(x, y)
    neighbors.forEach((neighbor) => open_target.push(neighbor))
  }

  while (open_target.length) {
    const [x, y] = open_target.pop()!

    const cell = grid[`${x}:${y}`]

    if (!cell) continue

    if (
      cell.is_opened &&
      cell.close_bombs === cell.close_flags &&
      x === open_x &&
      y === open_y
    ) {
      pushNeighbors(x, y)
    }

    if (cell.is_opened) continue

    if (cell.is_flagged) continue

    if (cell.is_bomb) {
      is_gameover = true
      break
    }

    cell.is_opened = true
    opened.push([x, y])

    if (cell.close_bombs === 0) {
      pushNeighbors(x, y)
    }
  }

  return { grid, opened, is_gameover }
}

export function flagCell(grid: Grid, x: number, y: number) {
  const cell = grid[`${x}:${y}`]

  const setted: CoordinateArray[] = []

  const updateCloseFlags = (x: number, y: number) => {
    if (!grid[`${x}:${y}`]) return
    grid[`${x}:${y}`].close_flags += cell.is_flagged ? 1 : -1
  }

  if (cell && !cell.is_opened) {
    const flag = !cell.is_flagged
    cell.is_flagged = flag

    const neighbors = getNeighborsCoordinate(x, y)
    neighbors.forEach((neighbor) => {
      updateCloseFlags(neighbor[0], neighbor[1])
    })

    setted.push([x, y])
    return { grid, setted, flag }
  }

  return { grid, setted }
}
