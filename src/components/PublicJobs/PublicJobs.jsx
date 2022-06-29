import React, { useEffect, useState } from 'react';
import './PublicJobs.scss';
import axios from 'axios';
import { Markup } from 'interweave';
import { JOBS_URL } from '../../utils/APIUtils';

export default function PublicJobs() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios.get(`${JOBS_URL}/public`)
            .then(res => setJobs(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            {
                jobs.length === 0
                    ? <h1>No Open Job Postings</h1>
                    : <h1>{jobs.length} Openings</h1>
            }
            {
                jobs.map(job =>
                    <div key={job.id} className='card'>
                        <h2>{job.title}</h2>
                        <Markup content={job.description.slice(0,300) + "......Read More"}/>
                        <button>Share</button>
                        <button>Apply</button>
                    </div>
                )
            }
        </>
    )
}
