import React, { useState, useEffect } from 'react';
import { Bell, Users, Palette, ImageIcon, MoreVertical, Undo, Redo } from 'lucide-react';
import './EditNoteModal.scss';

const EditNoteModal = ({ note, onClose, onSave }) => {
  const [editedNote, setEditedNote] = useState({
    title: note.title,
    description: note.description,
    color: note.color  
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedNote(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave({
      ...note,
      title: editedNote.title,
      description: editedNote.description,
      color: editedNote.color  // Change this from backgroundColor to color
    });
  };

  // Auto-save when input changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSave();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [editedNote]);

  return (
    <div className="edit-note-overlay" onClick={onClose}>
      <div 
        className="edit-note-modal" 
        style={{ backgroundColor: editedNote.color || '#ffffff' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="edit-note-modal__header">
          <input
            type="text"
            name="title"
            value={editedNote.title}
            onChange={handleInputChange}
            className="edit-note-modal__title"
            placeholder="Title"
          />
          <Bell className="edit-note-modal__reminder" size={20} />
        </div>

        <textarea
          name="description"
          value={editedNote.description}
          onChange={handleInputChange}
          className="edit-note-modal__description"
          placeholder="Description"
        />

        <div className="edit-note-modal__footer">
          <div className="edit-note-modal__actions">
            <button className="edit-note-modal__action-btn">
              <Bell size={18} />
            </button>
            <button className="edit-note-modal__action-btn">
              <Users size={18} />
            </button>
            <button className="edit-note-modal__action-btn">
              <Palette size={18} />
            </button>
            <button className="edit-note-modal__action-btn">
              <ImageIcon size={18} />
            </button>
            <button className="edit-note-modal__action-btn">
              <MoreVertical size={18} />
            </button>
          </div>

          <div className="edit-note-modal__history">
            <button className="edit-note-modal__action-btn">
              <Undo size={18} />
            </button>
            <button className="edit-note-modal__action-btn">
              <Redo size={18} />
            </button>
          </div>

          <div className="edit-note-modal__meta">
            <button 
              className="edit-note-modal__close"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNoteModal;

