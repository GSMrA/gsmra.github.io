const membres = [
  { image: "image1.png", pseudo: "Artemix89", desc: "Créateur de GeekSoft", contact: "artemixtsb@gmail.com" },
  { image: "image2.png", pseudo: "Mix260", desc: "Assistant HTML et CSS", contact: "mixpro2taff@gmail.com" },
  { image: "image3.png", pseudo: "Somebody", desc: "Gérant de la communication a temp partiel", contact: "Aucun Contact" },
  { image: "image4.png", pseudo: "Stor", desc: "Tout premier client pour son serveur. Également Testeur a temp partiel et Youtuber", contact: "Son discord : https://discord.gg/cd7YWe8pqV <br>Youtube : https://www.youtube.com/@levraistor" },
  { image: "image5.png", pseudo: "Jess_le_vadrouilleur", desc: "Deusième CLient et également amis de longue date", contact: "Son discord : https://discord.gg/hyqEucjydR" },
  //{ image: "image6.png", pseudo: "Ethan", desc: "Assistant technique et modérateur Discord.", contact: "ethan@geeksoft.online" }
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
