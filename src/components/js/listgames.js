import { useEffect, useState } from "react";
import { Games } from "../controller";

export function ListGames() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);

  function handleClick() {
    setVisible((prev) => !prev);
  }

  async function GetList() {
    try {
      const result = await Games.GetAll();
      setData(result);
    } catch (err) {
      console.error(err);
      setError("Failed to load games.");
    } finally {
    }
  }

  useEffect(() => {
    GetList();
  }, []);

  return (
    <>
      <button className="btn" onClick={handleClick}>
        {visible ? "Hide List" : "Show List"}
      </button>
      {visible && (
        <div className="games-list">
          <ul>
            {data.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
