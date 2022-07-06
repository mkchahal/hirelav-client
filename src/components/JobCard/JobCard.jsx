import './JobCard.scss';
import { Button, Icon, Modal, Label, Dropdown } from 'semantic-ui-react';
import { JOBS_URL, getAllJobs } from '../../utils/APIUtils';
import { Markup } from 'interweave';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState } from 'react';

export default function JobCard({ job, setJobs }) {

    const [open, setOpen] = useState(false);
    
    const handleViewJob = () => setOpen(true);

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
                let token = sessionStorage.getItem('authToken');
                axios.delete(`${JOBS_URL}/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })
                    .then(() => getAllJobs(token, setJobs))
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'The job has been deleted successfully.',
                            'success'
                        )
                    })
                    .catch(err => console.log(err))
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire(
                    'Cancelled',
                    'Action Cancelled.',
                    'error'
                )
            }
        })

    }

    const handleStatusChange = (event, id) => {
        let token = sessionStorage.getItem('authToken');
        axios.put(`${JOBS_URL}/${id}`, { status: event.target.innerText }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => getAllJobs(token, setJobs))
            .catch(err => console.log(err.response.data))
    }

    const statusColor = job.status === 'Open' ? 'green' : job.status === 'Closed' ? 'red' : 'orange';

    return (
        <>
            <div key={job.id} className="rec-job-card">
                <Modal
                    closeIcon
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <Modal.Header>{job.title}</Modal.Header>
                    <Modal.Content scrolling>
                        <Modal.Description>
                            <Markup content={job.description} />
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={() => setOpen(false)} color='violet'>
                            Apply <Icon name='cancel' />
                        </Button>
                        <Button onClick={() => setOpen(false)} negative>
                            Close <Icon name='cancel' />
                        </Button>
                    </Modal.Actions>
                </Modal>
                <div className="rec-job-card__header">
                    <h2>{job.title}</h2>
                </div>
                <Label color={statusColor} ribbon='right' style={{ position: 'absolute', top: '5.125rem', transform: 'translateX(-112%)' }} >
                    <Dropdown text={job.status}
                        fluid
                        options={[
                            { value: 'Open', text: 'Open' },
                            { value: 'On Hold', text: 'On Hold' },
                            { value: 'Closed', text: 'Closed' },
                        ]}
                        onChange={(event) => handleStatusChange(event, job.id)}
                    />
                </Label>
                <div className='rec-job-card__text'>
                    <Markup content={job.description.replaceAll('p>', 'span>').slice(0, 300) + "..."} />
                </div>

                <div className="rec-job-card__bottom">
                    <p className='rec-job-card__date'><Icon name='time' /> Posted on {job.updated_at.slice(0, 10)}</p>
                    <Button.Group size='large'>
                        <Button color='violet' animated='vertical' onClick={handleViewJob}>
                            <Button.Content hidden>View</Button.Content>
                            <Button.Content visible>
                                <Icon name='eye' />
                            </Button.Content>
                        </Button>
                        <Button negative animated='vertical' onClick={() => handleDelete(job.id)}>
                            <Button.Content hidden>Delete</Button.Content>
                            <Button.Content visible>
                                <Icon name='delete' />
                            </Button.Content>
                        </Button>
                    </Button.Group>
                </div>
            </div>
        </>
    )
}
