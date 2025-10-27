// Script pour capturer l'email des utilisateurs intéressés par la sortie du site

document.addEventListener('DOMContentLoaded', function() {
    const notifyButton = document.getElementById('notify-button');
    
    if (notifyButton) {
        notifyButton.addEventListener('click', function() {
            // Créer une popup personnalisée
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
            
            // Créer un overlay
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
            
            // Gestion du bouton Annuler
            document.getElementById('cancel-email').addEventListener('click', closePopup);
            
            // Gestion du bouton Envoyer
            document.getElementById('submit-email').addEventListener('click', function() {
                const emailInput = document.getElementById('email-input');
                const email = emailInput.value.trim();
                const messageEl = document.getElementById('message');
                
                // Validation simple de l'email
                if (!email) {
                    messageEl.textContent = 'Veuillez entrer une adresse email.';
                    messageEl.style.color = '#f44336';
                    return;
                }
                
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    messageEl.textContent = 'Veuillez entrer une adresse email valide.';
                    messageEl.style.color = '#f44336';
                    return;
                }
                
                // Enregistrer l'email (simulation - en pratique nécessite un backend)
                // Pour une solution réelle, vous devrez utiliser un service backend ou un service tiers
                // comme Formspree, EmailJS, ou une API serverless
                
                // Afficher un message de confirmation
                messageEl.textContent = '✓ Merci ! Votre email a été enregistré.';
                messageEl.style.color = '#4CAF50';
                
                // Sauvegarder dans localStorage pour simulation
                const emails = JSON.parse(localStorage.getItem('emailList') || '[]');
                if (!emails.includes(email)) {
                    emails.push(email);
                    localStorage.setItem('emailList', JSON.stringify(emails));
                    console.log('Email enregistré:', email);
                    console.log('Liste des emails:', emails);
                }
                
                // Fermer la popup après 2 secondes
                setTimeout(closePopup, 2000);
            });
            
            // Permettre l'envoi avec la touche Entrée
            document.getElementById('email-input').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    document.getElementById('submit-email').click();
                }
            });
            
            // Focus sur l'input
            document.getElementById('email-input').focus();
        });
    }
});
