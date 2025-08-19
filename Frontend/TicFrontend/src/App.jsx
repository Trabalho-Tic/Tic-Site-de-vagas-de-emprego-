import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='bg-blue-500 p-2 border-2 rounded-2xl'>
      <p>Ola mundo</p>
    </div>
    </>
  )
}

export default App
