import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { jobsApi } from "../api/jobs";
import PageHeader from "./PageHeader";

const ApplicationDetailsPage = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadJob() {
      try {
        setLoading(true);
        setError("");
        setJob(null);

        const data = await jobsApi.getById(id, controller.signal);

        if (!controller.signal.aborted) {
          setJob(data);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadJob();

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return <p>Loading Application Details</p>;
  }
  if (error) {
    return (
      <section>
        <p role="alert">{error}</p>
        <Link to="/applications">Back to Applications</Link>
      </section>
    );
  }
  if (!job) {
    return (
      <section>
        <h2>Application Not Found</h2>
        <p>Application may have been deleted or The ID is incorrect </p>
        <Link to="/applications">Back to Applications</Link>
      </section>
    );
  }

  return (
    <section>
      <PageHeader
        title="Application Details"
        description="Showing your selected application"
      />
      <div className="relative border p-5 rounded-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold my-1">{job.company}</h3>
            <p className="my-1">{job.role}</p>
            <p className="my-1">{job.location}</p>
          </div>
          <div className="status-badge">
            <span id={`status-${job.status.toLowerCase()}`}>
              {job.status}
            </span>
          </div>
        </div>
        <hr />
        <div className="jobdetails-container">
          <h2>Application Information</h2>
          <div className="flex items-center justify-between my-5">
            <div className="flex-1">
              <p>Applied Date</p>
              <h2>{job.appliedOn}</h2>
            </div>
            <div className="flex-1">
              <p>Job Location</p>
              <h2>{job.location}</h2>
            </div>
          </div>
          <div className="flex items-center justify-between my-5">
            <div className="flex-1">
              <p>Job Role</p>
              <h2>{job.role}</h2>
            </div>
            <div className="flex-1">
              <p>Company</p>
              <h2>{job.company}</h2>
            </div>
          </div>
        </div>
      </div>
      <Link
        to="/applications"
        className="inline-block text-indigo-600 underline my-10"
      >
        ← Back to Applications
      </Link>
    </section>
  );
};

export default ApplicationDetailsPage;
