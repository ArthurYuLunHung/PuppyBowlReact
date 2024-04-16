import { getAllPlayers } from "../API/index";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function AllPlayers() {
  console.log(useParams());
  const [players, setPlayers] = useState([]);
  const [singlePlayer, setSinglePlayer] = useState(null);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState("");

  useEffect(() => {
    async function newAllPlayers() {
      const APIresponse = await getAllPlayers();
      console.log(APIresponse.data.players);
      if (APIresponse.success) {
        setPlayers(APIresponse.data.players);
      } else {
        setError(APIresponse.error.message);
      }
    }
    newAllPlayers();
  }, []);

  const playersToDisplay = searchParams
    ? players.filter((player) =>
        player.name.toLowerCase().includes(searchParams)
      )
    : players;
  const navigate = useNavigate();
  return (
    <>
      <h1>All players</h1>
      <div>
        Search:{" "}
        <input
          type="text"
          placeholder="search"
          onChange={(e) => setSearchParams(e.target.value.toLocaleLowerCase())}
        />
      </div>
      <ol>
        {playersToDisplay.map((player) => {
          return (
            <li key={player.id}>
              <p>{player.name}</p>
              <button
                className="detailButton"
                style={{
                  cursor: "pointer",
                  backgroundColor: "blue",
                  color: "white",
                }}
                onClick={() =>
                  navigate(`/players/${player.id}`) && setSinglePlayer(player)
                }
              >
                {player.name}'s details
              </button>
            </li>
          );
        })}
      </ol>
    </>
  );
}
