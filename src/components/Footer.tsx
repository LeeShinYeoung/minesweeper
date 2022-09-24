import { Dispatch, SetStateAction } from 'react'

function Footer({
  setStart,
  width,
  setWidth,
  height,
  setHeight,
  bombs,
  setBombs,
}: {
  setStart: Dispatch<SetStateAction<boolean>>
  width: number
  setWidth: Dispatch<SetStateAction<number>>
  height: number
  setHeight: Dispatch<SetStateAction<number>>
  bombs: number
  setBombs: Dispatch<SetStateAction<number>>
}) {
  return (
    <div className="minesweeper-footer">
      <div>
        <button onClick={setGame(10, 10, 10)}>Beginner</button>
        <button onClick={setGame(16, 16, 40)}>Intermediate</button>
        <button onClick={setGame(30, 16, 99)}>Advanced</button>
        <button>Custom</button>
      </div>
    </div>
  )

  function setGame(width: number, height: number, bombs: number) {
    return () => {
      setWidth(width)
      setHeight(height)
      setBombs(bombs)
      setStart(true)
    }
  }
}

export default Footer
