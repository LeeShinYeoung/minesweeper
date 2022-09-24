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
        <button onClick={toggleCustomModal}>Custom</button>
      </div>

      <div className="custom-modal">
        <div className="overlay" onClick={toggleCustomModal}></div>
        <div className="content">
          {InputForm('↔️', customWidth, setCustomWidth)}
          {InputForm('↕️', customHeight, setCustomHeight)}
          {InputForm(CellContent.BOMB, customBombs, setCustomBombs)}
          <div>
            <button
              onClick={() => {
                const result = setGame(customWidth, customHeight, customBombs)
                if (result) toggleCustomModal()
              }}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  function toggleCustomModal() {
    const modal = document.querySelector('.custom-modal')
    if (modal) {
      modal.classList.toggle('open')
    }
  }

  function setGame(width: number, height: number, bombs: number) {
    if (width * height <= bombs) {
      alert('Too many bombs')
      return false
    }

    if (width < 2 || height < 2) {
      alert('The minimum width and height is 2')
      return false
    }

    if (width * height > 3600) {
      alert('The maximum number of cells is 3600.')
      return false
    }

    setWidth(width)
    setHeight(height)
    setBombs(bombs)
    setStart(true)
    return true
  }
}

function InputForm(
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
          onChange={(event) => set(+event.target.value)}
        />
      </label>
    </div>
  )
}

export default Footer
