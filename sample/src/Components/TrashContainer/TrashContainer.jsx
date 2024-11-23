import React from 'react';
import './TrashContainer.scss';

const TrashContainer = ({ trashedNotes }) => {
  return (
    <div className="trash-container">
      {trashedNotes && trashedNotes.length > 0 ? (
        trashedNotes.map((note) => (
          <div key={note.id} className="trash-note">
            <h3>{note.title}</h3>
            <p>{note.description}</p>
          </div>
        ))
      ) : (
        <p className="empty-message">No trashed notes available</p>
      )}
    </div>
  );
};

export default TrashContainer;
