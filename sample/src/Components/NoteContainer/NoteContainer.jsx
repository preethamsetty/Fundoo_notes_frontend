import React, { useState, useEffect, useCallback } from "react";
import TakeNote from "../TakeNote/TakeNote";
import NoteCard from "../notecard/NoteCard";
import { fetchNotes, archiveNote, trashNote, createNote, updateNote } from "../../utils/Api";
import "./NoteContainer.scss";

const NoteContainer = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all notes
  const fetchAllNotes = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await fetchNotes();
      console.log("Fetched Notes:", data);
      const activeNotes = data.filter((note) => !note.isArchive && !note.isTrash);
      setNotes(activeNotes);
    } catch (err) {
      setError(err.response?.data?.message );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllNotes();
  }, [fetchAllNotes]);

  // Add a new note
  const handleAddNote = (newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  // Archive a note
  const handleArchiveNote = async (id) => {
    try {
      await archiveNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Error archiving note:", err.response?.data?.message || err.message);
    }
  };

  // Trash a note
  const handleTrashNote = async (id) => {
    try {
      await trashNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Error trashing note:", err.response?.data?.message || err.message);
    }
  };

  // Update a note
  const handleNoteUpdate = async (updatedNote) => {
    try {
      console.log("Updating note:", updatedNote);
      await updateNote(updatedNote._id, updatedNote);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === updatedNote._id ? { ...note, ...updatedNote } : note
        )
      );
    } catch (err) {
      console.error("Error updating note:", err.response?.data?.message || err.message);
    }
  };

  // Render loading or error state
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="note-container">
      <div className="note-container__take-note-spacing">  {/* Added spacing wrapper */}
        <TakeNote onAddNote={handleAddNote} />
      </div>
      <div className="note-container__notes">
        {notes.length ? (
          notes.map((note) => (
            <NoteCard
              key={note._id || note.id}
              note={note}
              onArchive={handleArchiveNote}
              onTrash={handleTrashNote}
              onUpdate={handleNoteUpdate}
            />
          ))
        ) : (
          <div className="no-notes">No notes available</div>
        )}
      </div>
    </div>
  );
};

export default NoteContainer;
