import React from 'react'
const JobApplications = ({applications}) => {

  const statusUpdate = async (id,status) => {
  try {
    const userInfo = JSON.parse(
      localStorage.getItem("userImfo") || "{}"
    );

    const token = userInfo?.token;

    const response = await fetch(
      `https://carrer-hub-1-a4x4.onrender.com/applications/recruiter/applicationUpdate/${id}`,
      {
    method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
         body: JSON.stringify({
          status: status
        }),
      }
    );
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const result = await response.json();

    console.log(result);


  } catch (error) {
    console.error("Error approving application:", error);
  }
};

  
  
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {applications.map((app) => (
    <div
      key={app._id}
      className="group rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 shadow-xl shadow-black/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-blue-500/10"
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">
          Application #{app._id.slice(-4)}
        </h2>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
            app.status === "selected"
              ? "bg-green-500/15 text-green-400 ring-1 ring-green-500/20"
              : app.status === "rejected"
              ? "bg-red-500/15 text-red-400 ring-1 ring-red-500/20"
              : "bg-yellow-500/15 text-yellow-400 ring-1 ring-yellow-500/20"
          }`}
        >
          {app.status}
        </span>
      </div>

      {/* Application Details */}
      <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/50 p-4">
        <p className="text-sm text-slate-400">
          <span className="font-medium text-slate-200">Job ID</span>
          <br />
          <span className="break-all text-slate-500">{app.job}</span>
        </p>

        <p className="text-sm text-slate-400">
          <span className="font-medium text-slate-200">Applied By</span>
          <br />
          <span className="break-all text-slate-500">{app.appliedBy}</span>
        </p>

        <p className="text-sm text-slate-400">
          <span className="font-medium text-slate-200">Date</span>
          <br />
          <span className="text-slate-500">
            {new Date(app.date).toLocaleString()}
          </span>
        </p>
      </div>

      {/* Actions */}
      <div className="mt-5 flex gap-3">
        <button
          className="flex-1 rounded-lg bg-emerald-500/90 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95"
        onClick={()=>{statusUpdate(app._id,"selected")}}>
          Approve
        </button>

        <button
          className="flex-1 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-400 transition-all hover:border-red-500/50 hover:bg-red-500/20 hover:text-red-300 active:scale-95"
        onClick={()=>{statusUpdate(app._id,"rejected")}}>
          Reject
        </button>
      </div>
    </div>
  ))}
</div>
  )
}

export default JobApplications