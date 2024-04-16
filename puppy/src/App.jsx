import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import AllPlayers from "./components/Allplayers";
import NavBar from "./components/NavBar";
import NewPlayerForm from "./components/Newplayerform";
import SinglePlayer from "./components/Singleplayer";

function App() {
  const [playerID, setPlayerID] = useState(null);

  return (
    <>
      <div id="nav"></div>
      <Link to="/" style={{ color: "#068f6f" }}>
        The Players |{" "}
      </Link>
      <Link to="/new-player" style={{ color: "#066f8f" }}>
        New Player |{" "}
      </Link>
      <Link to="/players/:id" style={{ color: "#8a8f06" }}>
        {" "}
        Single Player Form
      </Link>

      <div id="mainContainer">
        <Routes>
          <Route
            path="/"
            element={
              <AllPlayers playerId={playerID} setPlayerId={setPlayerID} />
            }
          />
          <Route path="/new-player" element={<NewPlayerForm />} />
          <Route
            path="/players/:id"
            element={
              <SinglePlayer playerId={playerID} setPlayerId={setPlayerID} />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
