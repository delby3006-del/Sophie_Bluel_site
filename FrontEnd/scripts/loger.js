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
    localStorage.removeItem("token");
    window.location.href = "./index.html";
  });
}

async function ajouterBordureAdmin() {
  const bordureAdmin = document.createElement("div");
  const logoModeEdition = document.createElement("i");
  const modeEdition = document.createElement("p");
  logoModeEdition.className = "fa-regular fa-pen-to-square logo-mode-edition";
  modeEdition.innerText = "Mode édition";
  bordureAdmin.className = "border-admin";
  document.body.prepend(bordureAdmin);
  bordureAdmin.append(logoModeEdition, modeEdition);
}

async function supprimerphotoModale(id) {
  await fetch("http://localhost:5678/api/works/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
}

async function afficherGaleriesModale() {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();

  for (let work of works) {
    const imageElement = document.createElement("img");
    imageElement.className = "photos-modale";
    imageElement.src = work.imageUrl;

    const figureElement = document.createElement("figure");
    figureElement.className = "figure-element";

    const poubelle = document.createElement("button");
    poubelle.type = "button";
    poubelle.className = "fa-solid fa-trash-can icone-poubelle";

    poubelle.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      await supprimerphotoModale(work.id);
      figureElement.remove();
    });

    document.querySelector(".afficher-photo").appendChild(figureElement);
    figureElement.append(imageElement, poubelle);
  }
}

async function créerModaleAdmin() {
  afficherGaleriesModale();

  const modaleAdmin = document.createElement("dialog");
  const conteneurModale = document.createElement("div");
  const croixmodale = document.createElement("i");
  const titreModale = document.createElement("h2");
  const afficherphoto = document.createElement("div");
  const ajouterphoto = document.createElement("button");

  modaleAdmin.className = "modale-admin";
  conteneurModale.className = "conteneur-modale";
  croixmodale.className = "fa-solid fa-xmark croix-modale";
  titreModale.className = "titre-modale";
  afficherphoto.className = "afficher-photo";
  ajouterphoto.className = "ajouter-photo";
  ajouterphoto.type = "button";

  titreModale.innerText = "Galerie photo";
  ajouterphoto.innerText = "Ajouter une photo";

  conteneurModale.addEventListener("click", (e) => e.stopPropagation());

  modaleAdmin.addEventListener("click", () => fermerModale());

  document.body.prepend(modaleAdmin);
  modaleAdmin.prepend(conteneurModale);
  conteneurModale.append(croixmodale, titreModale, afficherphoto, ajouterphoto);
}

function ouvrirModale() {
  const modaleAdmin = document.querySelector(".modale-admin");
  if (typeof modaleAdmin.showModal === "function") {
    modaleAdmin.showModal();
  } else {
    modaleAdmin.style.display = "flex";
  }
}

function fermerModale() {
  const modaleAdmin = document.querySelector(".modale-admin");
  if (typeof modaleAdmin.close === "function") {
    modaleAdmin.close();
  } else {
    modaleAdmin.style.display = "none";
  }
}

async function creerBoutonModificerProjetsAdmin() {
  document.getElementsByClassName("filtres")[0].style.display = "none";
  const logoModifier = document.createElement("i");
  const boutonModifier = document.createElement("button");
  logoModifier.className = "fa-regular fa-pen-to-square logo-modifier";
  boutonModifier.className = "bouton-modifier";
  boutonModifier.type = "button";
  boutonModifier.innerText = "Modifier";
  document.querySelector("#portfolio h2").append(logoModifier, boutonModifier);
}

async function ouvrirModaleAdmin() {
  document.querySelector(".bouton-modifier").addEventListener("click", () => {
    ouvrirModale();
  });
}

async function fermerModaleAdmin() {
  const croixmodale = document.querySelector(".croix-modale");
  croixmodale.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    fermerModale();
  });
}
