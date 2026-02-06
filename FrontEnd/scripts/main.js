async function afficherGaleries() {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  console.log(works);

  for (let i = 0; i < works.length; i++) {
    const work = works[i];
    const figureElement = document.createElement("figure");
    figureElement.dataset.categorieId = work.categoryId;
    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerText = work.title;

    console.log(work.imageUrl);

    const workGallery = document.querySelector(".gallery");
    workGallery.appendChild(figureElement);
    figureElement.appendChild(imageElement);
    figureElement.appendChild(figcaptionElement);
  }
}

function filtrerParCategorie(categorieId) {
  const figures = document.querySelectorAll(".gallery figure");

  figures.forEach((figure) => {
    if (categorieId === "tous") {
      figure.style.display = "block";
    } else {
      if (figure.dataset.categorieId === categorieId.toString()) {
        figure.style.display = "block";
      } else {
        figure.style.display = "none";
      }
    }
  });
}

async function rechercherNomCategorie() {
  const categoriesResponse = await fetch(
    "http://localhost:5678/api/categories",
  );
  const categories = await categoriesResponse.json();
  console.log(categories);
  return categories;
}

async function afficherLesCategories() {
  const filterTous = document.createElement("button");
  filterTous.innerText = "Tous";
  filterTous.classList.add("choixGallery");
  filterTous.addEventListener("click", function () {
    filtrerParCategorie("tous");
    supprimerLesClass();
    filterTous.classList.add("choixGallery");
  });
  const filtreBouton = document.querySelector(".filtres");
  filtreBouton.appendChild(filterTous);

  const categories = await rechercherNomCategorie();
  for (let i = 0; i < categories.length; i++) {
    const categorie = categories[i];
    const boutonElement = document.createElement("button");
    boutonElement.innerText = categorie.name;

    boutonElement.addEventListener("click", function () {
      console.log(categorie.id);
      filtrerParCategorie(categorie.id);
      supprimerLesClass();
      boutonElement.classList.add("choixGallery");
    });

    filtreBouton.appendChild(boutonElement);
  }
}

function supprimerLesClass() {
  const classButtons = document.querySelectorAll("button");
  classButtons.forEach((button) => {
    button.classList.remove("choixGallery");
  });
}

// Exécuter les fonctions
afficherGaleries();
afficherLesCategories();
