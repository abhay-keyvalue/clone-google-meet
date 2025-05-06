import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import Meeting from './pages/meeting/Meeting'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/meeting" element={<Meeting />} />
      </Routes>
    </Router>
  )
}

export default App
