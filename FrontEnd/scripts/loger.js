const valeurToken = localStorage.getItem("token");

const etatLog = document.querySelector(".etat-log");

if (valeurToken) {
  etatLog.innerHTML = `<a href="#" id="logout">Logout</a>`;
  ajouterBordureAdmin();
  creerBoutonModificerProjetsAdmin();
  // creerBaliseDialog();
  ouvrirModaleAdmin();

  document.querySelector("#logout").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "./index.html";
  });
}

async function ajouterBordureAdmin() {
  const modaleDom = document.querySelector(".modale-admin");
  const bordureAdmin = document.createElement("div");
  const logoModeEdition = document.createElement("i");
  const modeEdition = document.createElement("p");
  logoModeEdition.className = "fa-regular fa-pen-to-square logo-mode-edition";
  modeEdition.innerText = "Mode édition";
  bordureAdmin.className = "border-admin";
  modaleDom.after(bordureAdmin);
  bordureAdmin.append(logoModeEdition, modeEdition);
}

async function supprimerphotoModale(id) {
  try {
    await fetch("http://localhost:5678/api/works/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    doneesWorks = doneesWorks.filter((work) => work.id !== id);
  } catch (error) {
    console.error("Erreur suppression:", error);
    alert("Erreur lors de la suppression");
  }
}

async function afficherGaleriesModale(works) {
  const conteneur = document.querySelector(".afficher-photo");
  if (!conteneur) return;

  conteneur.innerHTML = "";

  for (let work of works) {
    const imageElement = document.createElement("img");
    imageElement.className = "photos-modale";
    imageElement.src = work.imageUrl;

    const figureElement = document.createElement("figure");
    figureElement.className = "figure-element";

    const poubelle = document.createElement("button");
    poubelle.type = "button";
    poubelle.className = "fa-solid fa-trash-can icone-poubelle";

    figureElement.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });

    poubelle.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();

      await supprimerphotoModale(work.id);

      figureElement.remove();

      afficherGaleriesModale(doneesWorks);

      await rafraichirGaleriePrincipale();
    });

    conteneur.appendChild(figureElement);
    figureElement.append(imageElement, poubelle);
  }
}

let doneesWorks = null;

async function créerModaleAdmin() {
  const modale = document.querySelector(".modale-root");
  modale.innerHTML = "";

  const conteneurModale = document.createElement("div");
  const croixmodale = document.createElement("i");
  const titreModale = document.createElement("h2");
  const afficherphoto = document.createElement("div");
  const ajouterphoto = document.createElement("button");

  conteneurModale.className = "conteneur-modale";
  croixmodale.className = "fa-solid fa-xmark croix-modale";
  titreModale.className = "titre-modale";
  afficherphoto.className = "afficher-photo";
  ajouterphoto.className = "ajouter-photo";
  ajouterphoto.type = "button";

  titreModale.innerText = "Galerie photo";
  ajouterphoto.innerText = "Ajouter une photo";

  conteneurModale.addEventListener("click", (e) => e.stopPropagation());
  ajouterphoto.addEventListener("click", (e) => {
    e.preventDefault();
    ajouterphotoModale();
  });

  document.querySelector(".modale-root").prepend(conteneurModale);
  conteneurModale.append(croixmodale, titreModale, afficherphoto, ajouterphoto);

  croixmodale.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    fermerModale();
  });

  if (doneesWorks === null) {
    const response = await fetch("http://localhost:5678/api/works");
    doneesWorks = await response.json();
  }

  afficherGaleriesModale(doneesWorks);
}

async function ouvrirModale() {
  await créerModaleAdmin();
  const modaleAdmin = document.querySelector(".modale-admin");

  if (typeof modaleAdmin.showModal === "function") {
    modaleAdmin.showModal();
  } else {
    modaleAdmin.style.display = "flex";
  }
}

