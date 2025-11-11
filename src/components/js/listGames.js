import { useEffect, useState } from "react";

export function ListGames(){
    const [data, setData] = useState([]);
  
    async function GetList() {
      const controller = new AbortController();
      const sinal = controller.signal;
  
      const request = fetch(ROUTE, { sinal }).catch((err) => ({
        error: err,
        aborted: err.name === "AboutError",
      }));
  
      setTimeout(() => {
        controller.abort();
      }, 10);
  
      const response = await request;
  
      if (response.error) {
        setData([]);
        console.error(response);
      } else {
        const result = await response.json();
        setData(result);
      }
  
      // const request = await Axios.get(ROUTE, {
      //   signal: AbortSignal.timeout(10),
      // }).catch((err) => {
      //   console.error(err);
      //   return { error: err };
      // });
  
      // if (request.error) {
      //   console.log(request);
      // } else {
      //   setData(request.data);
      // }
    }
  
    useEffect(() => {
      GetList();
    }, []);
    return (
      <div>
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <div>
                <span>{item.completed ? "✅" : "🔴"}</span>
                <span>{item.title}</span>
              </div>
            </li>
          ))}
        </ul>
  
        <button onClick={UpdateList}>Atualizar</button>
      </div>
    );
  }