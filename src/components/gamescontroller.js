const base = "https://jsonplaceholder.typicode.com/albums";
const theGamesDbUrl = "https://api.thegamesdb.net/";
const theGamesDbkey =
  "b5109dffda95e3ae2aba6b62a35f2e6cfbc968c62faf5bc52e90863df870b431";
export class GamesController {
  static async GetGameId({ gameTitle }) {
    console.log("GetGameId received:", gameTitle);
    const router = `/v1/Games/ByGameName?apikey=${theGamesDbkey}&name=${encodeURIComponent(
      gameTitle
    )}`;
    console.log(theGamesDbUrl + router);
    const request = await fetch(theGamesDbUrl + router);
    const result = await request.json();
    console.log(result);
    return result;
  }

  static async GetGameImage({ game_id }) {
    console.log("GetGameImage received:", game_id);
    const router = `/v1/Games/Images?apikey=${theGamesDbkey}&games_id=${game_id}`;
    console.log(theGamesDbUrl + router);
    const request = await fetch(theGamesDbUrl + router);
    const result = await request.json();
    console.log(result);
    return result;
  }
}
