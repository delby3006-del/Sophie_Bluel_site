async function fetchWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  console.log(works);

  // création des elements du DOM
  for (let i = 0; i < works.length; i++) {
    const work = works[i];
    const figureElement = document.createElement("figure");
    figureElement.dataset.categorieId = work.categoryId;
    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerText = work.title;

    const workGallery = document.querySelector(".gallery");
    workGallery.appendChild(figureElement);
    figureElement.appendChild(imageElement);
    figureElement.appendChild(figcaptionElement);
  }
}

// Fonction pour filtrer les travaux par catégorie
function filtrerParCategorie(categorieId) {
  const figures = document.querySelectorAll(".gallery figure");

  figures.forEach((figure) => {
    if (categorieId === "tous") {
      // Afficher tous les éléments
      figure.style.display = "block";
    } else {
      // Afficher uniquement ceux qui correspondent à la catégorie
      if (figure.dataset.categorieId === categorieId.toString()) {
        figure.style.display = "block";
      } else {
        figure.style.display = "none";
      }
    }
  });
}

async function fetchtries() {
  const categoriesResponse = await fetch(
    "http://localhost:5678/api/categories"
  );
  const categories = await categoriesResponse.json();
  console.log(categories);

  // Bouton "Tous"
  const filterTous = document.createElement("button");
  filterTous.innerText = "Tous";
  filterTous.classList.add("choixGallery");
  filterTous.addEventListener("click", function () {
    filtrerParCategorie("tous");
    supprimeClass();
    filterTous.classList.add("choixGallery");
  });
  const filtreBouton = document.querySelector(".filtres");
  filtreBouton.appendChild(filterTous);

  // Boutons pour chaque catégorie
  for (let i = 0; i < categories.length; i++) {
    const categorie = categories[i];
    const boutonElement = document.createElement("button");
    boutonElement.innerText = categorie.name;

    boutonElement.addEventListener("click", function () {
      console.log(categorie.id);
      filtrerParCategorie(categorie.id);
      supprimeClass();
      boutonElement.classList.add("choixGallery");
    });

    filtreBouton.appendChild(boutonElement);
  }
}

function supprimeClass() {
  const classButtons = document.querySelectorAll("button");
  classButtons.forEach((button) => {
    button.classList.remove("choixGallery");
  });
}

async function connectionHomepage() {
  const token = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    }),
  }).then((response) => response.json());
  const loginLink = document.querySelector(".connection-button");
  loginLink.href = "./connexion.html";
  loginLink.textContent = "logout";
  console.log("LoginLink");
}

// Exécuter les fonctions
fetchWorks();
fetchtries();
connectionHomepage();
