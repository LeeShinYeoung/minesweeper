function CellContainer({ x, y, grid, openCell, flagCell }: any) {
  const key = `${x}:${y}`

  return (
    <div className="minesweeper-cell" key={key}>
      {x} {y}
    </div>
  )
}

export default CellContainer
