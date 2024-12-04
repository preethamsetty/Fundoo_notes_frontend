import React, { useState, useRef, useEffect } from 'react';
import {Check,Pencil,ImageIcon,Bell,Users,Palette,MoreVertical,Undo,Redo,Archive,
} from 'lucide-react';
import { createNote } from '../../utils/Api';
import './TakeNote.scss';
import { useNavigate } from 'react-router-dom';

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

const TakeNote = ({ onAddNote }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState({
    title: '',
    description: '',
    color: '#FFFFFF',
    isArchive: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPalette, setShowPalette] = useState(false);

  const noteRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (noteRef.current && !noteRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const handleClose = async () => {
    if (note.title.trim() || note.description.trim()) {
      setIsLoading(true);
      setError(null);
      try {
        const createdNote = await createNote(note);
        onAddNote(createdNote.data);
        setNote({ title: '', description: '', color: '#FFFFFF', isArchive: false });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    setIsExpanded(false);
    setShowPalette(false);
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    handleClose();
  };

  const handleColorSelect = (color) => {
    setNote((prevNote) => ({ ...prevNote, color }));
    setShowPalette(false);
  };

  const handleArchive = async () => {
    try {
      const updatedNote = { ...note, isArchive: true };
      const createdNote = await createNote(updatedNote); // Send archive state to the backend
      onAddNote(createdNote.data);
      setNote({ title: '', description: '', color: '#FFFFFF', isArchive: false }); // Reset state
    } catch (err) {
      setError(err.message);
    } finally {
      setIsExpanded(false);
    }
  };

  return (
    <div className="take-note" ref={noteRef} style={{ backgroundColor: note.color }}>
      {!isExpanded ? (
        <div
          className="take-note__collapsed"
          onClick={() => setIsExpanded(true)}
        >
          <div className="take-note__input-container">
            <span className="take-note__placeholder">Take a note...</span>
            <div className="take-note__quick-actions">
              <button className="take-note__action-btn">
                <Check size={20} />
              </button>
              <button className="take-note__action-btn">
                <Pencil size={20} />
              </button>
              <button className="take-note__action-btn">
                <ImageIcon size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="take-note__expanded">
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={note.title}
            onChange={handleInputChange}
            className="take-note__title"
          />
          <textarea
            placeholder="Take a note..."
            name="description"
            value={note.description}
            onChange={handleInputChange}
            className="take-note__content"
          />
          <div className="take-note__actions">
            <div className="take-note__tools">
              <button className="take-note__tool-btn">
                <Bell size={18} />
              </button>
              <button className="take-note__tool-btn">
                <Users size={18} />
              </button>
              <button
                className="take-note__tool-btn"
                onClick={() => setShowPalette(!showPalette)}
              >
                <Palette size={18} />
              </button>
              <button className="take-note__tool-btn">
                <ImageIcon size={18} />
              </button>
              <button
                className="take-note__tool-btn"
                onClick={handleArchive}
              >
                <Archive size={18} />
              </button>
              <button className="take-note__tool-btn">
                <MoreVertical size={18} />
              </button>
              <button className="take-note__tool-btn">
                <Undo size={18} />
              </button>
              <button className="take-note__tool-btn">
                <Redo size={18} />
              </button>
            </div>
            <button
              className="take-note__close-btn"
              onClick={handleCloseClick}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Close'}
            </button>
          </div>
          {showPalette && (
            <div className="color-palette">
              {colorOptions.map((option) => (
                <div
                  key={option.color}
                  className="color-option"
                  style={{ backgroundColor: option.color }}
                  onClick={() => handleColorSelect(option.color)}
                  title={option.name}
                ></div>
              ))}
            </div>
          )}
          {error && <div className="take-note__error">{error}</div>}
        </div>
      )}
    </div>
  );
};

export default TakeNote;