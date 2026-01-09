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

async function supprimerphotoModale(id) {
  const response = await fetch("http://localhost:5678/api/works/" + id, {
    method: "delete",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
}

async function afficherGaleriesModale() {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  console.log(works);

  for (let i = 0; i < works.length; i++) {
    const work = works[i];
    const imageElement = document.createElement("img");
    imageElement.className = "photos-modale";
    imageElement.src = work.imageUrl;

    const figureElement = document.createElement("figure");
    figureElement.className = "figureElement";

    const poubelle = document.createElement("button");
    poubelle.className = "fa-solid fa-trash-can icone-poubelle";
    poubelle.addEventListener("click", async () => {
      await supprimerphotoModale(work.id);
      figureElement.remove();
    });
    document.querySelector(".afficher-photo").appendChild(figureElement);
    figureElement.appendChild(imageElement);
    figureElement.appendChild(poubelle);
  }
}

async function créerModaleAdmin() {
  afficherGaleriesModale();
  const modaleAdmin = document.createElement("dialog");
  const croixmodale = document.createElement("i");
  const titreModale = document.createElement("h2");
  const afficherphoto = document.createElement("div");
  const ajouterphoto = document.createElement("button");
  titreModale.className = "titre-modale";
  croixmodale.className = "fa-solid fa-xmark croix-modale";
  modaleAdmin.className = "modale-admin";
  afficherphoto.className = "afficher-photo";
  ajouterphoto.className = "ajouter-photo";
  titreModale.innerText = "Galerie photo";
  ajouterphoto.innerText = "Ajouter une photo";
  document.querySelector("body").prepend(modaleAdmin);
  document.querySelector(".modale-admin").prepend(croixmodale);
  document.querySelector(".modale-admin").prepend(titreModale);
  document.querySelector(".modale-admin").appendChild(afficherphoto);
  document.querySelector(".modale-admin").appendChild(ajouterphoto);
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
