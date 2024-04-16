import { useState, useEffect } from "react";
import { getSinglePlayer } from "../API";
import { useParams } from "react-router-dom";
import { deletePlayer } from "../API";

export default function SinglePlayer() {
  const { id } = useParams();

  const [error, setError] = useState(null);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    async function newSinglePlayer() {
      try {
        const APIresponse = await getSinglePlayer(id);
        console.log(APIresponse.data.player);
        if (APIresponse.success) {
          setPlayer(APIresponse.data.player);
        } else {
          setError(APIresponse.error.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
    newSinglePlayer();
  }, [id]);

  return (
    <>
      <div className="singleton">
        {player && (
          <div>
            <h3 style={{ textDecoration: "underline" }}>
              {player.name}'s details
            </h3>
            <p>
              Government Name: <br></br>
              {player.name}
            </p>
            <hr style={{ width: "60%", borderColor: "#e79a2ec4" }} />
            <p>
              Breed: <br></br>
              {player.breed}
            </p>
            <img src={player.imageUrl} alt={player.name} />
          </div>
        )}

        <button
          onClick={() => {
            window.history.back();
            setPlayer(null);
          }}
          style={{
            backgroundColor: "darkgray",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            marginRight: "20px",
          }}
        >
          Back
        </button>
        <button
          onClick={() => {
            window.history.back();
            deletePlayer(player.id);
          }}
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
}
