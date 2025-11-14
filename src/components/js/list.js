import { useEffect, useState } from "react";
import { GamesController } from "../gamescontroller";
export function ListGameExperiences({
  gameExperiences = [],
  handleDelete,
  handleEdit,
}) {
  return (
    <div className="list">
      {gameExperiences?.map((gameExperience) => (
        <Item
          key={gameExperience.id}
          {...gameExperience}
          img_src={gameExperience.img_src}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
}

export function Item({
  id,
  gameTitle,
  rating,
  img_src,
  handleDelete,
  handleEdit,
}) {
  function onDelete() {
    handleDelete(id);
  }

  function onEdit() {
    handleEdit(id);
  }
  return (
    <div className="item">
      <img src={img_src} alt="" width="80" height="60"></img>
      <div className="item-title">
        {gameTitle} <span>({rating})</span>{" "}
      </div>
      <div className="item-actions">
        <button className="btn-icon btn-edit" onClick={onEdit}>
          E
        </button>
        <button className="btn-icon btn-remove" onClick={onDelete}>
          X
        </button>
      </div>
    </div>
  );
}
