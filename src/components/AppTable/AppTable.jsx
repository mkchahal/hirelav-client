import axios from "axios";
import React, { useEffect, useState } from "react";
import './AppTable.scss';
import {
    APPLICATIONS_URL,
    getAllApplications,
    getAllJobs,
} from "../../utils/APIUtils";
import { Button, Checkbox, Dropdown, Icon, Menu, Table } from "semantic-ui-react";

export default function AppTable() {
    const [apps, setApps] = useState([]);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        let token = sessionStorage.getItem("authToken");
        getAllApplications(token, setApps);
        getAllJobs(token, setJobs);
    }, []);

    const handleDelete = (id) => {
        let token = sessionStorage.getItem("authToken");
        axios
            .delete(`${APPLICATIONS_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => getAllApplications(token, setApps))
            .catch((err) => console.log(err));
    };

    const handleStatusChange = (event, id) => {
        let token = sessionStorage.getItem("authToken");
        console.log(event.target.innerText);
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
            <Table celled selectable color='violet'>
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
                            <Table.Cell>{app.job_id}</Table.Cell>
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
