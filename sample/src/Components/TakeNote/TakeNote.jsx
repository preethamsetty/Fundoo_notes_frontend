import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, ImageIcon, MoreVertical, Palette, Pencil, Redo, Undo, Users } from 'lucide-react';
import './TakeNote.scss';

export default function TakeNote() {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="take-note" ref={cardRef}>
      {!isExpanded ? (
        <div className="take-note__collapsed" onClick={() => setIsExpanded(true)}>
          <div className="take-note__placeholder">Take a note...</div>
          <div className="take-note__actions">
            <button className="take-note__action-btn">
              <Check className="take-note__icon" />
            </button>
            <button className="take-note__action-btn">
              <Pencil className="take-note__icon" />
            </button>
            <button className="take-note__action-btn">
              <ImageIcon className="take-note__icon" />
            </button>
          </div>
        </div>
      ) : (
        <div className="take-note__expanded">
          <div className="take-note__header">
            <input 
              type="text" 
              placeholder="Title" 
              className="take-note__title" 
            />
            <button className="take-note__action-btn">
              <Bell className="take-note__icon" />
            </button>
          </div>
          <textarea 
            placeholder="Description" 
            className="take-note__content" 
          />
          <div className="take-note__footer">
            <div className="take-note__tools">
              <button className="take-note__tool-btn">
                <Bell className="take-note__icon" />
              </button>
              <button className="take-note__tool-btn">
                <Users className="take-note__icon" />
              </button>
              <button className="take-note__tool-btn">
                <Palette className="take-note__icon" />
              </button>
              <button className="take-note__tool-btn">
                <ImageIcon className="take-note__icon" />
              </button>
              <button className="take-note__tool-btn">
                <Check className="take-note__icon" />
              </button>
              <button className="take-note__tool-btn">
                <MoreVertical className="take-note__icon" />
              </button>
              <button className="take-note__tool-btn">
                <Undo className="take-note__icon" />
              </button>
              <button className="take-note__tool-btn">
                <Redo className="take-note__icon" />
              </button>
            </div>
            <button 
              className="take-note__close-btn"
              onClick={() => setIsExpanded(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
