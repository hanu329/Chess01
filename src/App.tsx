import { useState } from 'react'

import ChessBoard from './components/ChessBoard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      hello
      <ChessBoard />
    </div>
  )
}

export default App
