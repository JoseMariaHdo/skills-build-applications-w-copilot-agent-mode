import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <header>
        <h1>🐙 OctoFit Tracker</h1>
        <p>Your fitness companion powered by GitHub Copilot</p>
      </header>
      <main>
        <section className="hero">
          <h2>Welcome to OctoFit Tracker</h2>
          <p>Track your fitness goals and progress with ease.</p>
          <button onClick={() => setCount((count) => count + 1)}>
            Count is {count}
          </button>
        </section>
      </main>
    </div>
  )
}

export default App
