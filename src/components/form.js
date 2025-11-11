import { useEffect, useState } from "react";

export function GameExperienceForm({
  handleSave,
  gameExperience = {
    id: undefined,
    gameTitle: "",
    rating: "",
  },
}) {
  const [data, setData] = useState({ ...gameExperience });

  function handleSubmit(event) {
    event.preventDefault();
    if (data.gameTitle.length <= 5 || data.gameTitle.length >= 100) {
      console.error("Game Title must be between 5 to 100 chars");
      return;
    }

    if (!data.rating) {
      console.error("Rating must be defined");
      return;
    }
    try {
      handleSave({
        id: data.id,
        gameTitle: data.gameTitle,
        rating: data.rating,
      });
    } catch (error) {
      console.error(error);
      console.error("Falha ao salvar");
    }
  }
  function handleChange({ target }) {
    const { name, value } = target;
    setData({
      ...data,
      [name]: value,
    });
  }
  useEffect(() => {
    setData(gameExperience);
  }, [gameExperience]);
  return (
    <>
      <form onSubmit={handleSubmit} className="card-form">
        <input type="hidden" name="id" value={data.id || Date.now()} />
        <FormTextField
          id={"gameTitle"}
          name={"gameTitle"}
          maxLength={100}
          minLength={5}
          placeholderText={"Game Title"}
          value={data.gameTitle}
          onChange={handleChange}
        ></FormTextField>
        <FormNumberField
          id={"rating"}
          name={"rating"}
          maxValue={10}
          minValue={0}
          placeholderText={"Rating"}
          value={data.rating}
          onChange={handleChange}
        ></FormNumberField>
        <input className="btn" type="submit" value="Submit" />
      </form>
    </>
  );
}

function FormTextField({
  id,
  name,
  maxLength,
  minLength,
  placeholderText,
  value,
  onChange,
}) {
  return (
    <input
      id={id}
      name={name}
      type="text"
      placeholder={placeholderText}
      maxLength={maxLength}
      minLength={minLength}
      value={value}
      onChange={onChange}
    ></input>
  );
}

function FormNumberField({
  id,
  name,
  maxValue,
  minValue,
  placeholderText,
  value,
  onChange,
}) {
  return (
    <input
      id={id}
      name={name}
      type="number"
      placeholder={placeholderText}
      maxLength={maxValue}
      minLength={minValue}
      value={value}
      onChange={onChange}
    ></input>
  );
}
