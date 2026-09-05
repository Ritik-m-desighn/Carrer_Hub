import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditJob = () => {

  const { id: jobId } = useParams();


  const [formData, setFormData] = useState({
    jobName: "",
    applicationUrl: "",
    salary: "",
    city: "",
    skills: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getToken = () => {
    const userInfo = JSON.parse(
      localStorage.getItem("userImfo") || "{}"
    );

    return userInfo?.token;
  };
  useEffect(() => {

    const fetchJob = async () => {
      try {
        setLoading(true);
        setError("");

        const token = getToken();

        const response = await fetch(
          `http://localhost:5000/applications/recruiter/getjob/${jobId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch job"
          );
        }

        setFormData({
          jobName: data.jobName || "",
          applicationUrl: data.applicationUrl || "",
          salary: data.salary || "",
          city: data.city || "",
          skills: Array.isArray(data.skills)
            ? data.skills.join(", ")
            : data.skills || "",
        });
      } catch (err) {
        console.error("Fetch error:", err);
        setError(
          err.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJob();
    } else {
      setError("Job ID not found");
      setLoading(false);
    }
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);
      setError("");
      setSuccess("");

      const token = getToken();

      const response = await fetch(
        `http://localhost:5000/applications/recruiter/jobUpdate/${jobId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            jobName: formData.jobName,
            applicationUrl: formData.applicationUrl,
            salary: formData.salary,
            city: formData.city,

            skills: formData.skills
              .split(",")
              .map((skill) => skill.trim())
              .filter((skill) => skill !== ""),
          }),
        }
      );

      const data = await response.json();

      console.log("Update response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update job"
        );
      }

      setSuccess("Job updated successfully!");

    } catch (err) {
      console.error("Update error:", err);

      setError(
        err.message || "Something went wrong"
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">

          <div
            className="w-10 h-10 mx-auto mb-4
                       border-4 
                       border-t-blue-600
                       rounded-full animate-spin"
          />

          <p className="text-blue-700 font-semibold">
            Loading job details...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  px-4 py-10 flex justify-center items-start">

      <div
        className="w-full max-w-2xl
                   
                   rounded-2xl
                   shadow-xl 
                   border border-blue-100
                   p-6 sm:p-8"
      >

        {/* HEADER */}
        <div
          className="flex items-center justify-between
                     mb-7 pb-4
                     border-b border-blue-100"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-700">
              Edit Job
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Update your job information
            </p>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div
            className="mb-5 rounded-lg
                       border border-red-200
                       bg-red-50
                       px-4 py-3
                       text-sm font-medium
                       text-red-600"
          >
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div
            className="mb-5 rounded-lg
                       border border-green-200
                       bg-green-50
                       px-4 py-3
                       text-sm font-medium
                       text-green-600"
          >
            {success}
          </div>
        )}

        <form
          onSubmit={handleUpdate}
          className="space-y-5"
        >

          {/* JOB NAME */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-blue-900">
              Job Title
            </label>

            <input
              type="text"
              name="jobName"
              value={formData.jobName}
              onChange={handleChange}
              placeholder="Enter job title"
              required
              className="w-full rounded-lg
                         border border-blue-200
                         bg-blue-50/30
                         px-4 py-3
                         text-gray-800
                         placeholder:text-gray-400
                         outline-none
                         focus:border-blue-500
                         focus:ring-4
                         focus:ring-blue-100"
            />
          </div>

          {/* APPLICATION URL */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-blue-900">
              Application URL
            </label>

            <input
              type="url"
              name="applicationUrl"
              value={formData.applicationUrl}
              onChange={handleChange}
              placeholder="https://example.com/apply"
              className="w-full rounded-lg
                         border border-blue-200
                         bg-blue-50/30
                         px-4 py-3
                         text-gray-800
                         placeholder:text-gray-400
                         outline-none
                         focus:border-blue-500
                         focus:ring-4
                         focus:ring-blue-100"
            />
          </div>

          
          {/* CITY */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-blue-900">
              City
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. Noida"
              className="w-full rounded-lg
                         border border-blue-200
                         bg-blue-50/30
                         px-4 py-3
                         text-gray-800
                         placeholder:text-gray-400
                         outline-none
                         focus:border-blue-500
                         focus:ring-4
                         focus:ring-blue-100"
            />
          </div>

          {/* SALARY */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-blue-900">
              Salary
            </label>

            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g. ₹6 LPA"
              className="w-full rounded-lg
                         border border-blue-200
                         bg-blue-50/30
                         px-4 py-3
                         text-gray-800
                         placeholder:text-gray-400
                         outline-none
                         focus:border-blue-500
                         focus:ring-4
                         focus:ring-blue-100"
            />
          </div>

          {/* SKILLS */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-blue-900">
              Skills
            </label>

            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
              className="w-full rounded-lg
                         border border-blue-200
                         bg-blue-50/30
                         px-4 py-3
                         text-gray-800
                         placeholder:text-gray-400
                         outline-none
                         focus:border-blue-500
                         focus:ring-4
                         focus:ring-blue-100"
            />

            <p className="mt-1.5 text-xs text-gray-500">
              Separate skills with commas.
            </p>
          </div>

          {/* BUTTON */}
          <div className="pt-5 border-t border-blue-100">

            <button
              type="submit"
              disabled={updating}
              className="w-full rounded-lg
                         bg-blue-600
                         px-7 py-3
                         font-semibold text-white
                         shadow-md shadow-blue-200
                         hover:bg-blue-700
                         transition
                         disabled:opacity-50
                         disabled:cursor-not-allowed"
            >
              {updating
                ? "Updating..."
                : "Update Job"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default EditJob;
