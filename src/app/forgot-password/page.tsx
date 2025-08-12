"use client";
import React,{useState} from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';



const forgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    function handleChange(e:any){
        setEmail(e.target.value);
    }
    const resetPassword = async () => {
        try {
            const response = await axios.post("/api/users/forgot-password", { email });
        } catch (error:any) {
            console.log("Error in sending reset password email", error.message);
             toast.error("Failed to send reset password email");
            
        }
    }

  return (
    <div className='flex flex-col justify-center'>
      <label htmlFor="email">Enter Your Email: </label>
      <input onChange={handleChange} className='block w-2xl px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' type="text" value={email} placeholder='Enter your Email' id="email" />
        <button onClick={resetPassword} className='block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 mt-2' type="submit">Send Reset Link</button>
    </div>
  )
}
export default forgotPasswordPage

