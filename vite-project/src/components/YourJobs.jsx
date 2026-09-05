import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobApplications from "./JobApplications";
const YourJobs = () => {
  const navigate=useNavigate();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getToken = () => {
    const user = JSON.parse(localStorage.getItem("userImfo") || "{}");
    return user?.token;
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      const res = await fetch(
        "http://localhost:5000/applications/recruiter/jobs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data = await res.json();

      setJobs(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("you are at your jobs")
fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this job?"
  );

  if (!confirmDelete) return;

  try {
    const token = getToken();

    const response = await fetch(
      `http://localhost:5000/applications/recruiter/delete/${jobId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete job");
    }

    // Remove the deleted job from the UI
    setJobs((prevJobs) =>
      prevJobs.filter((job) => job._id !== jobId)
    );

    alert(data.message || "Job deleted successfully.");
  } catch (error) {
    console.error("Delete job error:", error);
    alert(error.message || "Failed to delete job.");
  }
};


const handleUpdate = async (jobId) => {
   navigate(`/applications/recruiter/jobUpdate/${jobId}/`)
}
//   try {
//     const token = getToken();

//     const response = await fetch(
//       `http://localhost:5000/recruiter/updateJob/${jobId}`,
//       {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//         }),
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || "Failed to update job");
//     }

//     console.log("Job updated successfully:", data);

//   } catch (err) {
//     console.error("Error updating job:", err);
//   }
// };


const handleApplications = async (jobId) => {
  try {
    const token = getToken();
    const response = await fetch(`http://localhost:5000/recruiter/jobApplications/${jobId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json(); 

    if (data.length > 0) {
        setApplications(data);
    } else {
      console.log("no applications found");
    }
  } catch (err) {
    console.error("Error fetching applications:", err);
  }
};


  if (loading) {
    return <div className="text-white">Loading jobs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return applications.length>0 ? (
     <JobApplications applications={applications}/>

  ):(
 <div className="min-h-screen bg-gray-900 p-6 text-white">
  <h1 className="mb-6 text-3xl font-bold ">
    Your Jobs
  </h1>

  {jobs.length === 0 ? (
    <p className="text-gray-300">
      You haven't posted any jobs yet.
    </p>
  ) : (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <div
          key={job._id}
          className="rounded-xl bg-gray-800 p-6 shadow-lg"
        >
          <h2 className="mb-4 text-2xl font-bold text-white">
            {job.jobName}
          </h2>

          <p className="mb-2 text-gray-300">
            <strong className="text-white">Salary:</strong>{" "}
            ₹{job.salary}
          </p>

          <p className="mb-2 text-gray-300">
            <strong className="text-white">City:</strong>{" "}
            {job.city}
          </p>

          <p className="mb-2 text-gray-300">
            <strong className="text-white">Skills:</strong>{" "}
            {job.skills?.join(", ")}
          </p>

          <p className="mb-4 text-gray-300">
            <strong className="text-white">Posted:</strong>{" "}
            {new Date(job.date).toLocaleDateString()}
          </p>

          {job.applicationUrl && (
            <p className="mb-5">
              <strong className="text-white">
                Application URL:
              </strong>{" "}
              <a
                href={job.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                Apply Link
              </a>
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleUpdate(job._id)}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Update Job
            </button>

            <button
              onClick={() => handleDelete(job._id)}
              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            > 
              Delete Job
            </button>

            <button
              onClick={() => handleApplications(job._id)}
              className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              All Applications
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
  );         
};

export default YourJobs;

