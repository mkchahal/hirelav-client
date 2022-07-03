import React from 'react';
import { Markup } from 'interweave';
import './PublicJobCard.scss';
import { Icon } from 'semantic-ui-react';

function PublicJobCard({ title, description, date }) {
  return (
    <div className="job-card">
      <div className="job-card__header">
        <h2>{title}</h2>
      </div>
      <div className="job-card__text">
        <div>
          <Markup content={description.replaceAll('p>', 'span>').slice(0, 250)} />
          <span>...</span>
        </div>
      </div>
      <button>
        <Icon name='eye' />
        View
      </button>
      <p className='job-card__date'><Icon name='time' /> Posted on {date.slice(0, 10)}</p>
    </div>
  )
}

export default PublicJobCard;