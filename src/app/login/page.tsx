"use client";

import React,{useState,useEffect} from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';


export default function LoginPage(){
    const router = useRouter()
    const [loading,setLoading]=useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [user , setUser] = useState({
        email:"",
        password:""
    });
    function handleChange(e:any){
        setUser({...user,[e.target.id]:e.target.value})
    }
    async function onLogin(e:any){
        e.preventDefault()
       try {
        setLoading(true);
       const response = await axios.post("/api/users/login",user);
       console.log("Login successful",response.data);
        toast.success("Login successful")
        router.push("/profile")
       } catch (error:any) {
        console.log("Login failed",error.message);
        toast.error(error.message)
       }finally{
        setLoading(false)
       }
    }
    useEffect(() => {
      if(user.email.length>0 && user.password.length>0){
        setButtonDisabled(false)
      }else{
        setButtonDisabled(true)
      }
    }, [user])
    
    return(
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
            <h1>{loading?"Processing":"Login"}</h1>
       <form className='' onSubmit={onLogin}>
        
        <label className='block text-gray-700 font-medium mb-1' htmlFor="email">Email: </label>
        <input onChange={handleChange} className=' px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' type="text" id='email' value={user.email} placeholder='Enter your email'/>
        <br />
        <label className='block text-gray-700 font-medium mb-1' htmlFor="password">Password: </label>
        <input onChange={handleChange} className=' px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' type="text" id='password' value={user.password} placeholder='Enter your password'/>
        <Link href='/forgot-password' className='text-blue-500 hover:underline'>Forgot Password?</Link>
        <button className='block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200' type="submit">Login here</button>
       </form>
       <Link href='/signup'>Visit Sign Up page</Link>
       </div>
    );
}