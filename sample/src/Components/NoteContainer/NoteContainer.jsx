import React, { useState, useEffect } from "react";
import TakeNote from "../TakeNote/TakeNote";
import NoteCard from "../notecard/NoteCard";
import { fetchNotes, archiveNote } from "../../utils/Api";
import "./NoteContainer.scss";

const NoteContainer = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await fetchNotes();
        const nonArchivedNotes = response.data.filter((note) => !note.isArchive);
        setNotes(nonArchivedNotes);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getNotes();
  }, []);

  const handleAddNote = (newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  const handleArchiveNote = async (id) => {
    try {
      await archiveNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Error archiving note:", err.message);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="note-container">
      <TakeNote onAddNote={handleAddNote} />
      <div className="note-container__notes">
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} onArchive={handleArchiveNote} />
        ))}
      </div>
    </div>
  );
};

export default NoteContainer;
