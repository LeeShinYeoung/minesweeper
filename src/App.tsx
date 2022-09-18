import { useEffect, useState } from 'react'
import './App.css'
import GridContainer from './components/Grid'
import { generate } from './helpers/Generator'

function App() {
  const [width, setWidth] = useState(10)
  const [height, setHeight] = useState(10)
  const [bombs, setbombs] = useState(10)
  const [start, setStart] = useState(false)

  const [grid, setGrid] = useState({})

  useEffect(() => setStart(true), [])

  useEffect(() => {
    setGrid(generate(width, height, bombs))
    setStart(false)
  }, [start])

  return (
    <div className="App">
      <GridContainer grid={grid} openCell={openCell} flagCell={flagCell} />
    </div>
  )

  function openCell() {}

  function flagCell() {}
}

export default App
