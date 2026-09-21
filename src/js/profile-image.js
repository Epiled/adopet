export function loadProfileImage() {
  const imageProfile = document.querySelector("[data-profile-menu-image]");

  if (!imageProfile) {
    return;
  }

  const dataSession = localStorage.getItem("adopet_session");

  if (!dataSession) {
    return;
  }

  const userData = JSON.parse(dataSession);

  if (userData.photo) {
    imageProfile.src = userData.photo;
    imageProfile.dataset.profileMenuImage = "true";
  }
}

export function updateProfileImage(image) {
  const imageProfile = document.querySelector("[data-profile-menu-image]");

  if (!imageProfile || !image) {
    return;
  }

  imageProfile.src = image;
  imageProfile.dataset.profileMenuImage = "true";
}
