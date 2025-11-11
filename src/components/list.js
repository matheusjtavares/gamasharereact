import { useEffect, useState } from "react";

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
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
}

export function Item({ id, gameTitle, rating, handleDelete, handleEdit }) {
  function onDelete() {
    handleDelete(id);
  }

  function onEdit() {
    handleEdit(id);
  }

  return (
    <div className="item">
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
