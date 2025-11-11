import { GameExperienceForm } from "./components/form";
import { ListGameExperiences } from "./components/list";
import "./styles.css";
import { useState } from "react";

export default function App() {
  const [gameExperiences, setGameExperiences] = useState([]);
  const [gameExperience, setGameExperience] = useState({
    id: undefined,
    gameTitle: "",
    rating: "",
  });

  function getGameExperience(id) {
    return gameExperiences.find((gameExperience) => gameExperience.id === id);
  }

  function saveGameExperience({ id, gameTitle, rating }) {
    if (id && getGameExperience(id)) {
      updateGameExperience({ id, gameTitle, rating });
    } else {
      setGameExperiences([
        ...gameExperiences,
        {
          id: Date.now(),
          gameTitle,
          rating,
        },
      ]);
    }
    setGameExperience({
      id: undefined,
      gameTitle: "",
      rating: "",
    });
  }

  function removeGameExperience(id) {
    const newGameExperiences = gameExperiences.filter(
      (gameExperience) => gameExperience.id !== id
    );
    setGameExperiences(newGameExperiences);
  }

  function updateGameExperience({ id, gameTitle, rating }) {
    const newGameExperiences = [...gameExperiences];
    const index = newGameExperiences.findIndex(
      (gameExperience) => gameExperience.id === id
    );
    newGameExperiences[index].gameTitle = gameTitle;
    newGameExperiences[index].rating = rating;
    setGameExperiences(newGameExperiences);
  }

  return (
    <div className="App">
      <h1>GameShare</h1>
      <h2>Play Games</h2>
      <h2>Share experiences.</h2>
      <GameExperienceForm
        handleSave={saveGameExperience}
        gameExperience={gameExperience}
      />
      <br></br>
      <ListGameExperiences
        gameExperiences={gameExperiences}
        handleDelete={removeGameExperience}
        handleEdit={console.log("edit")}
      />
    </div>
  );
}
