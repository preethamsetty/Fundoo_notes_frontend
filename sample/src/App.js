import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import BrowserRouter
import RoutingModule from './Routing/RoutingModule.js';
import SearchHook from './Components/Hooks/SearchHook.jsx';
import Label from './Components/Labels/Label.jsx';

function App() {
  return (
    <div className="App">
      <SearchHook>
      <RoutingModule />
      </SearchHook>
    </div>
  );
}

export default App;
