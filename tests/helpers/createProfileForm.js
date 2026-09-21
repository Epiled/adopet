export function createProfileForm({
  name = "Usuário",
  phone = null,
  city = null,
  about = null,
} = {}) {
  const form = document.createElement("form");
  form.dataset.profileForm = "";

  const photoField = document.createElement("input");
  photoField.name = "photo";
  photoField.type = "file";
  photoField.required = false;
  photoField.dataset.field = "";

  const nameField = document.createElement("input");
  nameField.name = "name";
  nameField.type = "text";
  nameField.value = name;
  nameField.required = true;
  nameField.dataset.field = "";

  const phoneField = document.createElement("input");
  phoneField.name = "phone";
  phoneField.type = "text";
  phoneField.value = phone;
  phoneField.required = false;
  phoneField.dataset.field = "";

  const cityField = document.createElement("input");
  cityField.name = "city";
  cityField.type = "text";
  cityField.value = city;
  cityField.required = false;
  cityField.dataset.field = "";

  const aboutField = document.createElement("input");
  aboutField.name = "about";
  aboutField.type = "text";
  aboutField.value = about;
  aboutField.required = false;
  aboutField.dataset.field = "";

  const photoFeedback = document.createElement("span");
  photoFeedback.dataset.feedback = "photo";

  const nameFeedback = document.createElement("span");
  nameFeedback.dataset.feedback = "name";

  const phoneFeedback = document.createElement("span");
  phoneFeedback.dataset.feedback = "phone";

  const cityFeedback = document.createElement("span");
  cityFeedback.dataset.feedback = "city";

  const aboutFeedback = document.createElement("span");
  aboutFeedback.dataset.feedback = "about";

  const profileFeedback = document.createElement("span");
  profileFeedback.dataset.feedback = "profile";

  const button = document.createElement("button");
  button.type = "submit";
  button.dataset.buttonForm = "";

  form.append(
    photoField,
    photoFeedback,
    nameField,
    nameFeedback,
    phoneField,
    phoneFeedback,
    cityField,
    cityFeedback,
    aboutField,
    aboutFeedback,
    profileFeedback,
    button,
  );

  return {
    form,
    photoField,
    photoFeedback,
    nameField,
    nameFeedback,
    phoneField,
    phoneFeedback,
    cityField,
    cityFeedback,
    aboutField,
    aboutFeedback,
    profileFeedback,
    button,
  };
}
