import React from 'react'
import { Cell, CellContainerProps, Grid } from '../interfaces'
import { CoordinateString } from '../types'

function CellContainer({
  x,
  y,
  grid,
  listenOpenCell,
  listenFlagCell,
}: CellContainerProps) {
  const key: CoordinateString = `${x}:${y}`

  return (
    <div
      key={key}
      className={`minesweeper-cell ${getCellClass(grid[key])}`}
      onClick={clickCell}
      onContextMenu={clickCell}
    >
      {getCellContent(grid[key])}
    </div>
  )

  function getCellClass({
    close_bombs,
    is_opened,
    is_bomb,
  }: Pick<Cell, 'close_bombs' | 'is_opened' | 'is_bomb'>) {
    const classNames = ['cell']

    if (is_opened) {
      classNames.push('opened')
    }

    if (is_opened && is_bomb) {
      classNames.push('bomb')
    }

    if (is_opened && close_bombs) {
      classNames.push(`close-bombs-${close_bombs}`)
    }

    return classNames.join(' ')
  }

  function getCellContent({
    is_flagged,
    is_opened,
    is_bomb,
    close_bombs,
  }: Pick<Cell, 'is_flagged' | 'is_opened' | 'is_bomb' | 'close_bombs'>) {
    if (is_flagged) {
      return '🚩'
    } else if (!is_opened) {
      return ''
    } else if (is_bomb) {
      return '💣'
    } else if (close_bombs) {
      return close_bombs + ''
    }
  }

  function clickCell(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault()
    if (event.type === 'click') {
      listenOpenCell(x, y)
    } else if (event.type === 'contextmenu') {
      listenFlagCell(x, y)
    }
  }
}

export default CellContainer
