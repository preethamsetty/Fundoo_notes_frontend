// import React, { useState, useEffect } from "react";
// import NoteCard from "../notecard/NoteCard";
// import { fetchNotes, trashNote, deleteNotePermanently } from "../../utils/Api";
// import "./TrashContainer.scss";

// const TrashContainer = () => {
//   const [trashedNotes, setTrashedNotes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getTrashedNotes = async () => {
//       try {
//         const response = await fetchNotes();
//         const trashedNotes = response.data.filter((note) => note.isTrash);
//         setTrashedNotes(trashedNotes);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     getTrashedNotes();
//   }, []);

//   const handleRestoreNote = async (id) => {
//     try {
//       await trashNote(id);
//       setTrashedNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
//     } catch (err) {
//       console.error("Error restoring note:", err.message);
//     }
//   };

//   const handleDeleteForever = async (id) => {
//     try {
//       await deleteNotePermanently(id);
//       setTrashedNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
//     } catch (err) {
//       console.error("Error deleting note permanently:", err.message);
//     }
//   };

//   if (isLoading) return <div>Loading trashed notes...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="trash-container">
//       <h3>Trashed Notes</h3>
//       <div className="trash-container__notes">
//         {trashedNotes.map((note) => (
//           <NoteCard
//             key={note._id}
//             note={note}
//             isTrash={true}
//             onRestore={handleRestoreNote}
//             onDeleteForever={handleDeleteForever}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TrashContainer;

import React, { useState, useEffect, useContext } from "react";
import NoteCard from "../notecard/NoteCard";
import { fetchNotes, trashNote, deleteNotePermanently } from "../../utils/Api";
import "./TrashContainer.scss";
import { SearchQueryContext } from "../Hooks/SearchHook"; // Importing the search query context

const TrashContainer = () => {
  const [trashedNotes, setTrashedNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchQuery = useContext(SearchQueryContext); // Accessing the search query

  useEffect(() => {
    const getTrashedNotes = async () => {
      try {
        const response = await fetchNotes();
        const trashedNotes = response.data.filter((note) => note.isTrash);
        setTrashedNotes(trashedNotes);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getTrashedNotes();
  }, []);

  const handleRestoreNote = async (id) => {
    try {
      await trashNote(id);
      setTrashedNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Error restoring note:", err.message);
    }
  };

  const handleDeleteForever = async (id) => {
    try {
      await deleteNotePermanently(id);
      setTrashedNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Error deleting note permanently:", err.message);
    }
  };

  // Filter notes based on the search query
  const filteredNotes = trashedNotes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <div>Loading trashed notes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="trash-container">
      <h3>Trashed Notes</h3>
      <div className="trash-container__notes">
        {(searchQuery ? filteredNotes : trashedNotes).length > 0 ? (
          (searchQuery ? filteredNotes : trashedNotes).map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              isTrash={true}
              onRestore={handleRestoreNote}
              onDeleteForever={handleDeleteForever}
            />
          ))
        ) : (
          <div className="no-notes">No trashed notes found.</div>
        )}
      </div>
    </div>
  );
};

export default TrashContainer;
