import React from 'react'
import UseJobs from "../Hooks/UseJobs"
import SummaryCard from "../Components/SummaryCard"
import PageHeader from './PageHeader';
const DashBoard = () => {

    const {
    jobs,
    loading,
    error
  } = UseJobs();

  if(loading){
    return <p>Loading Dashboard...</p>
  }
  if(error){
    return <p role='alert'>{error}</p>
  }

  const totalJobs = jobs.length;
  const appliedJobs = jobs.filter(
    (job) => job.status === "Applied"
  ).length;
  const interviewJobs = jobs.filter(
    (job) => job.status === "Interview"
  ).length;

  return (
    <section>
        <PageHeader 
            title = "Dashboard"
            description= "Welcome to Dashboard"
        />
        <div className="flex gap-10">
        <SummaryCard
          title="Total Applications"
          value={totalJobs}
        />
        <SummaryCard
          title="Applied"
          value={appliedJobs}
        />
        <SummaryCard
          title="Interviews"
          value={interviewJobs}
        />
      </div>
    </section>
  )
}

export default DashBoard