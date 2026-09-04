import React,  {useState}  from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate=useNavigate();
      const [imfo,setImfo]=useState(null);
  useEffect(()=>{
    getProfile();
  },[])
  const addJob =()=>{
    navigate("/addJobs");
  }
  const Yourjobs =()=>{
    navigate("/Yourjobs");
  }
  const getProfile=async()=>{
    const user = JSON.parse(localStorage.getItem("userImfo") || "{}");
    const token = user?.token;
    const data=await fetch("http://localhost:5000/getProfile",{
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    const res=await data.json();
    console.log(res.message)
    if(res.message!="Profile not found"){
        setImfo(res);
    }
    else{
      return;
    }
    }
  const [bio, setBio] = useState("");
  const [userName, setuserName] = useState("");
const [skills, setSkills] = useState("");
const [location, setLocation] = useState("");
const [profile, setProfile] = useState(null);
const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  const obj = new FormData();

  obj.append("bio", bio);
  obj.append("skills", skills);
  obj.append("location", location);
  obj.append("profile", profile);
  obj.append("resume", resume);
  obj.append("name", userName);

  try {
    setLoading(true);
    const data = await fetch("http://localhost:5000/profile", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: obj
    });

    const res = await data.json();

    if (data.ok) {
      setBio("");
setSkills("");
setLocation("");
setuserName("");
setProfile(null);
setResume(null);

      setMessage(res.message);
      e.target.reset();
    } else {
      setMessage(res.message);
    }
  } catch (err) {
    setMessage("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    imfo ? (
  <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4 py-10">
    <div className="w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">

      <div className="flex flex-col sm:flex-row items-center gap-6 border-b border-zinc-800 pb-8">
        <img
            src={imfo.profilePicture}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold">{imfo.name || "Developer"}</h1>
          <p className="text-zinc-400 mt-1">📍 {imfo.location}</p>
         <div className="flex gap-3">
           <p  className="px-4 py-2 bg-green-500/10 border border-green-500/30
               text-green-400 cursor-pointer rounded-full text-sm" onClick={addJob}>👨‍💻 Add Job</p>
              <p  className="px-4 py-2 bg-green-500/10 border border-green-500/30
              text-green-400 cursor-pointer rounded-full text-sm" onClick={Yourjobs}>👜 Your jobs</p>
         </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">About Me</h2>
        <p className="text-zinc-400 leading-relaxed">{imfo.bio}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {imfo.skills?.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-blue-500/10 border border-blue-500/30
                         text-blue-400 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <a
          href={imfo.resume}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center px-5 py-3 bg-blue-600
                     hover:bg-blue-500 rounded-xl font-semibold transition"
        >
          📄 View Resume
        </a>
      </div>

    </div>
  </div>
):(
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl space-y-5"
      >
        <h1 className="text-3xl font-bold text-white text-center">
          Create Your Profile
        </h1>
<textarea
  required
  placeholder="Write something about yourself..."
  value={bio}
  onChange={(e) => setBio(e.target.value)}
  className="w-full min-h-32 rounded-xl bg-zinc-800 border border-zinc-700 
             text-white placeholder-zinc-400 px-4 py-3 outline-none 
             focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
/>

<input
  required
  type="text"
  placeholder="Enter Your Name"
  value={userName}
  onChange={(e) => setuserName(e.target.value)}
  className="w-full rounded-xl bg-zinc-800 border border-zinc-700 
             text-white placeholder-zinc-400 px-4 py-3 outline-none 
             focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
/>

<input
  required
  type="text"
  placeholder="Skills (e.g. React, Node.js, MongoDB)"
  value={skills}
  onChange={(e) => setSkills(e.target.value)}
  className="w-full rounded-xl bg-zinc-800 border border-zinc-700 
             text-white placeholder-zinc-400 px-4 py-3 outline-none 
             focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
/>

<input
  required
  type="text"
  placeholder="Location"
  value={location}
  onChange={(e) => setLocation(e.target.value)}
  className="w-full rounded-xl bg-zinc-800 border border-zinc-700 
             text-white placeholder-zinc-400 px-4 py-3 outline-none 
             focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
/>

<div>
  <label className="block text-sm font-medium text-zinc-300 mb-2">
    Profile Picture
  </label>

  <input
    required
    type="file"
    accept="image/*"
    onChange={(e) => setProfile(e.target.files[0])}
    className="w-full rounded-xl bg-zinc-800 border border-zinc-700 
               text-zinc-300 file:mr-4 file:py-2 file:px-4 
               file:rounded-lg file:border-0 file:bg-blue-600 
               file:text-white hover:file:bg-blue-500"
  />
</div>

<div>
  <label className="block text-sm font-medium text-zinc-300 mb-2">
    Resume
  </label>

  <input
    required
    type="file"
    accept=".pdf,.doc,.docx"
    onChange={(e) => setResume(e.target.files[0])}
    className="w-full rounded-xl bg-zinc-800 border border-zinc-700 
               text-zinc-300 file:mr-4 file:py-2 file:px-4 
               file:rounded-lg file:border-0 file:bg-blue-600 
               file:text-white hover:file:bg-blue-500"
  />
</div>

        {message && (
          <p className="text-center text-sm text-zinc-300">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl"
        >
          {loading ? "Creating Profile..." : "Create Profile"}
        </button>
      </form>
    </div>
    )
  );
};

export default Profile;
