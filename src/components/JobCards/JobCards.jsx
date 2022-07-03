import React, { useEffect, useState } from 'react';
import './JobCards.scss';
import { Card } from 'react-bootstrap';
import { getAllJobs } from '../../utils/APIUtils';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import JobCard from '../JobCard/JobCard';

export default function JobCards() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        let token = sessionStorage.getItem('authToken');
        getAllJobs(token, setJobs)
    }, [])

    return (
        <div className='jobs'>
            <h1>{jobs.length === 0 ? `No Job Postings yet. Please visit later.` : `${jobs.length} Open Positions`}</h1>
            <div className='jobs__container'>
                {jobs.map(job =>
                    <JobCard setJobs={setJobs} job={job} />
                )
                }
                <Link to='/job/add'>
                    <Card border="secondary" style={{ width: '18rem' }}>
                        <FaPlus />
                    </Card>
                </Link>
            </div>
        </div>
    )
}
