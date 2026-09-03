import { useState } from "react";

const AddJob = () => {
  const [formData, setFormData] = useState({
    jobName: "",
    salary: "",
    city: "",
    applicationUrl: "",
    skills: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      jobName: formData.jobName,
      salary: Number(formData.salary),
      city: formData.city,
      applicationUrl: formData.applicationUrl,
      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    };

    try {
            const user = JSON.parse(localStorage.getItem("userImfo") || "{}");
    const token = user?.token;
      const response = await fetch("http://localhost:5000/addJobs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(jobData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create job");
      }

      console.log("Job created:", data);

      alert("Job added successfully!");

      setFormData({
        jobName: "",
        salary: "",
        city: "",
        applicationUrl: "",
        skills: "",
      });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-2xl">
        
        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white">
            Add New Job
          </h2>

          <p className="mt-2 text-gray-400">
            Add a new job opportunity to your platform.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-xl"
        >
          {/* Job Name */}
          <div>
            <label
              htmlFor="jobName"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Job Name
            </label>

            <input
              id="jobName"
              type="text"
              name="jobName"
              value={formData.jobName}
              onChange={handleChange}
              placeholder="e.g. Backend Developer"
              required
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Salary */}
          <div>
            <label
              htmlFor="salary"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Salary
            </label>

            <input
              id="salary"
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g. 75000"
              min="0"
              required
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              City
            </label>

            <input
              id="city"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. Lucknow"
              required
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Application URL */}
          <div>
            <label
              htmlFor="applicationUrl"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Application URL
            </label>

            <input
              id="applicationUrl"
              type="url"
              name="applicationUrl"
              value={formData.applicationUrl}
              onChange={handleChange}
              placeholder="https://example.com/apply"
              required
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Skills */}
          <div>
            <label
              htmlFor="skills"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Skills
            </label>

            <input
              id="skills"
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Node.js, MongoDB, Express.js"
              required
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

            <p className="mt-2 text-sm text-gray-500">
              Separate skills with commas.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Add Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
