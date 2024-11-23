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

import React, { useEffect, useState } from "react";
import TakeNote from '../TakeNote/TakeNote'; // Import the TakeNote component

const NoteContainer = ({ notes: propNotes }) => {
  // Initialize notes as an empty array if `propNotes` is undefined
  const [notes, setNotes] = useState(propNotes || []);

  // Fetch notes only if they are not passed as props
  useEffect(() => {
    if (!propNotes) {
      const fetchNotes = async () => {
        try {
          const response = await fetch("/api/notes"); // Adjust the API endpoint
          if (!response.ok) {
            throw new Error("Failed to fetch notes");
          }
          const data = await response.json();
          setNotes(data); // Assuming data is an array of notes
        } catch (error) {
          console.error("Error fetching notes:", error);
        }
      };

      fetchNotes();
    }
  }, [propNotes]);

  // Handler for adding a new note
  const handleAddNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  return (
    <div>
      {/* Render the TakeNote component */}
      <TakeNote onAddNote={handleAddNote} />

      {/* Render the notes */}
      {notes && notes.length > 0 ? (
        <div className="note-container">
          {notes.map((note, index) => (
            <div key={index} className="note">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No notes available</p>
      )}
    </div>
  );
};

export default NoteContainer;
