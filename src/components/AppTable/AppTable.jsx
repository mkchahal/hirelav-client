import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Dropdown, Button } from 'semantic-ui-react';
import { APPLICATIONS_URL, getAllApplications } from '../../utils/APIUtils';


export default function AppTable() {
    const [apps, setApps] = useState([]);

    
    useEffect(() => {
        let token = sessionStorage.getItem('authToken');
        getAllApplications(token, setApps);
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
                    {apps.map(app =>
                        <tr key={app.id}>
                            <th scope="row">{app.id}</th>
                            <td>{app.firstName} {app.lastName}</td>
                            <td>{app.job_id}</td>
                            <td>
                                <Dropdown text={app.status}>
                                    <Dropdown.Menu>
                                        <Dropdown.Item text='Applied' />
                                        <Dropdown.Item text='Shortlisted' />
                                        <Dropdown.Item text='Interview' />
                                        <Dropdown.Item text='Coding Challenge' />
                                        <Dropdown.Item text='Offer' />
                                        <Dropdown.Item text='Hired' />
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                            <td>{app.email}</td>
                            <td>{app.phone}</td>
                            <td>{app.updated_at.slice(0, 10)}</td>
                            <td>
                                <Button onClick={() => handleDelete(app.id)} icon='delete' color='red' compact/>
                            </td>
                        </tr>
                    )
                    }
                </tbody>
            </Table>
        </>
    )
}
