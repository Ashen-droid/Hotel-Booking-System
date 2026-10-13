import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import Rooms from './pages/Rooms'
import './App.css'
import AddRoom from './pages/AddRoom'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/add-room" element={<AddRoom />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App