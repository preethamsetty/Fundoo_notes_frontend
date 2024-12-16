import React, { useState, useEffect } from 'react';
import { Bell, Users, Palette, ImageIcon, MoreVertical, Undo, Redo } from 'lucide-react';
import './EditNoteModal.scss';

const colorOptions = [
  { name: "Default", color: "#FFFFFF" },
  { name: "Coral", color: "#FAAFA8" },
  { name: "Peach", color: "#F39F76" },
  { name: "Sand", color: "#FFF8B8" },
  { name: "Mint", color: "#E2F6D3" },
  { name: "Sage", color: "#B4DDD3" },
  { name: "Fog", color: "#D4E4ED" },
  { name: "Storm", color: "#AECCDC" },
  { name: "Dusk", color: "#D3BFDB" },
  { name: "Blossom", color: "#F6E2DD" },
  { name: "Clay", color: "#E9E3D4" },
  { name: "Chalk", color: "#EFEFF1" },
];

const EditNoteModal = ({ note, onClose, onSave }) => {
  const [editedNote, setEditedNote] = useState({
    title: note.title,
    description: note.description,
    color: note.color,
  });
  const [showPalette, setShowPalette] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleColorSelect = (color) => { 
    const updatedNote = {
      ...editedNote,
      color,
    };

    // Update the local state with the new color
    setEditedNote(updatedNote);

    // Save changes to the backend
    onSave({
      ...note,
      title: updatedNote.title,
      description: updatedNote.description,
      color,
    });

    // Close the color palette
    setShowPalette(false);
  };

  const handleSave = () => {
    onSave({
      ...note,
      title: editedNote.title,
      description: editedNote.description,
      color: editedNote.color,
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
        onClick={(e) => e.stopPropagation()}
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
            <div className="edit-note-modal__color-picker">
              <button
                className="edit-note-modal__action-btn"
                onClick={() => setShowPalette(!showPalette)}
              >
                <Palette size={18} />
              </button>
              {showPalette && (
                <div className="color-palate">
                  {colorOptions.map((option) => (
                    <div
                      key={option.color}
                      className="color-palate__color"
                      title={option.name}
                      style={{
                        backgroundColor: option.color,
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        margin: '4px',
                      }}
                      onClick={() => handleColorSelect(option.color)}
                    ></div>
                  ))}
                </div>
              )}
            </div>
            <button className="edit-note-modal__action-btn">
              <Users size={18} />
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
            <button className="edit-note-modal__close" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNoteModal;

