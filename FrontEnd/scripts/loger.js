const valeurToken = localStorage.getItem("token");
console.log("token :", valeurToken);

const etatLog = document.querySelector(".etat-log");

if (valeurToken) {
  etatLog.innerHTML = `<a href="#" id="logout">Logout</a>`;
  ajouterBordureAdmin();
  creerBoutonModificerProjetsAdmin();
  créerModaleAdmin();
  ouvrirModaleAdmin();
  fermerModaleAdmin();

  document.querySelector("#logout").addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.removeItem("token"); // suppression du token
    console.log("Token supprimé");

    window.location.href = "./index.html"; // redirection
  });
} else {
  console.log("Utilisateur non connecté");
}

async function ajouterBordureAdmin() {
  const bordureAdmin = document.createElement("div");
  const logoModeEdition = document.createElement("i");
  logoModeEdition.className = "fa-regular fa-pen-to-square logo-mode-edition";
  const modeEdition = document.createElement("p");
  modeEdition.innerText = "Mode édition";
  bordureAdmin.className = "border-admin";
  document.querySelector("body").prepend(bordureAdmin);
  document.querySelector(".border-admin").appendChild(logoModeEdition);
  document.querySelector(".border-admin").appendChild(modeEdition);
}

async function créerModaleAdmin() {
  const modaleAdmin = document.createElement("dialog");
  const croixmodale = document.createElement("i");
  const titreModale = document.createElement("h2");
  titreModale.className = "titre-modale";
  titreModale.innerText = "Galerie photo";
  croixmodale.className = "fa-solid fa-xmark croix-modale";
  modaleAdmin.className = "modale-admin";
  // modaleAdmin.innerHTML = "test modale admin";
  document.querySelector("body").prepend(modaleAdmin);
  document.querySelector(".modale-admin").prepend(croixmodale);
  document.querySelector(".modale-admin").prepend(titreModale);
}

async function creerBoutonModificerProjetsAdmin() {
  document.getElementsByClassName("filtres")[0].style.display = "none";
  const logoModifier = document.createElement("i");
  logoModifier.className = "fa-regular fa-pen-to-square logo-modifier";
  const boutonModifier = document.createElement("button");
  boutonModifier.className = "bouton-modifier";
  boutonModifier.innerText = "Modifier";
  document.querySelector("#portfolio h2").appendChild(logoModifier);
  document.querySelector("#portfolio h2").appendChild(boutonModifier);
}
async function ouvrirModaleAdmin() {
  const ouvrirmodale = document.querySelector(".bouton-modifier");
  ouvrirmodale.addEventListener("click", () => {
    console.log("ouvrir modale admin");
    const modaleAdmin = document.querySelector(".modale-admin");
    modaleAdmin.showModal();
  });
}
async function fermerModaleAdmin() {
  const croixmodale = document.querySelector(".croix-modale");
  croixmodale.addEventListener("click", () => {
    console.log("fermer modale admin");
    const modaleAdmin = document.querySelector(".modale-admin");
    modaleAdmin.close();
  });
}
