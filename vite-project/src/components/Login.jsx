import React from 'react'
import { useState } from 'react'
import { useNavigate ,Navigate } from 'react-router-dom'

  const Form = () => {
    const navigate=useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPass]=useState("");
  const handleSubmit=async()=>{
    try{
  const res=await fetch("http://localhost:5000/login",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({email,password})
        });
        const data=await res.json();
        if(data=="somethng went wrong"){
            console.log("something went wrong");
            return;
        }
localStorage.setItem("userImfo", JSON.stringify(data));        console.log("succesfull login");
        navigate("/home")
    }
    catch(err){
      console.log("somethig went wrong while login",err)
    }
   
  }

return (
  <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl"
    >
      <h1 className="text-3xl font-bold text-white text-center mb-2">
        Welcome Back
      </h1>

      <p className="text-zinc-400 text-center mb-8">
        Login to your account
      </p>

      <div className="mb-5">
        <label className="block text-sm font-medium text-zinc-300 mb-2">
          Email
        </label>

        <input
          type="text"
          placeholder="Enter your email"
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-zinc-300 mb-2">
          Password
        </label>

        <input
          type="text"
          placeholder="Enter your password"
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          onChange={(e) => {
            setPass(e.target.value);
          }}
          value={password}
        />
      </div>

      <input
        type="submit"
        placeholder="submit"
        value="Login"
        className="w-full bg-green-400 hover:bg-green-300 text-black font-semibold rounded-xl py-3 cursor-pointer transition active:scale-[0.98]"
      />
    </form>
  </div>
);

}

export default Form;