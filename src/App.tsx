import { useEffect, useState } from 'react'
import './App.css'
import GridContainer from './components/Grid'
import Header from './components/Header'
import { getAllBombCells, isClear } from './helpers/Utils'
import { flagCell, openCell } from './helpers/Eventor'
import { generate } from './helpers/Generator'
import { Cell, Grid } from './interfaces'
import { CoordinateArray } from './types'

enum GameState {
  PLAYING,
  WON,
  LOST,
}

function App() {
  const [width, setWidth] = useState(10)
  const [height, setHeight] = useState(10)
  const [bombs, setbombs] = useState(5)
  const [start, setStart] = useState(false)

  const [gamestate, setGameState] = useState(GameState.PLAYING)

  const [grid, setGrid] = useState({})

  useEffect(() => setStart(true), [])

  useEffect(() => {
    setGrid(generate(width, height, bombs))
    setGameState(GameState.PLAYING)
    setStart(false)
  }, [start])

  return (
    <div className="minesweeper-wrapper">
      <Header />
      <GridContainer
        grid={grid}
        listenOpenCell={listenOpenCell}
        listenFlagCell={listenFlagCell}
      />
    </div>
  )

  function listenOpenCell(x: number, y: number) {
    if (gamestate !== GameState.PLAYING) return

    const { opened, is_gameover } = openCell(grid, x, y)

    if (is_gameover) {
      setGameLost()
      return
    }

    updateCells(opened, { is_opened: true })

    if (isClear(grid)) {
      setGameWon()
      return
    }
  }

  function listenFlagCell(x: number, y: number) {
    if (gamestate !== GameState.PLAYING) return

    const { setted, flag } = flagCell(grid, x, y)
    updateCells(setted, { is_flagged: flag })
  }

  function setGameWon() {
    setGameState(GameState.WON)
  }

  function setGameLost() {
    const cells = getAllBombCells(grid)

    updateCells(cells, { is_opened: true })
    setGameState(GameState.LOST)
  }

  function updateCells(
    target: CoordinateArray[],
    value: Partial<Pick<Cell, 'is_flagged' | 'is_opened'>>
  ) {
    target.forEach(([x, y]: CoordinateArray) => {
      setGrid((prev: Grid) => {
        return {
          ...prev,
          [`${x}:${y}`]: {
            ...prev[`${x}:${y}`],
            ...value,
          },
        }
      })
    })
  }
}

export default App
