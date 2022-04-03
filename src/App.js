import "./App.css";
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
