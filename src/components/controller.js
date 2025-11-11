const base = "https://jsonplaceholder.typicode.com/albums";
export class Games {
  static async GetAll() {
    const request = await fetch(base);
    const result = await request.json();
    return result;
  }
  static async Insert({ userId, id, title }) {
    const request = await fetch(base, {
      method: "POST",
      body: JSON.stringify({
        userId,
        id,
        title,
      }),
    });
    const result = await request.json();
    return result;
  }
  static async Update({ userId, id, title }) {
    const request = await fetch(base + "/" + id, {
      method: "PUT",
      body: JSON.stringify({
        userId,
        title,
      }),
    });
    const result = await request.json();
    return result;
  }
  static async Delete({ id }) {
    const request = await fetch(base + "/" + id, {
      method: "DELETE",
      body: JSON.stringify({
        id,
      }),
    });
    const result = await request.json();
    return result;
  }
}
