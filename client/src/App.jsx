import React from 'react'
import { Container } from '@material-ui/core'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import PostDetails from './components/PostDetails/PostDetails'

const App = () => {
  return (
    <Router>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/" element={<Navigate replace to="/posts" />} />
          <Route
            path="/auth"
            element={
              <ProtectedRoutes>
                <Auth />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </Container>
    </Router>
  )
}

export function ProtectedRoutes(props) {
  const user = JSON.parse(localStorage.getItem('profile'));
  if (!user) {
    return props.children
  } else {
    return <Navigate to="/posts" />
  }
}

export default App
