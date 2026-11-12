import React, { useState } from 'react'
import JobCard from './JobCard';

const ApplicationList = ({ jobs, onOpen ,onEdit , onDelete }) => {
    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    if (jobs == null) {
        return <p>No Application Available</p>
    }
    //Search and Filter
    const query = searchText.trim().toLowerCase();
    const filteredJobs = jobs.filter((job) => {
        const company = job.company?.toLowerCase() ?? "";
        const role = job.role?.toLowerCase() ?? "";
        const matchesText = company.includes(query) || role.includes(query);
        const matchesStatus = statusFilter === "all" || job.status === statusFilter;
        return matchesText && matchesStatus;
    })

    //Sort
    const visibleJobs = [...filteredJobs].sort((a, b) => {
        if (sortBy === "company") {
            return (a.company ?? "").localeCompare(b.company ?? "");
        }
        if (sortBy === "oldest") {
            return (a.appliedOn ?? "").localeCompare(b.appliedOn ?? "");
        }
        //Default
        return (b.appliedOn ?? "").localeCompare(a.appliedOn ?? "");
    })
    return (
        <section>
            <div className='flex justify-between my-10'>
                <input type='search' className='flex-1 border-2 mr-5 p-2 rounded-sm focus:outline-none focus:border-indigo-600'
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                />
                <select value={statusFilter} className='border-2 mr-5 p-2 rounded-sm focus:outline-none focus:border-indigo-600'
                    onChange={(event) => setStatusFilter(event.target.value)}>
                    <option value="all" className=''>All Status</option>
                    <option value="applied">Applied</option>
                    <option value="rejected">Rejected</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                </select>
                <select value={sortBy} className='border-2 p-2 rounded-sm focus:outline-none focus:border-indigo-600'
                    onChange={(event) => setSortBy(event.target.value)}>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="company">Company</option>
                </select>
            </div>
            <div>
                {visibleJobs.map((job) => (
                     <JobCard
                        key={job.id}
                        job={job}
                        onOpen={onOpen}
                        onEdit={onEdit}
                        onDelete={onDelete} 
                    />
                ))}
            </div>
        </section>
    )
}

export default ApplicationList