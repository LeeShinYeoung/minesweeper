import { Dispatch, SetStateAction } from 'react'
import { GameState } from '../interfaces'

function Header({
  gameState,
  setStart,
  leftoverBombs,
  timer,
}: {
  gameState: GameState
  setStart: Dispatch<SetStateAction<boolean>>
  leftoverBombs: number
  timer: number
}) {
  return (
    <div className="minesweeper-header">
      <div>
        <div className="timer">🕒 {timer}</div>
      </div>
      <div>
        <button
          className="reset"
          onClick={() => {
            setStart(true)
          }}
        >
          {getFace(gameState)}
        </button>
      </div>
      <div>
        <div className="left-bombs">💣 {leftoverBombs}</div>
      </div>
    </div>
  )

  function getFace(gameState: GameState) {
    switch (gameState) {
      case GameState.READY:
        return '🙂'
      case GameState.PLAYING:
        return '🤔'
      case GameState.WON:
        return '😎'
      case GameState.LOST:
        return '🗿'
    }
  }
}

export default Header
