// import React from 'react';
// import './NoteCard.scss';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBell, faUserPlus, faPalette, faImage, faArchive, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

// const NoteCard = ({ title, description }) => {
//   return (
//     <div className="note-card">
//       <div className="main-cnt">
//         <div className="card-content">
//           <div className="card-title">{title}</div>
//           <div className="card-description">{description}</div>
//         </div>
//         <div className="icon-cnt">
//           <FontAwesomeIcon icon={faBell} />
//           <FontAwesomeIcon icon={faUserPlus} />
//           <FontAwesomeIcon icon={faPalette} />
//           <FontAwesomeIcon icon={faImage} />
//           <FontAwesomeIcon icon={faArchive} />
//           <FontAwesomeIcon icon={faEllipsisVertical} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NoteCard;

import React, { useState } from 'react';
import { Bell, Users, Palette, ImageIcon, Archive, MoreVertical, Check, Pin } from 'lucide-react';
import './NoteCard.scss';

const NoteCard = ({ title, content }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="note-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="note-card__header">
        <div className="note-card__check">
          <Check size={16} />
        </div>
        <div className="note-card__pin">
          <Pin size={16} />
        </div>
      </div>

      <div className="note-card__content">
        <h3 className="note-card__title">{title || 'Empty note'}</h3>
        <p className="note-card__text">{content}</p>
      </div>

      {isHovered && (
        <div className="note-card__actions">
          <button className="note-card__action-btn" title="Remind me">
            <Bell size={16} />
          </button>
          <button className="note-card__action-btn" title="Collaborator">
            <Users size={16} />
          </button>
          <button className="note-card__action-btn" title="Background options">
            <Palette size={16} />
          </button>
          <button className="note-card__action-btn" title="Add image">
            <ImageIcon size={16} />
          </button>
          <button className="note-card__action-btn" title="Archive">
            <Archive size={16} />
          </button>
          <button className="note-card__action-btn" title="More">
            <MoreVertical size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default NoteCard;