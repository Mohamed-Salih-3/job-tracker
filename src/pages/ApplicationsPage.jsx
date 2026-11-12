import React, { useState } from "react";
import UseJobs from "../Hooks/UseJobs";
import {jobsApi} from "../api/jobs"
import JobForm from "../Components/JobForm"
import ApplicationList from "../Components/ApplicationList";
import { useNavigate } from "react-router-dom";
import PageHeader from "./PageHeader";

const ApplicationsPage = () => {
  const { jobs, setJobs, loading, error, refresh } = UseJobs();

  const navigate = useNavigate();

  const [editingJobId, setEditingJobId] = useState(null);
  const [mutationError, setMutationError] = useState("");

  const editingJob = jobs.find((job) => job.id === editingJobId) ?? null;

  async function handleSave(formValues) {
    setMutationError("");

    try {
      if (editingJobId !== null) {
        const updatedJob = await jobsApi.update(editingJobId, formValues);

        setJobs((current) =>
          current.map((job) =>
            job.id === editingJobId ? { ...job, ...updatedJob } : job,
          ),
        );

        setEditingJobId(null);
      } else {
        const newJob = await jobsApi.create(formValues);

        setJobs((current) => [...current, newJob]);
      }
    } catch (err) {
      setMutationError(err.message || "Could not save the application.");
      throw err;
    }
  }

  function handleEdit(jobId) {
    setEditingJobId(jobId);

    document
      .getElementById("job-form-section")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  async function handleDelete(jobId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?",
    );

    if (!confirmed) return;

    setMutationError("");

    try {
      await jobsApi.remove(jobId);

      setJobs((current) => current.filter((job) => job.id !== jobId));

      if (editingJobId === jobId) {
        setEditingJobId(null);
      }
    } catch (err) {
      setMutationError(err.message || "Could not delete the application.");
    }
  }

  function handleOpen(jobId) {
    navigate(`/applications/${jobId}`)
  }

  return (
    <section>
        <PageHeader 
            title= "My Applications"
            description= "Showing your applications"
        />

        <div id="jobdiv">

        <JobForm
          key={editingJobId ?? "new"}
          onSave={handleSave}
          editingJob={editingJob}
          onCancel={() => setEditingJobId(null)}
        />
      </div>

      {mutationError && (
        <div role="alert">
          <p>{mutationError}</p>
        </div>
      )}

      <div className="jobs-section">
        <h2 className="mt-10 text-2xl font-bold">My Applications</h2>

        {loading && <p>Loading applications...</p>}

        {error && (
          <div role="alert">
            <p>Could not load applications: {error}</p>
            <button type="button" onClick={refresh}>
              Retry
            </button>
          </div>
        )}

        {!loading && !error && jobs.length === 0 && (
          <p>No applications yet. Add your first application above.</p>
        )}

        {!loading && !error && jobs.length > 0 && (
          <ApplicationList
            jobs={jobs}
            onOpen={handleOpen}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </section>
  )
};

export default ApplicationsPage;
