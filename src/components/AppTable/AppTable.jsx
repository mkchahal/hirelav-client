import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Dropdown, Button } from 'semantic-ui-react';
import { APPLICATIONS_URL, getAllApplications, getAllJobs } from '../../utils/APIUtils';


export default function AppTable() {
    const [apps, setApps] = useState([]);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        let token = sessionStorage.getItem('authToken');
        getAllApplications(token, setApps);
        getAllJobs(token, setJobs);
    }, []);

    const handleDelete = id => {
        let token = sessionStorage.getItem('authToken');
        axios.delete(`${APPLICATIONS_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
            .then(() => getAllApplications(token, setApps))
            .catch(err => console.log(err))
    }

    const handleStatusChange = (event, id) => {
        let token = sessionStorage.getItem('authToken');
        console.log(event.target.innerText);
        axios.put(`${APPLICATIONS_URL}/${id}`, {status: event.target.innerText}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => getAllApplications(token, setApps))
            .catch(err => console.log(err.response.data))
    }

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Job</th>
                        <th scope="col">Status</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Applied On</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        apps.map(app =>
                            <tr key={app.id}>
                                <th scope="row">{app.id}</th>
                                <td>{app.firstName} {app.lastName}</td>
                                <td>{jobs[app.job_id].title}</td>
                                <td>
                                    <Dropdown
                                        defaultValue={app.status}
                                        fluid
                                        selection
                                        options={[
                                            { value: 'Applied', text: 'Applied' },
                                            { value: 'Shortlisted', text: 'Shortlisted' },
                                            { value: 'Interview', text: 'Interview' },
                                            { value: 'Coding Challenge', text: 'Coding Challenge' },
                                            { value: 'Offer', text: 'Offer' },
                                            { value: 'Hired', text: 'Hired' },
                                        ]}
                                        onChange={(event) => handleStatusChange(event, app.id)}
                                    />
                                </td>
                                <td>{app.email}</td>
                                <td>{app.phone}</td>
                                <td>{app.updated_at.slice(0, 10)}</td>
                                <td>
                                    <Button onClick={() => handleDelete(app.id)} icon='delete' color='red' compact />
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </>
    )
}
