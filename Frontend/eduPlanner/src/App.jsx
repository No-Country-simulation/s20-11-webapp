import { useState } from 'react'

import './index.css'
import './App.css'
import Login from './Components/Login'
import { BrowserRouter, Routes, Route, Navigate, redirect } from "react-router-dom"

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
    </Routes>
  </BrowserRouter>
      
    </>
  )
}

export default App
