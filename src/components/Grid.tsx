import { useEffect, useState } from 'react'
import { getGridWidthAndHeight } from '../utils'
import CellContainer from './Cell'
import { Grid } from '../interfaces'
import { CoordinateObject } from '../types'

function GridContainer({
  grid,
  openCell,
  flagCell,
}: {
  grid: Grid
  openCell: Function
  flagCell: Function
}) {
  const { width, height } = getGridWidthAndHeight(grid)

  const [size, setSize] = useState(getGridStyle(width))
  useEffect(() => setSize(getGridStyle(width)), [grid])

  return (
    <div className="minesweeper-grid" style={size}>
      {getCells(width, height)}
    </div>
  )

  function getCells(width: number, height: number) {
    const cells = []

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        cells.push(CellContainer({ x, y, grid, openCell, flagCell }))
      }
    }

    return cells
  }

  function getGridStyle(width: number) {
    return { gridTemplateColumns: `repeat(${width}, 30px)` }
  }
}

export default GridContainer
