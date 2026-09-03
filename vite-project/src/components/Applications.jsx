import React, { useState, useEffect } from 'react';

const Applications = () => {
  const [application, setApplication] = useState([]);

  useEffect(() => {
    applications();
  }, []);

  const applications = async () => {
        const user = JSON.parse(localStorage.getItem("userImfo") || "{}");
    const token = user?.token;
    const data = await fetch("http://localhost:5000/applications/user",{
        headers: { Authorization: `Bearer ${token}`}
    });
    const res = await data.json();
    if (res!=null) {
      setApplication(res);
    }

  };

  const del = async (i) => {
     const user = JSON.parse(localStorage.getItem("userImfo") || "{}");
    const token = user?.token;
  const data = await fetch(
    `http://localhost:5000/applications/delete/${i}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const res = await data.json();

  if (data.ok) {
    setApplication(prev =>
      prev.filter(app => app._id !== i)
    );
  }
};

  return (
    application.length > 0 ? (
      <div className="grid gap-4 p-5">
  {application.map((app, i) => (
    <div key={i} className="relative bg-zinc-800 text-white p-5 rounded-xl shadow">
      <button className="absolute right-4 top-4 bg-red-600 hover:bg-red-800 px-4 py-2 rounded-full" onClick={()=>del(app._id)}>
        Delete
      </button>
      <h2 className="text-2xl font-bold">{app.job.jobName}</h2>
      <p className="text-green-400 mt-2">Salary: ₹{app.job.salary}</p>
      <p>📍 {app.job.city}</p>
      <p>Status: <span className="text-yellow-400">{app.status}</span></p>
      <p className="mt-2">Skills: {app.job.skills.join(", ")}</p>
      <p className="text-gray-400 text-sm mt-2">AppliedOn: {new Date(app.date).toLocaleDateString()}</p>
    </div>
  ))}
</div>

    ) : (
      <p className="text-gray-400 text-center mt-10">
        No applications found
      </p>
    )
  );
};

export default Applications;