function fermerModale() {
  const modaleAdmin = document.querySelector(".modale-admin");

  if (modaleAdmin) {
    if (typeof modaleAdmin.close === "function") {
      modaleAdmin.close();
    } else {
      modaleAdmin.style.display = "none";
    }

    const modale = document.querySelector(".modale-root");
    modale.innerHTML = "";
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

async function rafraichirGaleriePrincipale() {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();

  const galerie = document.querySelector(".gallery");
  galerie.innerHTML = "";

  for (let work of works) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = work.imageUrl;
    figure.appendChild(img);
    galerie.appendChild(figure);
  }
}

async function initialiserCategories() {
  const selecteurCategoriePhotoAjouter = document.querySelector(
    ".selecteur-categorie-photo-ajouter",
  );

  if (!selecteurCategoriePhotoAjouter) return;

  const categoriesImporter = await rechercherNomCategorie();
  selecteurCategoriePhotoAjouter.innerHTML = "";

  const optionzero = document.createElement("option");
  optionzero.value = "";
  optionzero.innerText = "";
  selecteurCategoriePhotoAjouter.append(optionzero);

  for (let i = 0; i < categoriesImporter.length; i++) {
    const optionElement = document.createElement("option");
    optionElement.value = categoriesImporter[i].id;
    optionElement.innerText = categoriesImporter[i].name;
    selecteurCategoriePhotoAjouter.appendChild(optionElement);
  }
}

function previewimage(e) {
  const preview = document.getElementById("img-preview");
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    preview.src = event.target.result;
    preview.style.display = "block";
  };
  reader.readAsDataURL(file);
}

