import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../utils/utils'

function Buy() {
  const { courseId } = useParams()
  const [loading, setLoading] = useState(false)
    const navigate= useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))
  const token = user?.token

    if(!token){
      navigate("/login")
    }

    useEffect(()=>{
          const fetchBuyCourseData= async()=>{
              if(!token){
                  setError("Please login to purchase the courses")
                  return
                }    
                try{
                  const response=await axios.post(`${BACKEND_URL}/course/buy${courseId}`,{},{
                    headers:{
                      Authorization:`Bearer ${token}`
                    },
                    withCredentials:true,
                  })
                  setCourse(response.data.course)
                  setClientSecret(response.data.clientSecret)
                  setLoading(false)
                }catch(error){
                  setLoading(false)
                  if(error?.response?.status===400){
                    setError("you have already purchased this course")
                    navigate("/purchases")
                  }else{
                   setError(error?.response?.data?.errors)
                  }
              }
          }
          fetchBuyCourseData
    },[courseId])


  const handlePurchase = async() => {
    if (!token) {
      toast.error("Please login to purchase the courses")
      return
    }
    try{
      setLoading(true)
      const response= await axios.post(`${BACKEND_URL}/course/buy/${courseId}`,{},{
                    headers:{
                      Authorization:`Bearer ${token}`
                    },
                    withCredentials:true,
                  })
                  toast.success(response.data.message||"Course purchased successfully")
                  navigate("/purchases")
                  setLoading(false)
    }catch(error){
      setLoading(false)
      if(error?.response?.status===400){
        toast.error("you have already purchased this course")
      }else{
        toast.error(error?.response?.data?.errors)
      }
    }
  }


  return (
    <div className='flex h-screen items-center justify-center'>
      <button className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-800 duration-300' onClick={handlePurchase} disabled={loading} >
        {loading ? "Processing..." : "Buy Now"}</button>
    </div>
  )
}

export default Buy