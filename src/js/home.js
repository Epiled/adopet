import { isAuthenticated } from "./auth.js";

if (!isAuthenticated()) {
  window.location.href = "login.html";
}