async function validerAjoutPhoto() {
  const nomTitrePhotoAjouter = document.querySelector(
    ".nom-titre-photo-ajouter",
  );
  const selecteurCategoriePhotoAjouter = document.querySelector(
    ".selecteur-categorie-photo-ajouter",
  );
  const fichier = document.getElementById("ajout-photo-input")?.files[0];

  if (!nomTitrePhotoAjouter || !selecteurCategoriePhotoAjouter || !fichier) {
    alert("Tous les champs doivent être remplis !");
    return false;
  }

  const titre = nomTitrePhotoAjouter.value.trim();
  const categorie = selecteurCategoriePhotoAjouter.value;

  if (!titre || !categorie) {
    alert("Tous les champs doivent être remplis !");
    return false;
  }

  const formData = new FormData();
  formData.append("image", fichier);
  formData.append("title", titre);
  formData.append("category", categorie);

  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erreur API:", errorData);
      alert(`Erreur ${response.status}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Erreur:", error);
    alert("Erreur lors de l'ajout de la photo");
    return false;
  }
}

function controleurPhotoImporter() {
  const fichier = document.getElementById("ajout-photo-input")?.files[0];
  const nomTitrePhotoAjouter = document.querySelector(
    ".nom-titre-photo-ajouter",
  );
  const selecteurCategoriePhotoAjouter = document.querySelector(
    ".selecteur-categorie-photo-ajouter",
  );

  if (!nomTitrePhotoAjouter || !selecteurCategoriePhotoAjouter) {
    return false;
  }

  const nomPhoto = nomTitrePhotoAjouter.value.trim();
  const categoriePhoto = selecteurCategoriePhotoAjouter.value;

  return !!(fichier && nomPhoto && categoriePhoto);
}

function cacherLogoBoutonAjouterPhoto() {
  const logoPhotoAjouter = document.querySelector(".logo-photo-ajouter");
  const boutonPlusAjouterPhoto = document.querySelector(
    ".bouton-plus-ajouter-photo",
  );
  const commentaireAjouterPhoto = document.querySelector(
    ".commentaire-ajouter-photo",
  );

  if (commentaireAjouterPhoto) commentaireAjouterPhoto.style.display = "none";
  if (logoPhotoAjouter) logoPhotoAjouter.style.display = "none";
  if (boutonPlusAjouterPhoto) boutonPlusAjouterPhoto.style.display = "none";
}

async function ajouterphotoModale() {
  const modaleAdmin = document.querySelector(".modale-root");

  modaleAdmin.innerHTML = "";

  const conteneurModaleAjouter = document.createElement("div");
  const croixmodaleAjouter = document.createElement("i");
  const flechemodaleAjouter = document.createElement("i");
  const titreModaleAjouter = document.createElement("h2");
  const contenuModaleImporter = document.createElement("div");
  const logoPhotoAjouter = document.createElement("i");
  const boutonPlusAjouterPhoto = document.createElement("button");
  const commentaireAjouterPhoto = document.createElement("p");
  const boutonAjouterPhoto = document.createElement("input");
  const imgAjouterPreview = document.createElement("img");
  const blocInformationAjouterPhoto = document.createElement("div");
  const titrePhotoAjouter = document.createElement("h3");
  const nomTitrePhotoAjouter = document.createElement("input");
  const categoriePhotoAjouter = document.createElement("h3");
  const selecteurCategoriePhotoAjouter = document.createElement("select");
  const validerphotoAjouter = document.createElement("button");

  conteneurModaleAjouter.className = "conteneur-modale-ajouter";
  croixmodaleAjouter.className = "fa-solid fa-xmark croix-modale";
  flechemodaleAjouter.className = "fa-solid fa-arrow-left fleche-modale";
  logoPhotoAjouter.className = "fa-regular fa-image logo-photo-ajouter";
  logoPhotoAjouter.style.cursor = "pointer";
  titreModaleAjouter.className = "titre-modale-ajouter";
  contenuModaleImporter.className = "contenu-modale-importer";
  boutonPlusAjouterPhoto.className = "bouton-plus-ajouter-photo";
  imgAjouterPreview.className = "img-ajouter-preview";
  imgAjouterPreview.id = "img-preview";
  imgAjouterPreview.alt = "Aperçu de la photo ajoutée";
  commentaireAjouterPhoto.className = "commentaire-ajouter-photo";
  blocInformationAjouterPhoto.className = "bloc-information-ajouter-photo";
  titrePhotoAjouter.className = "titre-photo-ajouter";
  nomTitrePhotoAjouter.className = "nom-titre-photo-ajouter";
  nomTitrePhotoAjouter.type = "text";
  categoriePhotoAjouter.className = "categorie-photo-ajouter";
  selecteurCategoriePhotoAjouter.className =
    "selecteur-categorie-photo-ajouter";
  validerphotoAjouter.className = "valider-photo";
  validerphotoAjouter.type = "button";

  boutonAjouterPhoto.type = "file";
  boutonAjouterPhoto.accept = "image/png, image/jpeg";
  boutonAjouterPhoto.className = "ajout-photo-input";
  boutonAjouterPhoto.id = "ajout-photo-input";
  boutonAjouterPhoto.style.display = "none";

  boutonPlusAjouterPhoto.innerText = "+ Ajouter photo";
  titreModaleAjouter.innerText = "Ajout photo";
  titrePhotoAjouter.innerText = "Titre";
  categoriePhotoAjouter.innerText = "Catégorie";
  validerphotoAjouter.innerText = "valider";
  commentaireAjouterPhoto.innerText = "jpg, png : 4mo max";

  conteneurModaleAjouter.addEventListener("click", (e) => e.stopPropagation());

  croixmodaleAjouter.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    fermerModale();
  });

  logoPhotoAjouter.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    boutonAjouterPhoto.click();
    await initialiserCategories();
  });

  boutonPlusAjouterPhoto.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    boutonAjouterPhoto.click();
    await initialiserCategories();
  });

  boutonAjouterPhoto.addEventListener("change", (e) => {
    previewimage(e);
    cacherLogoBoutonAjouterPhoto();
  });

  nomTitrePhotoAjouter.addEventListener("input", () => {
    if (controleurPhotoImporter()) {
      validerphotoAjouter.style.backgroundColor = "#1d6154";
    } else {
      validerphotoAjouter.style.backgroundColor = "";
    }
  });

  selecteurCategoriePhotoAjouter.addEventListener("change", () => {
    if (controleurPhotoImporter()) {
      validerphotoAjouter.style.backgroundColor = "#1d6154";
    } else {
      validerphotoAjouter.style.backgroundColor = "";
    }
  });

  validerphotoAjouter.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!controleurPhotoImporter()) return;

    const success = await validerAjoutPhoto();

    if (success) {
      const response = await fetch("http://localhost:5678/api/works");
      doneesWorks = await response.json();

      await rafraichirGaleriePrincipale();

      nomTitrePhotoAjouter.value = "";
      selecteurCategoriePhotoAjouter.innerHTML = "";
      boutonAjouterPhoto.value = "";
      imgAjouterPreview.src = "";
      imgAjouterPreview.style.display = "none";

      logoPhotoAjouter.style.display = "block";
      boutonPlusAjouterPhoto.style.display = "block";
      commentaireAjouterPhoto.style.display = "block";
      validerphotoAjouter.style.backgroundColor = "";
    }
  });

  flechemodaleAjouter.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    document.querySelector(".modale-root").innerHTML = "";

    const response = await fetch("http://localhost:5678/api/works");
    doneesWorks = await response.json();

    await créerModaleAdmin();
  });

  modaleAdmin.prepend(conteneurModaleAjouter);
  conteneurModaleAjouter.append(
    croixmodaleAjouter,
    flechemodaleAjouter,
    titreModaleAjouter,
    contenuModaleImporter,
    blocInformationAjouterPhoto,
  );

  contenuModaleImporter.append(
    logoPhotoAjouter,
    boutonAjouterPhoto,
    boutonPlusAjouterPhoto,
    commentaireAjouterPhoto,
    imgAjouterPreview,
  );

  blocInformationAjouterPhoto.append(
    titrePhotoAjouter,
    nomTitrePhotoAjouter,
    categoriePhotoAjouter,
    selecteurCategoriePhotoAjouter,
  );

  conteneurModaleAjouter.append(validerphotoAjouter);
}
