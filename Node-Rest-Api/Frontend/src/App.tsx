import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/Login'
import SignupPage from './pages/Signup'
import DashboardPage from './pages/Dashboard'
import ProfilePage from './pages/Profilepage'

function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/dashboard' element={<DashboardPage/>} />
        <Route path='/profile' element={<ProfilePage/>} />
      </Routes>
     </Router>
    </>
  )
  
}

export default App

