import React, {  useState, useEffect} from 'react';
import axios from 'axios';
import { JOBS_URL, getAllJobs } from '../../utils/APIUtils';


export default function EditJob(props) {
    const [jobs, setJobs] = useState([]);
    const [currentJob, setCurrentJob] = useState({});
    const jobID = props.match.params.id;

    useEffect(() => {
        let token = sessionStorage.getItem('authToken');
        getAllJobs(token, setJobs);
    }, [currentJob]);

    useEffect(() => {
        let foundJob = jobs.find(job => job.id === jobID);
        console.log(foundJob);
        setCurrentJob(foundJob);
    }, [jobs, jobID])

  return (
    <>
        {console.log(jobs)}
        {console.log(currentJob)}
    </>
  )
}

