import React from "react";
import StatusBadge from "./StatusBadge";

const JobCard = ({ job, onOpen, onEdit, onDelete }) => {
  const companyName = job.company?.trim() || "Company not provided";
  const roleName = job.role?.trim() || "Role not provided";
  const jobLocation = job.location?.trim() || "Location not provided";
  return (
    <article className="flex items-center justify-between border my-5 px-2 py-4 rounded-2xl  hover:border-indigo-600 hover:shadow-xl/30 shadow-indigo-600">
      <div className="w-150 mx-2">
        <h3 className="text-xl font-bold">{companyName}</h3>
        <p>{roleName}</p>
        <p>{jobLocation}</p>
        <p>{job.appliedOn || "Date not provided"}</p>
      </div>
      <StatusBadge status={job.status} />
      <div className="">
        <button type="button" onClick={() => onOpen(job.id)} className="border mx-3 py-2 px-4 rounded-sm bg-indigo-600 text-amber-50 border-indigo-600 ">
          View
        </button>
        <button type="button" onClick={() => onEdit(job.id)} className="border mx-3 py-2 px-4 rounded-sm bg-green-600 text-amber-50 border-green-600">
          Edit
        </button>
        <button type="button" onClick={() => onDelete(job.id)} className="border mx-3 py-2 px-4 rounded-sm bg-red-600 text-amber-50 border-red-600">
          Delete
        </button>
      </div>
    </article>
  );
};

export default JobCard;
