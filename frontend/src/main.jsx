import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      {/* Navbar eka hama page ekema uda penna oni nisa eka Routes walin pitin danawa */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* Issarahata Rooms, Login pages meke add karanawa */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
