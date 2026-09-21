import { initializeDatabase } from "./database.js";

const containerPets = document.querySelector("[data-list-pets]");
const statusPets = document.querySelector("[data-pets-status]");

if (!containerPets || !statusPets) {
  throw new Error("Pets elements not found");
}

await initializeDatabase();

const db = localStorage.getItem("adopet");

if (!db) {
  throw new Error("Banco de dados não encontrado.");
}

const { pets } = JSON.parse(db);

if (!Array.isArray(pets)) {
  throw new Error("Dados de pets inválidos.");
}

const listRender = pets
  .map((item) => {
    return `<li class="pets__item">
              <img class="pets__image" src="./assets/img/pets/${item.photo}" width="650" height="650" alt="${item.description}" loading="lazy">
              <div class="pets__data">
                <div>
                  <h2 class="pets__name">${item.name}</h2>
                  <ul class="pets__infos">
                    <li>${item.age}</li>
                    <li>${item.size}</li>
                    <li>${item.behavior}</li>
                  </ul>
                </div>
                <div>
                  <p class="pets__address">${item.address}</p>
                  <a class="pets__responsible" href="${item.contact}">Falar com responsável</a>
                </div>
              </div>
            </li>`;
  })
  .join("");

statusPets.innerHTML = `Carregando pets<span class='pets__dots'></span
        >`;

setTimeout(() => {
  if (pets.length !== 0) {
    containerPets.innerHTML = listRender;
    statusPets.textContent = "Pets carregados";
    statusPets.classList.add("sr-only");
  } else {
    statusPets.classList.add("pets__fallback");
    statusPets.textContent = "Nenhum pet encontrado.";
  }
}, 1000);
