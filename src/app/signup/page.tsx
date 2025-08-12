"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React,{useState,useEffect} from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';


export default function SignupPage(){
    const router = useRouter();
    const [user , setUser] = useState({
        username:"",
        email:"",
        password:""
    });
    const [loading,setLoading]=useState(false);
    const [buttonDisabled,setButtonDisabled]=useState(false);
    async function signUp(e:any){
        e.preventDefault()
        try {
            setLoading(true)
           const response = await axios.post("/api/users/signup",user)
           console.log("SignUp Success",response.data);
           router.push("/login");
           
        } catch (error:any) {
            console.log("SignUp failed",error.message);
            
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    function onChange(e:any){
        setUser({...user,[e.target.id]:e.target.value})
    }
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user])
    return(
       <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
        <h1>{loading?"Processing":"SignUp"}</h1>
       <form className='' onSubmit={signUp}>
        <label className='block text-gray-700 font-medium mb-1' htmlFor="username">Username: </label>
        <input onChange={onChange} className=' px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' type="text" id='username' value={user.username} placeholder='Enter your username'/>
        <br />
        <label className='block text-gray-700 font-medium mb-1' htmlFor="email">Email: </label>
        <input onChange={onChange} className=' px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' type="text" id='email' value={user.email} placeholder='Enter your email'/>
        <br />
        <label className='block text-gray-700 font-medium mb-1' htmlFor="password">Password: </label>
        <input onChange={onChange} className=' px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400' type="text" id='password' value={user.password} placeholder='Enter your password'/>
        <button className='block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200' type="submit">{buttonDisabled ?"No signup":"Signup"}</button>
       </form>
       <Link href='/login'>Already have an account? Login here</Link>
       </div>
    );
}