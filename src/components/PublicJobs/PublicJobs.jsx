import React, { useEffect, useState } from 'react';
import './PublicJobs.scss';
import axios from 'axios';
import { Markup } from 'interweave';
import { JOBS_URL } from '../../utils/APIUtils';
import { Card, Icon, List } from 'semantic-ui-react';

export default function PublicJobs() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios.get(`${JOBS_URL}/public`)
            .then(res => setJobs(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className='cards'>
            <h1 className='cards__heading'>{jobs.length === 0 ? `No Job Postings yet. Please revisit in future` : `${jobs.length} open positions`}</h1>
            <Card.Group itemsPerRow={4} centered>
                {
                    jobs.map(job =>
                        <Card as='div' key={job.id} raised>
                            <Card.Content>
                                <Card.Header className='cards__title'>{job.title}</Card.Header>
                                <Card.Description>
                                    <Markup content={job.description.slice(0, 300)} />
                                    <List.Content><a href='/'>...Read more</a></List.Content>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <button className='cards__btn--share'>
                                    <Icon name='share' />
                                    Share
                                </button>
                                <button className='cards__btn--apply'>
                                    <Icon name='hand point up' />
                                    Apply
                                </button>
                            </Card.Content>
                            <Card.Content extra> <Icon name='time' /> Posted 2 days ago</Card.Content>
                        </Card>
                    )
                }
            </Card.Group>
        </div>
    )
}
