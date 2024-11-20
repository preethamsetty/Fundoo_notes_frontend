import logo from './logo.svg';
import './App.css';
import RoutingModule from '../src/RoutingModule.js';
import NoteCard from '../src/Components/notecard/NoteCard.jsx';
import NoteContainer from './Components/TakeNote/TakeNote.jsx';
function App() {
  return (
    <div className="App">
      <RoutingModule />
      {/* <NoteContainer/> */}
    </div>
  );
}

export default App;
