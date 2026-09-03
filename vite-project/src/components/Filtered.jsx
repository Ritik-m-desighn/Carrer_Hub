import React, { useEffect } from 'react'
import { useState } from 'react';
import JobCard from './JobCard';
import { useSearchParams } from "react-router-dom";
const Filtered = () => {
  useEffect(()=>{
    jobs();
  },[]);
    const [searchParams] = useSearchParams();
    const search = searchParams.get("skill");
  const [job,setJob]=useState([]);
  const jobs=async()=>{
const data=await fetch(`http://localhost:5000/search/?skill=${search.trim()}`,{
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
        const res=await data.json();
        if(data.ok){
          setJob(res);
        }
          
  }
  
  return (
    job.length>0? (
      job.map((val, i) => <JobCard key={i} val={val} />)
    ):(
      <p className="text-blue-600">NO JOB FOUND</p>
    )
  )

}
export default Filtered