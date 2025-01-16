import { useState } from 'react'

import './index.css'
import './App.css'
import Login from './Components/Login'
import { BrowserRouter, Routes, Route, Navigate, redirect } from "react-router-dom"
import HomeStudent from './Components/HomeStudent'
import HomeCoordinator from './Components/HomeCoordinator'

function App() {
  

  return (
    <><BrowserRouter>
      <Routes>
    
        {
          <Route
            path="/login" element={
              <div>                
                <Login />
              </div>
            }
          />
        }
        {
          <Route
            path="/homestudent" element={
              <div>                
                <HomeStudent/>
              </div>
            }
          />
        } 
        {
          <Route
            path="/homecoordinator" element={
              <div>                
                <HomeCoordinator/>
              </div>
            }
          />
        }        
    </Routes>
  </BrowserRouter>
      
    </>
  )
}

export default App
