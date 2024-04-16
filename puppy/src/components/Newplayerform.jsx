import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewPlayer } from "../API";

export default function NewPlayerForm() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPlayer = { name, breed };
      const APIresponse = await createNewPlayer(name, breed);
      console.log("APIresponse", APIresponse);
      if (APIresponse.success) {
        console.log("Player created");
      } else {
        setError(APIresponse.error);
      }
    } catch (error) {
      setError(error.message);
    }
    navigate("/");
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          placeholder="Name of Dog"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Breed:
        <input
          type="text"
          placeholder="Breed of Dog"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
      </label>
      <br />
      <button
        type="submit"
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "5px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "15px",
          fontWeight: "bold",
        }}
      >
        Add Player
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
