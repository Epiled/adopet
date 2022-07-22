import lista from './mocks/pets.js';

const conteinerPets = document.querySelector('[data-lista-pets]');

const listaCompleta = lista.map((item) => {
  return `<li class="pets_item">
            <img class="pets_imagem" src="./assets/img/pets/${item.imagem}" width="650" height="650" alt="${item.descricao}">
            <div class="pets_dados">
              <div>
                <h2 class="pets_nome">${item.nome}</h2>
                <ul class="pets_infos">
                  <li>${item.idade}</li>
                  <li>${item.porte}</li>
                  <li>${item.comportamento}</li>
                </ul>
              </div>
              <div>
                <p class="pets_endereco">${item.endereco}</p>
                <a class="pets_responsavel" href="${item.contato}">Falar com responsável</a>
              </div>
            </div>
          </li>`;
}).join('');

conteinerPets.innerHTML = listaCompleta;