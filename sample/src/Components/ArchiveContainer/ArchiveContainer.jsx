// import React, { useState, useEffect } from "react";
// import NoteCard from "../notecard/NoteCard";
// import { fetchNotes } from "../../utils/Api";
// import "./ArchiveContainer.scss";

// const ArchiveContainer = () => {
//   const [archivedNotes, setArchivedNotes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getArchivedNotes = async () => {
//       try {
//         const response = await fetchNotes();
//         const archivedNotes = response.data.filter((note) => note.isArchive);
//         setArchivedNotes(archivedNotes);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     getArchivedNotes();
//   }, []);

//   if (isLoading) return <div>Loading archived notes...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="archive-container">
//       <h3>Archived Notes</h3>
//       <div className="archive-container__notes">
//         {archivedNotes.map((note) => (
//           <NoteCard key={note._id} note={note} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ArchiveContainer;

import React, { useState, useEffect } from "react";
import NoteCard from "../notecard/NoteCard";
import { fetchNotes, archiveNote } from "../../utils/Api";
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

  const handleUnarchiveNote = async (id) => {
    try {
      await archiveNote(id); // Toggle the archive status
      // Remove the unarchived note from the archived notes state
      setArchivedNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Error unarchiving note:", err.message);
    }
  };

  if (isLoading) return <div>Loading archived notes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="archive-container">
      <h3>Archived Notes</h3>
      <div className="archive-container__notes">
        {archivedNotes.map((note) => (
          <NoteCard key={note._id} note={note} onArchive={handleUnarchiveNote} />
        ))}
      </div>
    </div>
  );
};

export default ArchiveContainer;
