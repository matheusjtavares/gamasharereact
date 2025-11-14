import { GameExperienceForm } from "./components/js/form";
import { ListGameExperiences } from "./components/js/list";
import { ListGames, ListToggler } from "./components/js/listgames";
import { GamesController } from "./components/gamescontroller";
import "./styles.css";
import "./components/css/form.css";
import "./components/css/list.css";
import "./components/css/header.css";
import "./components/css/listgames.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useSearchParams,
} from "react-router-dom";

import { useState } from "react";

export default function App() {
  const [gameExperiences, setGameExperiences] = useState([]);
  const [gameExperience, setGameExperience] = useState({
    id: undefined,
    gameTitle: "",
    rating: "",
    img_src: "",
  });

  function getGameExperience(id) {
    return gameExperiences.find((gameExperience) => gameExperience.id === id);
  }

  async function saveGameExperience({ id, gameTitle, rating, img_src }) {
    if (id && getGameExperience(id)) {
      updateGameExperience({ id, gameTitle, rating });
    } else {
      setGameExperiences([
        ...gameExperiences,
        {
          id: Date.now(),
          gameTitle,
          rating,
          img_src: await GetGameImageFromName({ gameTitle }).catch(() => ""),
        },
      ]);
    }
    setGameExperience({
      id: undefined,
      gameTitle: "",
      rating: "",
      img_src: undefined,
    });
  }

  function removeGameExperience(id) {
    const newGameExperiences = gameExperiences.filter(
      (gameExperience) => gameExperience.id !== id
    );
    setGameExperiences(newGameExperiences);
  }

  async function updateGameExperience({ id, gameTitle, rating }) {
    const newGameExperiences = [...gameExperiences];
    const index = newGameExperiences.findIndex(
      (gameExperience) => gameExperience.id === id
    );
    newGameExperiences[index].gameTitle = gameTitle;
    newGameExperiences[index].rating = rating;
    newGameExperiences[index].img_src = await GetGameImageFromName({
      gameTitle,
    }).catch(() => "");
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
  async function GetGameImageFromName(gameTitle) {
    console.log("GetGameImageFromName:", gameTitle);
    // Get ID
    const idResponse = await GamesController.GetGameId(gameTitle);
    console.log(idResponse);
    const idData = idResponse?.data;
    if (!idData || idData.count === 0) return null;
    const selected_id = idData.games[0].id;
    // Get image data
    const imgResponse = await GamesController.GetGameImage(selected_id);
    const imgData = imgResponse?.data;
    if (!imgData || !imgData.base_url || !imgData.images) return null;
    const base = imgData.base_url.small;
    const image = imgData.images[selected_id]?.filename;
    if (!base || !image) return null;
    return base + image;
  }

  function PageForm() {
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
          handlePullImg={GetGameImageFromName}
        />
      </div>
    );
  }

  function PageAPI() {
    return (
      <div className="App">
        <div className="form-header">
          <h1>GameShare</h1>
          <h2>Play Games, Share experiences.</h2>
        </div>
        <ListGames />
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageForm />} />
        <Route path="pageAPI" element={<PageAPI />} />
      </Routes>
    </BrowserRouter>
  );
}
