const cohortName = "2401-FTB-ET-WEB-AM";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

export const getAllPlayers = async () => {
  try {
    const response = await fetch(`${API_URL}/players`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getSinglePlayer = async (id) => {
  try {
    const response = await fetch(`${API_URL}/players/${id}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const deletePlayer = async (id) => {
  try {
    const response = await fetch(`${API_URL}/players/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete player");
    }
    await getAllPlayers();
  } catch (error) {
    console.error(error);
  }
};

export const createNewPlayer = async (name, breed) => {
  try {
    const response = await fetch(`${API_URL}/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, breed: breed }),
    });
    const json = await response.json();
    console.log("newplayeradded: ", json);
    if (json.error) {
      throw new Error("Failed to create player", json.error);
    }
  } catch (error) {
    console.error(error);
  }
};
