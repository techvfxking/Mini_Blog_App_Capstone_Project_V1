import React from 'react'
import { Container } from '@material-ui/core'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'

const App = () => {
  return (
    <Router>

      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App
