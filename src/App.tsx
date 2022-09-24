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
import { Cell, GameState, Grid } from './interfaces'
import { CoordinateArray } from './types'
import Footer from './components/Footer'

function App() {
  const [width, setWidth] = useState(9)
  const [height, setHeight] = useState(9)
  const [bombs, setbombs] = useState(10)
  const [gamestate, setGameState] = useState(GameState.READY)
  const [start, setStart] = useState(false)
  const [grid, setGrid] = useState({})

  const [leftoverBombs, setLeftoverBombs] = useState(bombs)
  const [timer, setTimer] = useState(0)

  useEffect(() => setStart(true), [])

  useEffect(startEffect, [start])

  useEffect(gameStatueEffect, [gamestate])

  return (
    <div className="minesweeper-wrapper">
      <Header
        setStart={setStart}
        timer={timer}
        gameState={gamestate}
        leftoverBombs={leftoverBombs}
      />
      <GridContainer
        grid={grid}
        listenCellLeftClick={listenCellLeftClick}
        listenCellRightClick={listenCellRightClick}
      />
      <Footer
        setStart={setStart}
        width={width}
        setWidth={setWidth}
        height={height}
        setHeight={setHeight}
        bombs={bombs}
        setBombs={setbombs}
      />
    </div>
  )

  function startEffect() {
    setTimer(0)
    setGrid(generateGrid(width, height))
    setGameState(GameState.READY)
    setLeftoverBombs(bombs)
    setStart(false)
  }

  function gameStatueEffect() {
    if (gamestate === GameState.PLAYING) {
      const interval = setInterval(() => {
        setTimer((timer) => timer + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }

  function listenCellLeftClick(x: number, y: number) {
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

  function listenCellRightClick(x: number, y: number) {
    if (gamestate !== GameState.PLAYING) return

    const { setted, flag } = flagCell(grid, x, y)

    if (setted.length) {
      updateCells(setted, { is_flagged: flag })
      setLeftoverBombs(flag ? leftoverBombs - 1 : leftoverBombs + 1)
    }
  }

  function setGameWon() {
    const cells = getAllBombCells(grid)

    updateCells(cells, { is_flagged: true })
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
