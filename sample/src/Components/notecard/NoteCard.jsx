import React from 'react';
import './NoteCard.scss';

const NoteCard = ({ note, onArchive, onDelete }) => {
  return (
    <div className="note-card">
      <h3 className="note-card__title">{note.title}</h3>
      <p className="note-card__content">{note.description}</p>
      <div className="note-card__actions">
        <button 
          className="note-card__action-btn" 
          onClick={() => onArchive(note._id)}
          disabled={note.isArchive}
        >
          {note.isArchive ? 'Archived' : 'Archive'}
        </button>
        <button 
          className="note-card__action-btn" 
          onClick={() => onDelete(note._id)}
          disabled={note.isTrash}
        >
          {note.isTrash ? 'In Trash' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default NoteCard;


