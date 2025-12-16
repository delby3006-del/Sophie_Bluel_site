async function fetchWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  console.log(works);

  // création des elements du DOM
  for (let i = 0; i < works.length; i++) {
    const work = works[i];
    const figureElement = document.createElement("figure");
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
fetchWorks();

async function fetchtries() {
  const categoriesResponse = await fetch(
    "http://localhost:5678/api/categories"
  );
  const categories = await categoriesResponse.json();
  console.log(categories);

  for (let i = 0; i < categories.length; i++) {
    const categorie = categories[i];
    console.log(categorie);
    const boutonElement = document.createElement("button");
    boutonElement.innerText = categorie.name;
  }
}
fetchtries();
// const boutonObject = document.querySelector(".btn-objets");
// boutonObject.addEventListener("click", function () {
//   const filtreObjet = work.filter(function (works) {
//     return works.categoryname === "Objets";
//   });
//   console.log(filtreObjet);
// });
