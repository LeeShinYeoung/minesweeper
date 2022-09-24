import { useEffect, useState } from 'react'
import { getGridDimension } from '../helpers/Utils'
import CellContainer from './Cell'
import { GridContainerProps } from '../interfaces'

function GridContainer({
  grid,
  listenCellLeftClick,
  listenCellRightClick,
}: GridContainerProps) {
  const { width, height } = getGridDimension(grid)

  const [size, setSize] = useState(getGridStyle(width))
  useEffect(() => setSize(getGridStyle(width)), [grid, width])

  return (
    <div className="minesweeper-grid" style={size}>
      {getCells(width, height)}
    </div>
  )

  function getCells(width: number, height: number) {
    const cells = []

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        cells.push(
          CellContainer({
            x,
            y,
            grid,
            listenCellLeftClick,
            listenCellRightClick,
          })
        )
      }
    }

    return cells
  }

  function getGridStyle(width: number) {
    return { gridTemplateColumns: `repeat(${width}, 30px)` }
  }
}

export default GridContainer
