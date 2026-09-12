export function isAuthenticated() {
  return Boolean(localStorage.getItem("adopet_session"));
}

export function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = "login.html";
  }
}

export function redirectAuthenticated() {
  if (isAuthenticated()) {
    window.location.href = "home.html";
  }
}
