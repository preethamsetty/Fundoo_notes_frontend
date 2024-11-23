import React, { useState, useRef, useEffect } from 'react';
import { Check, Pencil, ImageIcon, Bell, Users, Palette, MoreVertical, Undo, Redo, Archive } from 'lucide-react';
import './TakeNote.scss';

const TakeNote = ({ onAddNote }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState({
    title: '',
    content: ''
  });
  
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
    setNote(prevNote => ({
      ...prevNote,
      [name]: value
    }));
  };

  const handleClose = () => {
    if (note.title.trim() !== '' || note.content.trim() !== '') {
      onAddNote(note);
    }
    setIsExpanded(false);
    setNote({ title: '', content: '' });
  };

  const handleCloseClick = (e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    handleClose();
  };

  return (
    <div className="take-note" ref={noteRef}>
      {!isExpanded ? (
        <div className="take-note__collapsed" onClick={() => setIsExpanded(true)}>
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
            name="content"
            value={note.content}
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
              <button className="take-note__tool-btn">
                <Palette size={18} />
              </button>
              <button className="take-note__tool-btn">
                <ImageIcon size={18} />
              </button>
              <button className="take-note__tool-btn">
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
            <button className="take-note__close-btn" onClick={handleCloseClick}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TakeNote;

