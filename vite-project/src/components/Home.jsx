import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import JobCard from './JobCard'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    useEffect(()=>{
        jobs();
    },[])

    const navigate=useNavigate();
    const [job,setJob]=useState([]);
     const [search,setSearch]=useState("");
     const specific=async()=>{
        navigate(`/filtered?skill=${search}`)
    }
    const logout=async()=>{
        await localStorage.clear("token");
        console.log("you are loggedd out ");
        navigate("/");
    }
    const jobs=async()=>{
      const user = JSON.parse(localStorage.getItem("userImfo") || "{}");
      const token = user?.token;
        const data=await fetch("http://localhost:5000/jobs",{
        headers: { Authorization: `Bearer ${token}`}
        });
        const res=await data.json();
        if(data.ok){
        setJob(res);
        }
        else{
            return;
        }
    }
      const apply=()=>{
        navigate("/applications")
      }

    const profile=()=>{
      navigate("/profile")
    }
    return job.length > 0 ? (
    <div className="min-h-screen bg-zinc-950 px-4 py-6 sm:px-6">
      {/* Top Header / Bar */}
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-b border-zinc-800 pb-6 md:flex-row">
        {/* Search */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex w-full items-center gap-2 sm:w-auto"
        >
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-full rounded-full border border-zinc-700 bg-zinc-900 px-5 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 sm:w-80"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />

          <input
            type="submit"
            value="Search"
            className="cursor-pointer rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 active:scale-95"
            onClick={specific}
          />
        </form>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:justify-end">
          <input
            type="button"
            value="Applications"
            className="cursor-pointer rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-500/20 active:scale-95"
            onClick={apply}
          />

          <input
            type="button"
            value="Profile"
            className="cursor-pointer rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-semibold text-blue-400 transition hover:bg-blue-500/20 active:scale-95"
            onClick={profile}
          />

          <input
            type="button"
            value="Logout"
            className="cursor-pointer rounded-full border border-rose-500/30 bg-rose-500/10 px-5 py-2 text-sm font-semibold text-rose-400 transition hover:bg-rose-500/20 active:scale-95"
            onClick={logout}
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {job.map((val, i) => (
          <JobCard key={i} val={val} />
        ))}
      </div>
    </div>
  ) : (
    <div className="flex min-h-[60vh] items-center justify-center">
      <p className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-6 py-3 font-medium text-blue-400">
        You are not authorized
      </p>
    </div>
  );
}

export default Home;