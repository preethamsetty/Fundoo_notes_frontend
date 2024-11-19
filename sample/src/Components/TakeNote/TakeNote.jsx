import React, { useState, useRef, useEffect } from 'react';
import './TakeNote.scss'; // Styling file
import { Button, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import CheckboxIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const NoteContainer = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [noteText, setNoteText] = useState('');
  const containerRef = useRef(null); // Reference to the container

  // Detect clicks outside the component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsEditing(false); // Close editing mode
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNoteClick = () => {
    setIsEditing(true); // Open editing mode
  };

  const handleInputChange = (e) => {
    setNoteText(e.target.value); // Update note text
  };

  const handleSaveNote = () => {
    setIsEditing(false); // Save the note and close editing mode
    // Here you can add logic to save the note
    console.log('Saved note:', noteText);
  };

  return (
    <div className="NoteContainer" ref={containerRef}>
      {!isEditing ? (
        <div className="note-placeholder" onClick={handleNoteClick}>
          <span>Take a note...</span>
          <div className="note-icons">
            <CheckboxIcon />
            <EditIcon />
            <ImageIcon />
          </div>
        </div>
      ) : (
        <div className="note-editing">
          <TextField
            multiline
            fullWidth
            rows={4}
            value={noteText}
            onChange={handleInputChange}
            placeholder="Write your note..."
            variant="outlined"
          />
          <div className="note-save">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveNote}
            >
              <CheckIcon /> Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteContainer;
