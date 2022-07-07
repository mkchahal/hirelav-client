import React, { useState } from 'react';
import { Markup } from 'interweave';
import './PublicJobCard.scss';
import { Button, Icon, Modal } from 'semantic-ui-react';

function PublicJobCard({ title, description, date }) {

  const [open, setOpen] = useState(false);

  return (
    <div className="job-card">
      <Modal
        closeIcon
        open={open}
        onClose={() => setOpen(false)}
      >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            <Markup content={description} />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={() => window.location = `mailto:jobs@hirelav.com?subject=${title}: Job Application`}>
            Apply <Icon name='paper plane' />
          </Button>
          <Button onClick={() => setOpen(false)} negative>
            Close <Icon name='cancel' />
          </Button>
        </Modal.Actions>
      </Modal>
      <div className="job-card__header">
        <h2>{title}</h2>
      </div>
      <div className="job-card__text">
        <div>
          <Markup content={description.replaceAll('p>', 'span>').slice(0, 250)} />
          <span>...</span>
        </div>
      </div>
      <button onClick={() => setOpen(true)}>
        <Icon name='eye' />
        View
      </button>
      <p className='job-card__date'><Icon name='time' /> Posted on {date.slice(0, 10)}</p>
    </div>
  )
}

export default PublicJobCard;