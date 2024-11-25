import React, { useState, useEffect } from "react";
import NoteCard from "../notecard/NoteCard";
import { fetchNotes } from "../../utils/Api";
import "./ArchiveContainer.scss";

const ArchiveContainer = () => {
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getArchivedNotes = async () => {
      try {
        const response = await fetchNotes();
        const archivedNotes = response.data.filter((note) => note.isArchive);
        setArchivedNotes(archivedNotes);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getArchivedNotes();
  }, []);

  if (isLoading) return <div>Loading archived notes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="archive-container">
      <h3>Archived Notes</h3>
      <div className="archive-container__notes">
        {archivedNotes.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default ArchiveContainer;
