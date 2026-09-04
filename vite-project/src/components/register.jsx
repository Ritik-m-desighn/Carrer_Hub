import React, { useState, useEffect } from 'react'
import { useNavigate ,Navigate} from 'react-router-dom'

const Form = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPass] = useState("")
  const [job, setJob] = useState([])

  useEffect(() => {
    jobs()
  }, [])

  const jobs = async () => {
      const user = JSON.parse(localStorage.getItem("userImfo") || "{}");
    const token = user?.token;
    const data = await fetch("http://localhost:5000/jobs", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    const res = await data.json()

    if (data.ok) {
      setJob(res)
    }
    else{
      console.log("register to see jobs")
    }
  }

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()
      if(data=="user registered succesfully"){
        navigate("/login")
      }
      else{
        console.log("something went wrong")
      }
    } catch (err) {
      console.log("something went wrong while register", err)
    }
  }


return (
  job.length > 0 ? (
    <Navigate to="/home" />
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="w-full max-w-md rounded-2xl bg-zinc-900 p-8 shadow-2xl border border-zinc-800"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Create Account
        </h1>

        <p className="text-zinc-400 text-center mb-8">
          Enter your details to get started
        </p>

        <div className="mb-5">
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Email
          </label>

          <input
            type="text"
            placeholder="Enter your email"
            className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Password
          </label>

          <input
            type="text"
            placeholder="Enter your password"
            className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            onChange={(e) => setPass(e.target.value)}
            value={password}
          />
        </div>

        <p
          className="text-sm text-blue-400 hover:text-blue-300 cursor-pointer transition mb-6"
          onClick={() => navigate("/login")}
        >
          Already have an account? Log in
        </p>

        <input
          type="submit"
          value="Submit"
          className="w-full rounded-xl bg-green-400 py-3 font-semibold text-black cursor-pointer transition hover:bg-green-300 active:scale-[0.98]"
        />
      </form>
    </div>
  )
);


}

export default Form