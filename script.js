// Initialisation du client Supabase avec tes clés
const supabase = supabase.createClient(
  'https://kpiydlnolugirnhiqlhj.supabase.co',      // ← Project URL Supabase
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwaXlkbG5vbHVnaXJuaGlxbGhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NTkyODEsImV4cCI6MjA3NzEzNTI4MX0.Es6pAExZ-F4zEXazRCAw0ryJ9-l4rz14y1lYFwkCiXs' // ← Public Key
);

// Fonction d'enregistrement d'email dans Supabase
async function saveEmailToSupabase(email) {
  const { error } = await supabase
    .from('email') // ← nom exact de ta table
    .insert([{ email }]);
  return error;
}

// Gestion du formulaire classique (si présent dans la page)
const emailForm = document.getElementById('emailForm');
if(emailForm) {
  emailForm.onsubmit = async function(e){
    e.preventDefault();
    const email = document.getElementById('emailField').value;
    const error = await saveEmailToSupabase(email);
    if (!error) alert('Email enregistré !');
    else alert('Erreur : ' + error.message);
  }
}

// Script pour la popup de notification d'email
document.addEventListener('DOMContentLoaded', function() {
  const notifyButton = document.getElementById('notify-button');
  
  if (notifyButton) {
    notifyButton.addEventListener('click', function() {
      // Créer la popup personnalisée
      const popup = document.createElement('div');
      popup.id = 'email-popup';
      popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 1000;
        max-width: 400px;
        width: 90%;
      `;
      popup.innerHTML = `
        <h2 style="margin-top: 0; color: #333;">Soyez informé !</h2>
        <p style="color: #666;">Entrez votre adresse email pour être notifié de la sortie du site :</p>
        <input type="email" id="email-input" placeholder="votre@email.com"
               style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 5px; box-sizing: border-box;">
        <div style="display: flex; gap: 10px; margin-top: 20px;">
          <button id="submit-email" style="flex: 1; padding: 10px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Envoyer</button>
          <button id="cancel-email" style="flex: 1; padding: 10px; background: #f44336; color: white; border: none; border-radius: 5px; cursor: pointer;">Annuler</button>
        </div>
        <p id="message" style="margin-top: 10px; color: #666; font-size: 14px;"></p>
      `;
      // Créer overlay semi-transparent
      const overlay = document.createElement('div');
      overlay.id = 'popup-overlay';
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 999;
      `;
      document.body.appendChild(overlay);
      document.body.appendChild(popup);

      // Fonction pour fermer la popup
      function closePopup() {
        document.body.removeChild(popup);
        document.body.removeChild(overlay);
      }
      document.getElementById('cancel-email').addEventListener('click', closePopup);

      // Gestion du bouton "Envoyer"
      document.getElementById('submit-email').addEventListener('click', async function(){
        const input = document.getElementById('email-input');
        const email = input.value.trim();
        const message = document.getElementById('message');
        if(email.length === 0) {
          message.textContent = "Email obligatoire";
          message.style.color = "#f44336";
          return;
        }
        // Enregistrer via Supabase
        const error = await saveEmailToSupabase(email);
        if (!error) {
          message.textContent = "Merci, tu seras notifié à la sortie !";
          message.style.color = "#4CAF50";
          input.value = '';
          setTimeout(closePopup, 2000);
        } else {
          message.textContent = "Erreur : " + error.message;
          message.style.color = "#f44336";
        }
      });
    });
  }
});
