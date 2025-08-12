"use client";
import axios from 'axios';
import React,{useState} from 'react'
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function ProfilePage() {
  const router = useRouter();
  const [data,setData] = useState('nothing');
  const logout = async ()=>{
    try {
     await axios.get('/api/users/logout')
     toast.success("Logout Successful");
      router.push('/login');
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message); 
    }
  }

  const getUserDetails = async () => {
    try {
      const response = await axios.get('/api/users/me');
      console.log(response.data);
      setData(response.data.user._id);
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2 className='p-3 rounded bg-green-500'>{data==='nothing' ? 'Nothing':<Link href={`/profile/${data}`}>${data}</Link>}</h2>
<hr />
      <button
      onClick={logout}
      className='bg-red-500 text-white px-4 py-2 rounded mt-4'>Logout</button>
      <button
      onClick={getUserDetails}
      className='bg-green-800 text-white px-4 py-2 rounded mt-4'>Get User Details</button>
    </div>
  )
}

// export default ProfilePage
