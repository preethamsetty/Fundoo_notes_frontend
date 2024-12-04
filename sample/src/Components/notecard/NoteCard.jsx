import React, { useState } from "react";
import { Bell, Trash2, Palette, Archive, MoreVertical, Check, RefreshCw } from 'lucide-react';
import EditNoteModal from "../EditNoteModal/EditNoteModal";
import "./NoteCard.scss";

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

const NoteCard = ({ note, onArchive, onTrash, onUpdate, onRestore, onDeleteForever, isTrash = false }) => {
  const [showPalette, setShowPalette] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [localNote, setLocalNote] = useState(note);

  const handleColorSelect = (color) => {
    const updatedNote = { ...localNote, color };
    setLocalNote(updatedNote);
    const backendPayload = { ...updatedNote, backgroundColor: color };
    onUpdate(backendPayload);
    setShowPalette(false);
  };

  const handleNoteClick = (e) => {
    if (!isTrash && !e.target.closest(".note-card__actions")) {
      setShowEditModal(true);
    }
  };

  const handleNoteUpdate = (updatedNote) => {
    setLocalNote(updatedNote);
    onUpdate(updatedNote);
  };

  return (
    <>
      <div
        className={`note-card ${localNote.isTrash ? "note-card--trashed" : ""}`}
        style={{ backgroundColor: localNote.color }}
        onClick={handleNoteClick}
      >
        <div className="note-card__header">
          <Check size={18} className="note-card__check" />
          {!isTrash && <Bell size={18} className="note-card__reminder" />}
        </div>
        <h3 className="note-card__title">{localNote.title}</h3>
        <p className="note-card__content">{localNote.description}</p>
        <div className="note-card__actions">
          {isTrash ? (
            <>
              <button
                className="note-card__action-btn"
                onClick={() => onRestore(localNote._id)}
                title="Restore"
              >
                <RefreshCw size={16} />
              </button>
              <button
                className="note-card__action-btn"
                onClick={() => onDeleteForever(localNote._id)}
                title="Delete Forever"
              >
                <Trash2 size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                className="note-card__action-btn"
                onClick={() => onTrash(localNote._id)}
                title="Trash"
              >
                <Trash2 size={16} />
              </button>
              <button
                className="note-card__action-btn"
                onClick={() => onArchive(localNote._id)}
                title={localNote.isArchive ? "Unarchive" : "Archive"}
              >
                <Archive size={16} />
              </button>
              <button
                className="note-card__action-btn"
                onClick={() => setShowPalette(!showPalette)}
                title="Background options"
              >
                <Palette size={16} />
              </button>
              <button className="note-card__action-btn" title="More">
                <MoreVertical size={16} />
              </button>
            </>
          )}
        </div>
        {showPalette && !isTrash && (
          <div className="color-palate-cnt">
            {colorOptions.map((option, index) => (
              <div
                key={option.color}
                className={`col${index + 1}`}
                title={option.name}
                onClick={() => handleColorSelect(option.color)}
              ></div>
            ))}
          </div>
        )}
      </div>
      {showEditModal && !isTrash && (
        <EditNoteModal
          note={localNote}
          onClose={() => setShowEditModal(false)}
          onSave={handleNoteUpdate}
        />
      )}
    </>
  );
};

export default NoteCard;
