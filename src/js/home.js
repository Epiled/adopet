import { isAuthenticated } from "./auth.js";
import { loadProfileImage } from "./profile-image.js";

if (!isAuthenticated()) {
  window.location.href = "login.html";
}

loadProfileImage();
