import lista from "./mocks/pets.js";

const conteinerPets = document.querySelector("[data-lista-pets]");

const listaCompleta = lista
  .map((item) => {
    return `<li class="pets__item">
            <img class="pets__image" src="./assets/img/pets/${item.imagem}" width="650" height="650" alt="${item.descricao}">
            <div class="pets__data">
              <div>
                <h2 class="pets__name">${item.nome}</h2>
                <ul class="pets__infos">
                  <li>${item.idade}</li>
                  <li>${item.porte}</li>
                  <li>${item.comportamento}</li>
                </ul>
              </div>
              <div>
                <p class="pets__address">${item.endereco}</p>
                <a class="pets__responsible" href="${item.contato}">Falar com responsável</a>
              </div>
            </div>
          </li>`;
  })
  .join("");

conteinerPets.innerHTML = listaCompleta;
