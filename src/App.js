import { GameExperienceForm } from "./components/js/form";
import { ListGameExperiences } from "./components/js/list";
import { ListGames, ListToggler } from "./components/js/listgames";
import "./styles.css";
import "./components/css/form.css";
import "./components/css/list.css";
import "./components/css/header.css";
import "./components/css/listgames.css";

import { useState } from "react";
const ROUTE = "https://jsonplaceholder.typicode.com/albums";

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
  function editHandler(id) {
    const gameExperience = getGameExperience(id);

    if (gameExperience) {
      setGameExperience(gameExperience);
    } else {
      console.error("Experience not found");
    }
  }
  return (
    <div className="App">
      <div className="form-header">
        <h1>GameShare</h1>
        <h2>Play Games, Share experiences.</h2>
      </div>
      <GameExperienceForm
        handleSave={saveGameExperience}
        gameExperience={gameExperience}
      />
      <br></br>
      <ListGameExperiences
        gameExperiences={gameExperiences}
        handleDelete={removeGameExperience}
        handleEdit={editHandler}
      />
      <ListGames />
    </div>
  );
}
