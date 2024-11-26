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

// import React, { useState, useEffect } from "react";
// import NoteCard from "../notecard/NoteCard";
// import { fetchNotes, restoreNote } from "../../utils/Api"; // Assume a restoreNote API exists
// import "./TrashContainer.scss";

// const TrashContainer = () => {
//   const [trashedNotes, setTrashedNotes] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getTrashedNotes = async () => {
//       try {
//         const response = await fetchNotes(); // Fetch notes
//         const trashedNotes = response.data.filter((note) => note.isTrash); // Filter trashed notes
//         setTrashedNotes(trashedNotes);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     getTrashedNotes();
//   }, []);

//   // Restore a trashed note by sending it back to the notes container
//   const handleRestore = async (id) => {
//     try {
//       await restoreNote(id); // API call to restore the note (remove from trash)
//       setTrashedNotes((prevNotes) => prevNotes.filter((note) => note._id !== id)); // Update state
//     } catch (err) {
//       console.error("Error restoring note:", err.message);
//     }
//   };

//   // Delete a note permanently
//   const handleDelete = async (id) => {
//     try {
//       await restoreNote(id, true); // Assuming restoreNote can accept a second param to delete permanently
//       setTrashedNotes((prevNotes) => prevNotes.filter((note) => note._id !== id)); // Update state
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
//             onRestore={handleRestore} // Pass restore handler
//             onTrash={handleDelete} // Pass delete handler
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TrashContainer;
