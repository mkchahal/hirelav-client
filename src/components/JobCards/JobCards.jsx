import React, { useEffect, useState } from "react";
import "./JobCards.scss";
import { getAllJobs, JOBS_URL } from "../../utils/APIUtils";
import { FaPlus } from "react-icons/fa";
import JobCard from "../JobCard/JobCard";
import { Form, Icon, Modal } from "semantic-ui-react";
import axios from "axios";
import Swal from 'sweetalert2';

export default function JobCards() {
    const [jobs, setJobs] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        let token = sessionStorage.getItem("authToken");
        getAllJobs(token, setJobs);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        let token = sessionStorage.getItem('authToken');
        axios.post(`${JOBS_URL}`, {
            title: event.target.title.value,
            description: event.target.description.value,
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(Swal.fire({
                title: 'Successfully Posted',
                text: 'New job has been updated.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            }))
            .then(() => getAllJobs(token, setJobs))
            .then(() => setOpen(false))
            .catch(err => console.log(err.response.data))
    };

    return (
        <div className="jobs">
            <h1>
                {jobs.length === 0
                    ? `No Job Postings yet. Please visit later.`
                    : `${jobs.length} Total Job Postings`}{" "}
            </h1>
            <div className="jobs__container">
                {jobs.map((job) => (
                    <JobCard setJobs={setJobs} job={job} />
                ))}
                <div className="rec-job-card__add" onClick={() => setOpen(true)}>
                    <FaPlus size={50} />
                </div>
                <Modal closeIcon open={open} onClose={() => setOpen(false)}>
                    <Modal.Header>Add a new job posting</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <Form.Input
                                label="Job Title"
                                placeholder="Job Title"
                                name="title"
                            />
                            <Form.TextArea
                                label="Job Description"
                                size="large"
                                style={{ minHeight: "25rem" }}
                                placeholder="Job Description"
                                name="description"
                            />
                            <div className="jobs__buttons">
                                <Form.Button color="green" content="submit">
                                    Add <Icon name="add" />
                                </Form.Button>
                                <Form.Button onClick={() => setOpen(false)} negative>
                                    Close <Icon name="cancel" />
                                </Form.Button>
                            </div>
                        </Form>
                    </Modal.Content>
                </Modal>
            </div>
        </div>
    );
}
