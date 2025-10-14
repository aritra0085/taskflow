import React, { useState } from 'react'
import {toast, ToastContainer} from 'react-toastify'
import {BACK_BUTTON} from '../assets/dummy'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const API_URL = 'http://localhost:4000'

const Profile = ({setCurrentUser,onLogout}) => {

    const [profile, setProfile] = useState ({name: '', email: ''})
    const [passwords, setPasswords] = useState({current: '', new: '', confirm: ''})
    const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-gray-50'>
      <ToastContainer position='top-center' autoClose={3000} />
        <div className='max-w-4xl mx-auto p-6'>
            <button onClick={() => navigate(-1)} className={BACK_BUTTON}> 
                <ChevronLeft className='w-5 h-5 mr-1' />
                Back to Dashboard
            </button>

            <div>

            </div>

        </div>
    </div>
  )
}

export default Profile
