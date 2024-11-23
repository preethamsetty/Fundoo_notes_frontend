import React from 'react';
import './ArchiveContainer.scss';

const ArchiveContainer = ({ archivedNotes }) => {
  return (
    <div className="archive-container">
      {archivedNotes && archivedNotes.length > 0 ? (
        archivedNotes.map((note) => (
          <div key={note.id} className="archive-note">
            <h3>{note.title}</h3>
            <p>{note.description}</p>
          </div>
        ))
      ) : (
        <p className="empty-message">No archived notes available</p>
      )}
    </div>
  );
};

export default ArchiveContainer;
