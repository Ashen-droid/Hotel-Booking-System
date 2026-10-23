import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import Rooms from './pages/Rooms'
import AddRoom from './pages/AddRoom'
import Register from './pages/Register'
import Login from './pages/Login'
import BookRoom from './pages/BookRoom'
import MyBookings from './pages/MyBookings'
import AdminDashboard from './pages/AdminDashboard'
import AdminRoute from './AdminRoute'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book/:roomId" element={<BookRoom />} />
        <Route path="/my-bookings" element={<MyBookings />} />

        <Route
          path="/add-room"
          element={
            <AdminRoute>
              <AddRoom />
            </AdminRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App