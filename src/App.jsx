import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Profile from './pages/Profile'
import Education from './pages/Education'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import ResumeOutput from './pages/resumeOutput'
import Experience from './pages/Experience'
import Social from './pages/Social'

const App = () => {
  return (
    <div>
      <h1 id='nav-header'>Resume Generator</h1>
      <Navbar />
      <Routes>
        <Route path='/' element={<Profile />} />
        <Route path='/education' element={<Education />} />
        <Route path='/skill' element={<Skills />} />
        <Route path='/experience' element={<Experience />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/social' element={<Social />} />
        <Route path='/output' element={<ResumeOutput />} />
      </Routes>
    </div>
  )
}

export default App