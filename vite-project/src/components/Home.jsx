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
 return (
  job.length > 0 ? (
    <>
      <div className="relative w-full flex items-center justify-center mb-8 px-4">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-72 border border-zinc-700 bg-zinc-900 text-white px-5 py-2.5 rounded-full outline-none placeholder:text-zinc-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />

          <input
            type="submit"
            value="Search"
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2.5 rounded-full cursor-pointer transition active:scale-95"
            onClick={specific}
          />
        </form>

        <div className="absolute right-4 top-0 flex items-center gap-3">
          <input
            type="button"
            value="Applications"
            className="bg-green-500 hover:bg-green-600 border border-zinc-700 text-white font-medium px-5 py-2.5 rounded-full cursor-pointer transition active:scale-95"
          onClick={apply}
          />

          <input
            type="button"
            value="Logout"
            className="bg-red-600 hover:bg-red-500 text-white font-medium px-5 py-2.5 rounded-full cursor-pointer transition active:scale-95"
            onClick={logout}
          />
          <input
            type="button"
            value="Profile"
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-full cursor-pointer transition active:scale-95"
            onClick={profile}
          />
        </div>
       
      </div>

      <div className="px-4">
        {job.map((val, i) => (
          <JobCard key={i} val={val} />
        ))}
      </div>
    </>
  ) : (
    <p className="text-blue-600 text-center mt-10">
      You are not authorized
    </p>
  )
);

}

export default Home;


