import logo from './logo.svg';
import './App.css';
import RoutingModule from '../src/RoutingModule.js';
import NoteContainer from './Components/NoteContainer/NoteContainer.jsx';
import NoteCard from './Components/notecard/NoteCard.jsx';
import Header from './Components/Header/Header.jsx'
import TakeNote from './Components/TakeNote/TakeNote.jsx';
import DrawerComponent from './Components/Drawer/Drawer.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import BrowserRouter
import DashboardContainer from './Components/dashboard/DashboardContainer.jsx';
import PracticeDash from './Components/PracticeDash/PracticeDash.jsx';
function App() {
  return (
    <div className="App">
      <RoutingModule />
      {/* <NoteContainer/> */}
      {/* <NoteContainer/>
      <NoteCard/> */}
      {/* <Header/> */}
      {/* <TakeNote/> */}
      {/* <DrawerComponent/> */}
      {/* <DashboardContainer/> */}
      {/* <PracticeDash/> */}
      {/* <NoteCard/> */}
    </div>
  );
}

export default App;
