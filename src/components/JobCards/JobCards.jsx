import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Button, Icon, Label, Dropdown } from 'semantic-ui-react';
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

    const handleStatusChange = (event, id) => {
        let token = sessionStorage.getItem('authToken');
        console.log(event.target.innerText);
        axios.put(`${JOBS_URL}/${id}`, { status: event.target.innerText }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => getAllJobs(token, setJobs))
            .catch(err => console.log(err.response.data))
    }

    const statusColor = (status) => {
        return status === 'Open' ? 'green' : status === 'Closed' ? 'red' : 'orange'
    }

    return (
        <>
            {jobs.map(job =>
                <Card key={job.id} border="secondary" style={{ width: '18rem' }}>
                    <Card.Header >{job.title}</Card.Header>
                    <Label as='a' color={statusColor(job.status)} ribbon="right">
                        <Dropdown text={job.status}
                            fluid
                            options={[
                                { value: 'Open', text: 'Open' },
                                { value: 'On Hold', text: 'On Hold' },
                                { value: 'Closed', text: 'Closed' },
                            ]}
                            onChange={(event) => handleStatusChange(event, job.id)}
                        />
                        {/* {job.status} */}
                    </Label>
                    <Card.Body>
                        <Card.Title>Posted on {job.updated_at.slice(0, 10)}</Card.Title>
                        <Markup content={job.description.slice(0, 300) + "......Read More"} />
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
