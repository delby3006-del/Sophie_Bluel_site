async function connectionHomepage() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("mdp").value;

  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // Si identifiants faux → OC attend souvent 401
    if (!response.ok) {
      // Affiche un message d’erreur (à adapter à ton HTML)
      console.log("Login échoué :", response.status);
      alert("Erreur dans l’identifiant ou le mot de passe");
      return;
    }

    const data = await response.json(); // { token: "..." }

    // Stocker le token pour être reconnue ensuite
    localStorage.setItem("token", data.token);

    // Rediriger vers la page d’accueil (index)
    window.location.href = "./index.html";
  } catch (err) {
    console.error("Erreur réseau :", err);
    alert("Impossible de contacter le serveur.");
  }
}

// Exécuter les fonctions
document.getElementById("formulaire").addEventListener("submit", (e) => {
  e.preventDefault();
  connectionHomepage();
});
