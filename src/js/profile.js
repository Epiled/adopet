import { requireAuth } from "./auth.js";
import { checkInput } from "./validation/validation.js";
import { loadProfileImage, updateProfileImage } from "./profile-image.js";
import { initializeDatabase } from "./database.js";

requireAuth();

await initializeDatabase();

loadProfileImage();

const form = document.querySelector("[data-profile-form]");
const fields = document.querySelectorAll("[data-field]");
const button = document.querySelector("[data-button-form]");
const imageProfile = document.querySelector("[data-image-form]");
const timeout = 1000;

const dataSession = localStorage.getItem("adopet_session");

if (!dataSession) {
  throw new Error("Sessão não encontrada.");
}

const userData = JSON.parse(dataSession);

if (userData.photo) {
  imageProfile.src = userData.photo;
  imageProfile.dataset.imageForm = "true";
}

fields.forEach((field) => {
  if (field.name !== "photo" && userData[field.name] != null) {
    field.value = userData[field.name];
  }

  field.addEventListener("blur", () => {
    checkInput(field, form);
  });
  field.addEventListener("input", () => {
    field.setCustomValidity("");

    if (field.name === "photo") {
      const file = field.files[0];

      if (file) {
        imageProfile.src = URL.createObjectURL(file);
        imageProfile.dataset.imageForm = "true";
      }
    }
  });
  field.addEventListener("invalid", (e) => {
    e.preventDefault();
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fields.forEach((field) => {
    checkInput(field, form);
  });

  if (!form.checkValidity()) {
    return;
  }

  const dto = {
    photo: e.target.photo.files[0],
    name: e.target.name.value,
    phone: e.target.phone.value,
    city: e.target.city.value,
    about: e.target.about.value,
  };

  profile(dto);
});

function convertImageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(new Error("Não foi possível carregar a imagem."));
    };

    reader.readAsDataURL(file);
  });
}

async function profile(dto) {
  const feedbackContainer = form.querySelector("[data-feedback='profile']");
  feedbackContainer.dataset.state = "hidden";
  feedbackContainer.textContent = "";

  button.dataset.state = "loading";
  button.disabled = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, timeout));

    const db = localStorage.getItem("adopet");

    if (!db) {
      throw new Error("Banco de dados não encontrado.");
    }

    const { users } = JSON.parse(db);

    if (!Array.isArray(users)) {
      throw new Error("Dados de usuários inválidos.");
    }

    const { id } = JSON.parse(dataSession);

    if (!id) {
      throw new Error("Usuário não encontrado na sessão.");
    }

    const match = users.find((item) => {
      return item.id === id;
    });

    if (!match) {
      throw new Error("Usuário não encontrado.");
    }

    const { photo: file, ...profileData } = dto;

    let photo = match.photo;

    if (file) {
      photo = await convertImageToBase64(file);
    }

    const timestamp = new Date().toISOString();

    const userUpdate = {
      ...match,
      ...profileData,
      photo,
      updated_at: timestamp,
    };

    const data = JSON.parse(db);

    data.users = data.users.map((user) => {
      return user.id === id ? userUpdate : user;
    });

    localStorage.setItem("adopet", JSON.stringify(data));

    const sessionUpdate = {
      ...userUpdate,
    };

    delete sessionUpdate.password;

    localStorage.setItem("adopet_session", JSON.stringify(sessionUpdate));

    updateProfileImage(photo);

    button.dataset.state = "success";
    button.textContent = "Salvo!";

    feedbackContainer.dataset.state = "success";
    feedbackContainer.textContent = "Perfil atualizado com sucesso!";

    setTimeout(() => {
      feedbackContainer.dataset.state = "hidden";
      feedbackContainer.textContent = "";

      button.disabled = false;
      button.dataset.state = "default";
      button.textContent = "Salvar";
    }, timeout * 3);
  } catch (error) {
    console.error(error);

    button.dataset.state = "default";
    button.disabled = false;

    feedbackContainer.dataset.state = "visible";
    feedbackContainer.textContent =
      "Não foi possível atualizar seu perfil. Tente novamente.";
  }
}
