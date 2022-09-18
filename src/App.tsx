import { useEffect, useState } from 'react'
import './App.css'
import GridContainer from './components/Grid'
import Header from './components/Header'
import { getAllBombCells, isClear } from './helpers/Utils'
import { flagCell, openCell } from './helpers/Eventor'
import {
  generateBombs,
  generateGrid,
  generateNumbers,
} from './helpers/Generator'
import { Cell, Grid } from './interfaces'
import { CoordinateArray } from './types'

enum GameState {
  READY,
  PLAYING,
  WON,
  LOST,
}

function App() {
  const [width, setWidth] = useState(25)
  const [height, setHeight] = useState(25)
  const [bombs, setbombs] = useState(10)
  const [start, setStart] = useState(false)

  const [gamestate, setGameState] = useState(GameState.PLAYING)

  const [grid, setGrid] = useState({})

  useEffect(() => setStart(true), [])

  useEffect(() => {
    setGrid(generateGrid(width, height))
    setGameState(GameState.READY)
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
    if (gamestate === GameState.READY) {
      setGrid(generateNumbers(generateBombs(grid, bombs, [{ x, y }])))
      setGameState(GameState.PLAYING)
    }

    if (!~[GameState.READY, GameState.PLAYING].indexOf(gamestate)) return

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
