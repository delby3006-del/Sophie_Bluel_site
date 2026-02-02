async function connectionHomepage() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("mdp").value;

  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      // console.log("Login échoué :", response.status);
      alert("Erreur dans l’identifiant ou le mot de passe");
      return;
    }

    const data = await response.json();

    localStorage.setItem("token", data.token);

    window.location.href = "./index.html";
  } catch (err) {
    console.error("Erreur réseau :", err);
    alert("Impossible de contacter le serveur.");
  }
}

document.getElementById("formulaire").addEventListener("submit", (e) => {
  e.preventDefault();
  connectionHomepage();
});
