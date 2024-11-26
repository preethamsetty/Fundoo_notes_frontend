import React from "react";
import { Trash2, RefreshCw } from 'lucide-react';
import "./TrashedNoteCard.scss";

const TrashedNoteCard = ({ note, onRestore, onDeleteForever }) => {
  return (
    <div className="trashed-note-card">
      <h3 className="trashed-note-card__title">{note.title}</h3>
      <p className="trashed-note-card__content">{note.description}</p>
      <div className="trashed-note-card__actions">
        <button
          className="trashed-note-card__action-btn trashed-note-card__restore-btn"
          onClick={() => onRestore(note._id)}
          title="Restore"
        >
          <RefreshCw size={16} />
        </button>
        <button
          className="trashed-note-card__action-btn trashed-note-card__delete-forever-btn"
          onClick={() => onDeleteForever(note._id)}
          title="Delete Forever"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TrashedNoteCard;

