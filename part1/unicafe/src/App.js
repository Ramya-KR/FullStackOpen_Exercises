import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setAll(updatedGood + bad + neutral)
  }

  const handleBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setAll(good + updatedBad + neutral)
  }

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setAll(good + bad + updatedNeutral)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <h2>statistics</h2>
      <p>
        good {good}<br/>
        neutral {neutral}<br/>
        bad {bad}<br/>
        all {all} <br/>
        avergae {(good*1-bad*1)/all} <br/>
        positive {(good/all)*100}%
      </p>
    </div>
  )
} 
  
export default App