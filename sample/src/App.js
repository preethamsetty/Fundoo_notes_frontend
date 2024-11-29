import logo from './logo.svg';
import './App.css';

import NoteContainer from './Components/NoteContainer/NoteContainer.jsx';
import NoteCard from './Components/notecard/NoteCard.jsx';
import Header from './Components/Header/Header.jsx'
import TakeNote from './Components/TakeNote/TakeNote.jsx';
import DrawerComponent from './Components/Drawer/Drawer.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import BrowserRouter
import DashboardContainer from './Components/dashboard/DashboardContainer.jsx';
import RoutingModule from './Routing/RoutingModule.js';

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
      {/* <NoteCard/> */}
    </div>
  );
}

export default App;
