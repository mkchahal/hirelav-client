import React, { useEffect, useState } from 'react';
import { Card, Badge } from 'react-bootstrap';
// import { Button, Icon } from 'semantic-ui-react';
import { deleteJob, getAllJobs } from '../../utils/APIUtils';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function JobCards() {

    const [jobs, setJobs] = useState([]);
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        let token = sessionStorage.getItem('authToken');
        getAllJobs(token, setJobs)
    }, [isChanged])

    const handleDelete = (id) => {
        let token = sessionStorage.getItem('authToken');
        deleteJob(token, id);
        setIsChanged(true);
    }

    return (
        <>
            {
                jobs.map(job =>
                    <Card key={job.id} border="secondary" style={{ width: '18rem' }}>
                        <Card.Header>{job.title}</Card.Header> <Badge bg="success">{job.status}</Badge>
                        <Card.Body>
                            <Card.Title>Posted on {job.updated_at.slice(0, 10)}</Card.Title>
                            <Card.Text>
                                {job.description}
                            </Card.Text>
                            <Link to='/job/edit'><button>Edit</button></Link>
                            <button onClick={() => handleDelete(job.id)}>Delete</button>
                        </Card.Body>
                    </Card>
                )
            }
            <Link to='/job/add'>
                <Card border="secondary" style={{ width: '18rem' }}>
                    <FaPlus />
                </Card>
            </Link>
        </>
    )
}
