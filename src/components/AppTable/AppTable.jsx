import axios from "axios";
import React, { useEffect, useState } from "react";
import './AppTable.scss';
import {
    APPLICATIONS_URL,
    getAllApplications,
} from "../../utils/APIUtils";
import { Button, Dropdown, Icon, Menu, Table } from "semantic-ui-react";
import Swal from 'sweetalert2';

export default function AppTable({ jobs }) {
    const [apps, setApps] = useState([]);
    const foundJob = id => jobs.find(job => job.id === id).title;

    useEffect(() => {
        let token = sessionStorage.getItem("authToken");
        getAllApplications(token, setApps);
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                let token = sessionStorage.getItem("authToken");
                axios
                    .delete(`${APPLICATIONS_URL}/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    .then(() => getAllApplications(token, setApps))
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'The application has been deleted successfully.',
                            'success'
                        )
                    })
                    .catch((err) => console.log(err));
            } else if (
                result.dismiss === Swal.DismissReason.cancel
              ) {
                Swal.fire(
                  'Cancelled',
                  'Action Cancelled.',
                  'error'
                )
              }
        })};

        const handleStatusChange = (event, id) => {
            let token = sessionStorage.getItem("authToken");
            axios
                .put(
                    `${APPLICATIONS_URL}/${id}`,
                    { status: event.target.innerText },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then(() => getAllApplications(token, setApps))
                .catch((err) => console.log(err.response.data));
        };

        return (
            <div className="app-table__wrapper">
                <h1>Application Table</h1>
                <Table compact size='small' celled selectable singleLine color='violet'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Job</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Phone</Table.HeaderCell>
                            <Table.HeaderCell>Applied On</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    {apps.map(app => (
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>{app.firstName} {app.lastName}</Table.Cell>
                                <Table.Cell>{foundJob(app.job_id)}</Table.Cell>
                                <Table.Cell>
                                    <Dropdown text={app.status}
                                        fluid
                                        options={[
                                            { value: "Applied", text: "Applied" },
                                            { value: "Shortlisted", text: "Shortlisted" },
                                            { value: "Interview", text: "Interview" },
                                            { value: "Coding Challenge", text: "Coding Challenge" },
                                            { value: "Offer", text: "Offer" },
                                            { value: "Hired", text: "Hired" },
                                        ]}
                                        onChange={(event) => handleStatusChange(event, app.id)}
                                    />
                                </Table.Cell>
                                <Table.Cell>{app.email}</Table.Cell>
                                <Table.Cell>{app.phone}</Table.Cell>
                                <Table.Cell>{app.updated_at.slice(0, 10)}</Table.Cell>
                                <Table.Cell>
                                    <Button
                                        onClick={() => handleDelete(app.id)}
                                        icon="delete"
                                        color="red"
                                        compact
                                    />
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))}

                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan="7">
                                <Button
                                    icon
                                    labelPosition="left"
                                    color="violet"
                                    size="small"
                                >
                                    <Icon name="add" /> Add Application Manually
                                </Button>
                                <Menu floated='right' pagination>
                                    <Menu.Item as='a' icon>
                                        <Icon name='chevron left' />
                                    </Menu.Item>
                                    <Menu.Item as='a'>1</Menu.Item>
                                    <Menu.Item as='a'>2</Menu.Item>
                                    <Menu.Item as='a'>3</Menu.Item>
                                    <Menu.Item as='a'>4</Menu.Item>
                                    <Menu.Item as='a' icon>
                                        <Icon name='chevron right' />
                                    </Menu.Item>
                                </Menu>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
        );
    }