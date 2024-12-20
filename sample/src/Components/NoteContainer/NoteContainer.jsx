import React, { useState, useEffect, useCallback, useContext } from "react";
import TakeNote from "../TakeNote/TakeNote";
import NoteCard from "../notecard/NoteCard";
import { fetchNotes, archiveNote, trashNote, createNote, updateNote } from "../../utils/Api";
import "./NoteContainer.scss";
import { SearchQueryContext } from "../Hooks/SearchHook";

const NotesContainer = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const searchQuery = useContext(SearchQueryContext);

  const fetchAllNotes = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await fetchNotes();
      console.log("Fetched Notes:", data);
      const activeNotes = data.filter((note) => !note.isArchive && !note.isTrash);
      setNotes(activeNotes);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching notes.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllNotes();
  }, [fetchAllNotes]);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddNote = (newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  };

  const handleArchiveNote = async (id) => {
    try {
      await archiveNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Error archiving note:", err.response?.data?.message || err.message);
    }
  };

  const handleTrashNote = async (id) => {
    try {
      await trashNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Error trashing note:", err.response?.data?.message || err.message);
    }
  };

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

  if (isLoading) return <div className="note-container__loading">Loading...</div>;
  if (error) return <div className="note-container__error">Error: {error}</div>;

  return (
    <div className="note-container">
      {!searchQuery && (
        <div className="note-container__take-note-spacing">
          <TakeNote onAddNote={handleAddNote} />
        </div>
      )}
      <div className="note-container__notes">
        {(searchQuery ? filteredNotes : notes).length ? (
          (searchQuery ? filteredNotes : notes).map((note) => (
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

export default NotesContainer;