import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Signup } from './page/Singup'
import Login from './page/Login'

function App() {

  return (
   <div className='bg-[#EBF2FF] min-h-screen'>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login />} />
      </Routes>
   </div>
  )
}

export default App
