import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getAllApplications } from '../../utils/APIUtils';


export default function AppTable() {
    const [apps, setApps] = useState([]);

    useEffect(() => {
        let token = sessionStorage.getItem('authToken');
        getAllApplications(token, setApps);
    }, [])
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
                    </tr>
                </thead>
                <tbody>
                    {apps.map(app =>
                        <tr key={app.id}>
                            <th scope="row">{app.id}</th>
                            <td>{app.firstName} {app.lastName}</td>
                            <td>{app.job_id}</td>
                            <td>{app.status}</td>
                            <td>{app.email}</td>
                            <td>{app.phone}</td>
                            <td>{app.updated_at.slice(0, 10)}</td>
                        </tr>
                    )
                    }
                </tbody>
            </Table>
        </>
    )
}
