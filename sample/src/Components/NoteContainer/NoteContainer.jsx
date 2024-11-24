// // import React, { useState } from 'react';
// // import TakeNote from '../TakeNote/TakeNote';
// // import NoteCard from '../TakeNote/TakeNote';
// // import './NoteContainer.scss';

// // const NoteContainer = () => {
// //   const [notes, setNotes] = useState([]);

// //   const addNote = (newNote) => {
// //     setNotes([newNote, ...notes]);
// //   };

// //   return (
// //     <div className="note-container">
// //       <div className="note-container__take-note">
// //         <TakeNote onAddNote={addNote} />
// //       </div>
// //       <div className="note-container__notes">
// //         {notes.map((note, index) => (
// //           <NoteCard key={index} title={note.title} content={note.content} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default NoteContainer;


// import React, { useState } from 'react';
// import TakeNote from '../TakeNote/TakeNote';
// import NoteCard from '../TakeNote/TakeNote';
// import './NoteContainer.scss';


// const NoteContainer = () => {
//   const [notes, setNotes] = useState([]);

//   const addNote = (newNote) => {
//     setNotes(prevNotes => [{ ...newNote, id: Date.now() }, ...prevNotes]);
//   };

//   return (
//     <div className="note-container">
//       <div className="note-container__take-note">
//         <TakeNote onAddNote={addNote} />
//       </div>
//       <div className="note-container__notes">
//         {notes.map((note) => (
//           <NoteCard 
//             key={note.id} 
//             title={note.title} 
//             content={note.content} 
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NoteContainer;

// import React, { useEffect, useState } from "react";
// import TakeNote from '../TakeNote/TakeNote'; // Import the TakeNote component

// const NoteContainer = ({ notes: propNotes }) => {
//   // Initialize notes as an empty array if `propNotes` is undefined
//   const [notes, setNotes] = useState(propNotes || []);

//   // Fetch notes only if they are not passed as props
//   useEffect(() => {
//     if (!propNotes) {
//       const fetchNotes = async () => {
//         try {
//           const response = await fetch("/api/notes"); // Adjust the API endpoint
//           if (!response.ok) {
//             throw new Error("Failed to fetch notes");
//           }
//           const data = await response.json();
//           setNotes(data); // Assuming data is an array of notes
//         } catch (error) {
//           console.error("Error fetching notes:", error);
//         }
//       };

//       fetchNotes();
//     }
//   }, [propNotes]);

//   // Handler for adding a new note
//   const handleAddNote = (newNote) => {
//     setNotes((prevNotes) => [...prevNotes, newNote]);
//   };

//   return (
//     <div>
//       {/* Render the TakeNote component */}
//       <TakeNote onAddNote={handleAddNote} />

//       {/* Render the notes */}
//       {notes && notes.length > 0 ? (
//         <div className="note-container">
//           {notes.map((note, index) => (
//             <div key={index} className="note">
//               <h3>{note.title}</h3>
//               <p>{note.content}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No notes available</p>
//       )}
//     </div>
//   );
// };

// export default NoteContainer;

// import React, { useState } from 'react';
// import TakeNote from '../TakeNote/TakeNote';
// import NoteCard from '../notecard/NoteCard';
// import './NoteContainer.scss';

// const NoteContainer = () => {
//   const [notes, setNotes] = useState([]);

//   // Function to handle adding a note
//   const handleAddNote = (newNote) => {
//     const noteWithId = { ...newNote, id: Date.now() }; // Assign a unique ID
//     setNotes([...notes, noteWithId]);
//   };

//   // Function to handle deleting a note
//   const handleDeleteNote = (id) => {
//     setNotes(notes.filter(note => note.id !== id));
//   };

//   // Function to handle archiving a note
//   const handleArchiveNote = (id) => {
//     console.log(`Archived note with ID: ${id}`);
//     // Implement archiving logic here
//   };

//   return (
//     <div className="note-container">
//       <TakeNote onAddNote={handleAddNote} />
//       <div className="note-container__notes">
//         {notes.map(note => (
//           <NoteCard
//             key={note.id}
//             note={note}
//             onArchive={handleArchiveNote}
//             onDelete={handleDeleteNote}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NoteContainer;

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
    const noteWithId = { ...newNote, id: Date.now() };
    setNotes(prevNotes => [...prevNotes, noteWithId]);
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








