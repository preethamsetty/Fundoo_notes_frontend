// import React from 'react';
// import './TrashContainer.scss';

// const TrashContainer = ({ trashedNotes }) => {
//   return (
//     <div className="trash-container">
//       {trashedNotes && trashedNotes.length > 0 ? (
//         trashedNotes.map((note) => (
//           <div key={note.id} className="trash-note">
//             <h3>{note.title}</h3>
//             <p>{note.description}</p>
//           </div>
//         ))
//       ) : (
//         <p className="empty-message">No trashed notes available</p>
//       )}
//     </div>
//   );
// };

// export default TrashContainer;

// import React, { useState, useEffect } from 'react';
// import TrashNoteCard from '../TrashNoteCard/TrashNoteCard';
// import { fetchNotes } from '../../utils/Api';

// function TrashContainer() {
//   const [trashNotes, setTrashNotes] = useState([]);

//   const fetchTrashNotes = async () => {
//     try {
//       const notes = await fetchNotes();
//       const trashed = notes.filter((note) => note.isTrash);
//       setTrashNotes(trashed);
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchTrashNotes();
//   }, []);

//   return (
//     <div className="trash-container">
//       <h2>Trash</h2>
//       <div className="note-grid">
//         {trashNotes.map((note) => (
//           <TrashNoteCard key={note._id} note={note} onAction={fetchTrashNotes} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default TrashContainer;



// import React, { useState, useEffect } from "react";
// import NoteCard from "../notecard/NoteCard";
// import { fetchNotes } from "../../utils/Api";
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

//   if (isLoading) return <div>Loading trashed notes...</div>;
//   if (error) return <div>Error: {error}</div>;

//   const handleRestore = async (id) => {
//     try {
//       // Call API to toggle trash status
//       await toggleTrashNote(id);
//       setTrashedNotes((prevNotes) =>
//         prevNotes.filter((note) => note._id !== id)
//       );
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   const handleDeleteForever = async (id) => {
//     try {
//       // Call API to delete the note permanently
//       await deleteNoteForever(id);
//       setTrashedNotes((prevNotes) =>
//         prevNotes.filter((note) => note._id !== id)
//       );
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   return (
//     <div className="trash-container">
//       <h3>Trashed Notes</h3>
//       <div className="trash-container__notes">
//         {trashedNotes.map((note) => (
//           <NoteCard
//             key={note._id}
//             note={note}
//             isTrashView={true}
//             handleRestore={() => handleRestore(note._id)}
//             handleDeleteForever={() => handleDeleteForever(note._id)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TrashContainer;

import React, { useState, useEffect } from "react";
import NoteCard from "../notecard/NoteCard";
import { fetchNotes } from "../../utils/Api";
import "./TrashContainer.scss";

const TrashContainer = () => {
  const [trashedNotes, setTrashedNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (isLoading) return <div>Loading trashed notes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="trash-container">
      <h3>Trashed Notes</h3>
      <div className="trash-container__notes">
        {trashedNotes.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default TrashContainer;
