import React, { useState, useEffect } from 'react';
import TakeNote from '../TakeNote/TakeNote';
import NoteCard from '../notecard/NoteCard';
import { fetchNotes } from '../../utils/Api';
import './NoteContainer.scss';

const NoteContainer = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await fetchNotes();
        console.log('Fetched notes:', response);
        if (response && response.data && Array.isArray(response.data)) {
          setNotes(response.data);
        } else {
          setNotes([]);
          console.error('Unexpected data structure for notes:', response);
        }
      } catch (err) {
        console.error('Error fetching notes:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getNotes();
  }, []);

  const handleAddNote = (newNote) => {
    setNotes(prevNotes => [newNote, ...prevNotes]);
  };

  const handleDeleteNote = (id) => {
    setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
  };

  const handleArchiveNote = (id) => {
    console.log(`Archived note with ID: ${id}`);
    // Implement archiving logic here
  };

  if (isLoading) return <div className="note-container__loading">Loading notes...</div>;
  if (error) return <div className="note-container__error">Error: {error}</div>;

  return (
    <div className="note-container">
      <TakeNote onAddNote={handleAddNote} />
      <div className="note-container__notes">
        {notes.length === 0 ? (
          <div className="note-container__empty">No notes found. Create a new note!</div>
        ) : (
          notes.map(note => (
            <NoteCard
              key={note._id}
              note={note}
              onArchive={handleArchiveNote}
              onDelete={handleDeleteNote}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NoteContainer;

