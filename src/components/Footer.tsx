import { Dispatch, SetStateAction, useState } from 'react'
import { CellContent } from '../interfaces'

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
  const [customWidth, setCustomWidth] = useState(width)
  const [customHeight, setCustomHeight] = useState(height)
  const [customBombs, setCustomBombs] = useState(bombs)

  return (
    <div className="minesweeper-footer">
      <div>
        <button onClick={() => setGame(10, 10, 10)}>Beginner</button>
        <button onClick={() => setGame(16, 16, 40)}>Intermediate</button>
        <button onClick={() => setGame(30, 16, 99)}>Advanced</button>
        <button>Custom</button>
      </div>

      <div className="custom-modal">
        <div className="overlay"></div>
        <div className="content">
          {inputForm('↔️', width, setCustomWidth)}
          {inputForm('↕️', height, setCustomHeight)}
          {inputForm(CellContent.BOMB, bombs, setCustomBombs)}
          <div>
            <button>Apply</button>
          </div>
        </div>
      </div>
    </div>
  )

  function inputForm(
    content: string,
    value: number,
    set: Dispatch<SetStateAction<number>>
  ) {
    return (
      <div className="input-form">
        <label>
          <span>{content}</span>
          <input
            type="number"
            value={value}
            onChange={(event) => setCustom(event, set)}
          />
        </label>
      </div>
    )
  }

  function setCustom(
    event: React.ChangeEvent<HTMLInputElement>,
    set: Dispatch<SetStateAction<number>>
  ) {
    console.log(event.target.value)
    set(+event.target.value)
  }

  function setGame(width: number, height: number, bombs: number) {
    setWidth(width)
    setHeight(height)
    setBombs(bombs)
    setStart(true)
  }
}

export default Footer
