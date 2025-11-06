const membres = [
  { image: "image1.png", pseudo: "Admin GeekSoft", desc: "Développeur principal du projet GeekSoft et organisateur des tournois Discord.", contact: "admin@geeksoft.online" },
  { image: "image2.png", pseudo: "Lucas", desc: "Responsable bots personnalisés et aide à la configuration Discord.", contact: "lucas@geeksoft.online" },
  { image: "image3.png", pseudo: "Emma", desc: "Designer graphique et gestion des annonces GeekSoft.", contact: "emma@geeksoft.online" },
  { image: "image4.png", pseudo: "Maxime", desc: "Support technique et contact pour les bots marchands.", contact: "maxime@geeksoft.online" },
  { image: "image5.png", pseudo: "Amandine", desc: "Rédactrice et gestion des annonces sur le site GeekSoft.", contact: "amandine@geeksoft.online" },
  { image: "image6.png", pseudo: "Ethan", desc: "Assistant technique et modérateur Discord.", contact: "ethan@geeksoft.online" }
];

const cartesDiv = document.getElementById('cartes');
membres.forEach(m => {
  const carte = document.createElement('div');
  carte.className = 'carte-profil';
  
  // La couleur dépend du rang: ici, gris neutre
  carte.style.setProperty('--card-border', '#888');
  
  // Badge rang blanc/gris
  const badgeHtml = `<img src="https://github.com/GSMrA/gsmra.github.io/raw/main/66649-legendary-ranked.jpg" class="badge-rang" alt="Rang"/>`;
  
  carte.innerHTML = `
    <div class="badge-rang-wrap">${badgeHtml}</div>
    <img src="${m.image}" alt="Photo Profil" class="avatar"/>
    <div class="pseudo">${m.pseudo}</div>
    <div class="desc">${m.desc}</div>
    <div class="contact-info">${m.contact}</div>
  `;
  document.getElementById('cartes').appendChild(carte);
});
