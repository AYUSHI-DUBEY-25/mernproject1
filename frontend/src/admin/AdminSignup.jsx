import React ,{useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-hot-toast"
import { BACKEND_URL } from "../utils/utils"

function AdminSignup() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
  const navigate= useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      const response= await axios.post(`${BACKEND_URL}/admin/signup`, {
        firstName,
        lastName,
        email,
        password,
      },{
        withCredentials: true,
        headers:{
          "Content-Type":"application/json",
        }
      })
      console.log("User signed up successfully", response.data)
      toast.success(response.data.message)
      navigate("/admin/login")
    }catch(error){
      if(error.response){
        setErrorMessage(error.response.data.errors|| "Signup failed")
      }
    }
  }

  return <div className='bg-gradient-to-r from-black to-gray-800'> 
  <div className="h-screen container mx-auto flex items-center justify-center text-white">
    {/*Header*/}
    <header className="absolute top-0 left-0 w-full flex justify-between items-center p-5">
      <div className="flex items-center space-x-2">
        <img src= 'logo.webp' className="w-24 h-24 rounded-full"></img>
        <Link to={"/"} className="text-2xl text-pink-600 font-bold font-serif">HustleLearn</Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link to={"/admin/login"} className="bg-transparent text-white py-2 px-4 border border-white rounded">Login</Link>
        <Link to={"/courses"} className="bg-transparent text-white py-2 px-4 border border-white rounded">Join Now</Link>
      </div>
    </header>
    {/* signup */}
    <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-[500px] mt-20">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Welcome to <span className="text-orange-500">HustleLearn</span>
      </h2>
      <p className="text-center text-gray-400 mb-6">
        Signup to join!
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstname" className="text-gray-400 mb-2">Firstname</label>
          <input type="text" 
          id="firstname" 
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)} 
          className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500" 
          placeholder="Enter Your Firstname"></input>
        </div>
        <div className="mb-4">
          <label htmlFor="lastname" className="text-gray-400 mb-2">Lastname</label>
          <input type="text"
           id="lastname"
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your Lastname"></input>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="text-gray-400 mb-2">Email</label>
          <input type="email" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500" 
          placeholder="Enter Your Email"></input> 
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="text-gray-400 mb-2">Password</label>
          <input type="password" 
          id="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500" 
          placeholder="Enter Your Password"></input>
        </div>
        {errorMessage &&(
          <div className="mb-4 text-red-500 text-center">
            {errorMessage}
          </div>
        )}
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-md text-white font-bold">Signup</button>

      </form>
    </div>
  </div>
  </div>
}

export default AdminSignup
//done