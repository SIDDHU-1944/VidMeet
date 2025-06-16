import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css'
import LandingPage from './pages/landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { AuthProvider } from './contexts/AuthContext';
import VideoMeetComponent from './components/VideoMeet/VideoMeet';
import Home from './pages/Home';
import History from './pages/History';

function App() {

  return (
    <>
      <Router>

        <AuthProvider>
          <Routes>

            <Route path='/' element={<LandingPage/>}></Route>

            <Route path='/auth' element={<SignIn/>}></Route>

            <Route path='/signup' element={<SignUp/>}></Route>
            
            <Route path='/:url' element={<VideoMeetComponent/>}></Route>

            <Route path='/home' element={<Home/>}></Route>
            
            <Route path='/history' element={<History/>}></Route>
            
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
