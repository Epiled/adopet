import list from "./mocks/pets.js";

const containerPets = document.querySelector("[data-list-pets]");
const statusPets = document.querySelector("[data-pets-status]");

if (!containerPets || !statusPets) {
  throw new Error("Pets elements not found");
}

const listRender = list
  .map((item) => {
    return `<li class="pets__item">
              <img class="pets__image" src="./assets/img/pets/${item.image}" width="650" height="650" alt="${item.description}" loading="lazy">
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
  if (list.length !== 0) {
    containerPets.innerHTML = listRender;
    statusPets.textContent = "Pets carregados";
    statusPets.classList.add("sr-only");
  } else {
    statusPets.classList.add("pets__fallback");
    statusPets.textContent = "Nenhum pet encontrado.";
  }
}, 1000);
