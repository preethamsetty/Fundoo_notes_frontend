import React, { useState, useEffect } from "react";
import NoteCard from "../notecard/NoteCard";
import { fetchNotes, archiveNote, trashNote, updateNote } from "../../utils/Api";
import "./ArchiveContainer.scss";

const ArchiveContainer = () => {
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getArchivedNotes = async () => {
      try {
        const response = await fetchNotes();
        const archivedNotes = response.data.filter(
          (note) => note.isArchive && !note.isTrash
        );
        setArchivedNotes(archivedNotes);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getArchivedNotes();
  }, []);

  const handleUnarchiveNote = async (id) => {
    try {
      await archiveNote(id); // Toggle the archive status
      setArchivedNotes((prevNotes) =>
        prevNotes.filter((note) => note._id !== id)
      );
    } catch (err) {
      console.error("Error unarchiving note:", err.message);
    }
  };

  const handleTrashNote = async (id) => {
    try {
      await trashNote(id); // Toggle the trash status
      setArchivedNotes((prevNotes) =>
        prevNotes.filter((note) => note._id !== id)
      );
    } catch (err) {
      console.error("Error trashing note:", err.message);
    }
  };

  const handleNoteUpdate = async (updatedNote) => {
    try {
      const response = await updateNote(updatedNote._id, updatedNote);
      const updatedNoteFromBackend = response.data;

      setArchivedNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === updatedNoteFromBackend._id
            ? updatedNoteFromBackend
            : note
        ).filter((note) => note.isArchive && !note.isTrash)
      );
    } catch (err) {
      console.error("Error updating note:", err.message);
    }
  };

  if (isLoading) return <div>Loading archived notes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="archive-container">
      <h3>Archived Notes</h3>
      <div className="archive-container__notes">
        {archivedNotes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            onArchive={handleUnarchiveNote}
            onTrash={handleTrashNote}
            onUpdate={handleNoteUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default ArchiveContainer;


