export async function initializeDatabase() {
  const db = localStorage.getItem("adopet");

  if (db) {
    return;
  }

  const response = await fetch("./js/mocks/adopet.json");
  const data = await response.json();

  localStorage.setItem("adopet", JSON.stringify(data));
}
