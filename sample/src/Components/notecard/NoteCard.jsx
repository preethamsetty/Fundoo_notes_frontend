import React from "react";
import { Bell, Trash2, Palette, Archive, MoreVertical, Check } from 'lucide-react';
import "./NoteCard.scss";

const NoteCard = ({ note, onArchive, onTrash }) => {
  return (
    <div className={`note-card ${note.isTrash ? "note-card--trashed" : ""}`}>
      <div className="note-card__header">
        <Check size={18} className="note-card__check" />
        <Bell size={18} className="note-card__reminder" />
      </div>
      <h3 className="note-card__title">{note.title}</h3>
      <p className="note-card__content">{note.description}</p>
      <div className="note-card__actions">
        <button className="note-card__action-btn" title="Remind me">
          <Bell size={16} />
        </button>
        <button
          className="note-card__action-btn"
          onClick={() => onTrash(note._id)}
          title="Trash"
        >
          <Trash2 size={16} />
        </button>
        <button
          className="note-card__action-btn"
          onClick={() => onArchive(note._id)}
          title={note.isArchive ? "Unarchive" : "Archive"}
        >
          <Archive size={16} />
        </button>
        <button className="note-card__action-btn" title="Background options">
          <Palette size={16} />
        </button>
        <button className="note-card__action-btn" title="More">
          <MoreVertical size={16} />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;

