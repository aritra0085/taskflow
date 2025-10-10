import React from 'react'
import {toast, ToastContainer} from 'react-toastify'
const Login = () => {
  return (
    <div className='max-w-md bg-white w-full shadow-lg border border-purple-100 rounded-xl p-8'>
      <ToastContainer position='top center' autoClose={3000} hideProgressBar/>
      
    </div>
  )
}

export default Login
