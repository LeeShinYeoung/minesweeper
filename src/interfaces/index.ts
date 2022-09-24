import { CoordinateString } from '../types'

export enum GameState {
  READY,
  PLAYING,
  WON,
  LOST,
}

export enum CellContent {
  CLOSED = '',
  BOMB = '💣',
  FLAG = '🚩',
}

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
  close_flags: number
}

export interface GridContainerProps {
  grid: Grid
  listenCellLeftClick: Function
  listenCellRightClick: Function
}

export interface CellContainerProps {
  x: number
  y: number
  grid: Grid
  listenCellLeftClick: Function
  listenCellRightClick: Function
}
