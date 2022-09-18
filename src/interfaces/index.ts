import { CoordinateString } from '../types'

export interface Grid {
  [coordinate: CoordinateString]: Cell
}

export interface Cell {
  x: number
  y: number
  is_flagged: boolean
  is_bomb: boolean
  is_opened: boolean
  close_bombs: number
}

export interface GridContainerProps {
  grid: Grid
  listenOpenCell: Function
  listenFlagCell: Function
}

export interface CellContainerProps {
  x: number
  y: number
  grid: Grid
  listenOpenCell: Function
  listenFlagCell: Function
}
