"use client";

import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
/* eslint-disable @typescript-eslint/no-explicit-any */

const ResetPasswordPage = () => {
const router = useRouter();
const [token, setToken] = useState("");
const [password, setPassword] = useState("");
  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken || '');
  }, [])


const resetPassword = async () => {
  if (!password) {
      console.log("Please enter a new password.");
      return;
    }
  try {
    const response = await axios.post('/api/users/resetpassword', {
      token,
      password
    });
    console.log("Password reset successful: ", response.data);
    router.push('/login'); // Redirect to login page after successful reset

  } catch (error:any) {
    console.log("Error resetting password: ", error.message);
    // Optionally, you can show an error message to the user
  }
}

function handleChange(e:any){
    setPassword(e.target.value);
}

  return (
    <div>
      <h1 className='text-4xl'>Reset Password</h1>
      <h2 className='p-2 bg-orange-500 text-2xl'>{token ? `${token}`:'no token'}</h2>
      <p className='text-lg'>Please enter your new password below:</p>
      <input 
      onChange={handleChange}
        type="text" 
        value={password}
        placeholder='Enter the New Password' 
        className='block w-2xl px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2'
      />
      <button 
        onClick={resetPassword} 
        className='block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 mt-2'
      >
        Reset Password
      </button>
    </div>
  )
}

export default ResetPasswordPage;
