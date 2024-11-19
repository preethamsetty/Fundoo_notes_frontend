import React from 'react';
import './NoteCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUserPlus, faPalette, faImage, faArchive, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const NoteCard = ({ title, description }) => {
  return (
    <div className="note-card">
      <div className="main-cnt">
        <div className="card-content">
          <div className="card-title">{title}</div>
          <div className="card-description">{description}</div>
        </div>
        <div className="icon-cnt">
          <FontAwesomeIcon icon={faBell} />
          <FontAwesomeIcon icon={faUserPlus} />
          <FontAwesomeIcon icon={faPalette} />
          <FontAwesomeIcon icon={faImage} />
          <FontAwesomeIcon icon={faArchive} />
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;