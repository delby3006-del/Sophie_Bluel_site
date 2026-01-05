const valeurToken = localStorage.getItem("token");
console.log("token :", valeurToken);

const etatLog = document.querySelector(".etat-log");

if (valeurToken) {
  etatLog.innerHTML = `<a href="#" id="logout">Logout</a>`;
  ajouterBordureAdmin();

  document.querySelector("#logout").addEventListener("click", (e) => {
    e.preventDefault(); // empêche le rechargement

    localStorage.removeItem("token"); // ✅ suppression du token
    console.log("Token supprimé");

    window.location.href = "./index.html"; // redirection
  });
} else {
  //   etatLog.innerText = "Connexion";
  console.log("Utilisateur non connecté");
}

async function ajouterBordureAdmin() {
  const bordureAdmin = document.createElement("div");
  const modeEdition = document.createElement("p");
  bordureAdmin.className = "border-admin";
  modeEdition.innerText = "Mode édition";
  document.querySelector("body").prepend(bordureAdmin);
  document.querySelector(".border-admin").appendChild(modeEdition);
}
