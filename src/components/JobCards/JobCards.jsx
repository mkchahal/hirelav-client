import React, { useEffect, useState } from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Button, Icon } from 'semantic-ui-react';
import { JOBS_URL, getAllJobs } from '../../utils/APIUtils';
import { Markup } from 'interweave';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function JobCards() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        let token = sessionStorage.getItem('authToken');
        getAllJobs(token, setJobs)
    }, [])

    const handleDelete = (id) => {
        let token = sessionStorage.getItem('authToken');
        axios.delete(`${JOBS_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
         })
        .then(() => getAllJobs(token, setJobs))
        .catch(err => console.log(err))
    }

    return (
        <>
            {jobs.map(job =>
                <Card key={job.id} border="secondary" style={{ width: '18rem' }}>
                    <Card.Header>{job.title}</Card.Header> <Badge bg="success">{job.status}</Badge>
                    <Card.Body>
                        <Card.Title>Posted on {job.updated_at.slice(0, 10)}</Card.Title>
                        <Card.Text>
                            <Markup content={job.description.slice(0,300) + "......Read More"}/>
                        </Card.Text>
                        <Link to='/job/edit'>
                            <Button animated='vertical'>
                                <Button.Content hidden>Edit</Button.Content>
                                <Button.Content visible>
                                    <Icon name='edit' />
                                </Button.Content>
                            </Button>
                        </Link>
                        <Button animated='vertical' onClick={() => handleDelete(job.id)}>
                            <Button.Content hidden>Delete</Button.Content>
                            <Button.Content visible>
                                <Icon name='delete' />
                            </Button.Content>
                        </Button>
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
