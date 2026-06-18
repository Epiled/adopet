import list from "./mocks/pets.js";

const containerPets = document.querySelector("[data-list-pets]");

const listRender = list
  .map((item) => {
    return `<li class="pets__item">
            <img class="pets__image" src="./assets/img/pets/${item.image}" width="650" height="650" alt="${item.description}">
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

containerPets.innerHTML = listRender;
