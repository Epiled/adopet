const logout = document.querySelector("[ data-logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();

  localStorage.removeItem("adopet_session");
  window.location.href = "index.html";
});
