import React, { useEffect, useState } from 'react';
import './PublicJobs.scss';
import axios from 'axios';
import { JOBS_URL } from '../../utils/APIUtils';
import JobCard from '../JobCard/JobCard';

function PublicJobs() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get(`${JOBS_URL}/public`)
      .then(res => setJobs(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className='public-jobs'>
      <h1 className='cards__heading'>{jobs.length === 0 ? `No Job Postings yet. Please visit later.` : `${jobs.length} Open Positions`}</h1>
      <div className="public-jobs__container">
      {
        jobs.map(job =>
          <JobCard
            key={job.id}
            title={job.title}
            description={job.description}
            date={job.updated_at} />
        )
      }

      </div>
    </div>
  )
}

export default PublicJobs;