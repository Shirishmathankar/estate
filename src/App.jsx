import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1 className='text-red-500'>hello from client</h1>
      </div>
    </>
  )
}

export default App
