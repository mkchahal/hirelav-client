import React from 'react';
import { Markup } from 'interweave';
import './JobCard.scss';
import { Icon } from 'semantic-ui-react';

function JobCard({ title, description, date }) {
  console.log(description.replaceAll('p>', 'span>'));
  return (
    <div className="job-card">
      <div className="job-card__header">
        <h2>{title}</h2>
      </div>
      <div className="job-card__text">
        <p>
          <Markup content={description.replaceAll('p>', 'span>').slice(0, 250)} />
          <span>...</span>
        </p>
      </div>
      <button>
        <Icon name='eye' />
        View
      </button>
      <p className='job-card__date'><Icon name='time' /> Posted on {date.slice(0, 10)}</p>
    </div>
  )
}

export default JobCard;