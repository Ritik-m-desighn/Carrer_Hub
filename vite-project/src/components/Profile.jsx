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
    const data=await fetch("https://carrer-hub-1-a4x4.onrender.com/getProfile",{
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    const res=await data.json();
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
       const user = JSON.parse(localStorage.getItem("userImfo") || "{}");
    const token = user?.token;
    setLoading(true);
    const data = await fetch("https://carrer-hub-1-a4x4.onrender.com/profile", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
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

 
    return imfo ? (
    <div className="min-h-screen bg-zinc-950 px-4 py-12 text-white flex items-center justify-center">
      <div className="w-full max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-900/90 p-8 shadow-2xl backdrop-blur-sm sm:p-10">
        
        {/* Profile Header */}
        <div className="flex flex-col items-center gap-6 border-b border-zinc-800 pb-8 sm:flex-row sm:items-start">
          <img
            src={imfo.profilePicture}
            alt="Profile"
            className="h-28 w-28 rounded-full border-4 border-blue-500/80 object-cover shadow-lg shadow-blue-500/10"
          />

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              {imfo.name || "Developer"}
            </h1>
            <p className="mt-1 flex items-center justify-center text-sm text-zinc-400 sm:justify-start">
              <span className="mr-1">📍</span> {imfo.location}
            </p>

            {/* Quick Action Badges */}
            <div className="mt-4 flex flex-wrap justify-center gap-3 sm:justify-start">
              <button
                type="button"
                onClick={addJob}
                className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500/20 active:scale-95"
              >
                👨‍💻 Add Job
              </button>

              <button
                type="button"
                onClick={Yourjobs}
                className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-500/20 active:scale-95"
              >
                👜 Your jobs
              </button>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
            About Me
          </h2>
          <p className="mt-2 text-base leading-relaxed text-zinc-300">
            {imfo.bio}
          </p>
        </div>

        {/* Skills Section */}
        <div className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
            Skills
          </h2>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {imfo.skills?.map((skill, index) => (
              <span
                key={index}
                className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-medium text-blue-400"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Resume Section */}
        <div className="mt-8 border-t border-zinc-800 pt-6">
          <a
            href={imfo.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-500 active:scale-95"
          >
            📄 View Resume
          </a>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-zinc-950 px-4 py-12 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-5 rounded-2xl border border-zinc-800 bg-zinc-900/90 p-8 shadow-2xl backdrop-blur-sm"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Create Your Profile
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Set up your professional portfolio details
          </p>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-400">
            Bio
          </label>
          <textarea
            required
            placeholder="Write something about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="min-h-28 w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-400">
            Full Name
          </label>
          <input
            required
            type="text"
            placeholder="Enter Your Name"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-400">
            Skills
          </label>
          <input
            required
            type="text"
            placeholder="Skills (e.g. React, Node.js, MongoDB)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-400">
            Location
          </label>
          <input
            required
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-400">
            Profile Picture
          </label>
          <input
            required
            type="file"
            accept="image/*"
            onChange={(e) => setProfile(e.target.files[0])}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 p-2 text-sm text-zinc-400 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-400">
            Resume (PDF / DOC)
          </label>
          <input
            required
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files[0])}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 p-2 text-sm text-zinc-400 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-blue-500"
          />
        </div>

        {message && (
          <p className="rounded-lg border border-zinc-700 bg-zinc-800/50 py-2 text-center text-xs text-zinc-300">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]"
        >
          {loading ? "Creating Profile..." : "Create Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
