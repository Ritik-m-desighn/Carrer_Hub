
import React from 'react'
import { useNavigate } from 'react-router-dom'
const JobCard = ({ val }) => {
  const navigate=useNavigate();
  const apply=async()=>{
            const user = JSON.parse(localStorage.getItem("userImfo") || "{}");
    const token = user?.token;
     const applied=await fetch(`http://localhost:5000/apply/${val._id}`,{
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }        
    });
        const res=await applied.json();
        if(applied.status.ok){
        console.log("succesfull applied");
        }
        else{
          console.log(res);
            return;
        }
   
  }
  return (
    <div className="w-full max-w-2xl bg-zinc-800 border border-zinc-700 rounded-xl p-5 shadow-lg text-white ">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">
            {val.jobName}
          </h2>
          <p className="text-zinc-400 mt-1">
            {val.city}
          </p>
        </div>
        <span className="text-green-400 font-semibold whitespace-nowrap">
          ₹{val.salary}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 mt-5">
        {val.skills.map((skill, index) => (
          <span
            key={index}
            className="bg-zinc-700 text-zinc-200 px-3 py-1 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-zinc-700">
        <span className="text-sm text-zinc-500">
          {new Date(val.date).toLocaleDateString()}
        </span>
         <input type="text"  readOnly className="border border-gray-400 text-center  bg-blue-800 text-white px-2 py-2 rounded-full outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer" value={"Apply"} onClick={apply} />
      </div>
    </div>
  )
}

export default JobCard

