import './JobCard.scss';
import { Button, Icon, Label, Dropdown } from 'semantic-ui-react';
import { JOBS_URL, getAllJobs } from '../../utils/APIUtils';
import { Markup } from 'interweave';
import axios from 'axios';

export default function JobCard({ job, setJobs }) {

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

    const statusColor = job.status === 'Open' ? 'green' : job.status === 'Closed' ? 'red' : 'orange';

    return (
        <>
            <div key={job.id} className="rec-job-card">
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
                            <Button color='blue' animated='vertical'>
                                <Button.Content hidden>Edit</Button.Content>
                                <Button.Content visible>
                                    <Icon name='edit' />
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
