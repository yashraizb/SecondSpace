// import { useState } from 'react';
import "./App.css";
// import FileTable from './Components/FileTable';
import Landing from "./Components/Landing";
import Navbar from "./Components/Navbar";
// Light gallery
function App() {
  return (
    <>
      <div id="pageHolder">
        <Navbar title="Second Space" homeLink="Home" />
        <Landing />
      </div>
    </>
  );
}

export default App;
