import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory state
let siteStatus = 'ALIVE';
let nextDevisId = 3;
const devisStore = {
  'devis_1.txt': `ID : 1
Nom : Martin
Prénom : Lucas
Email : lucas.martin@example.com
Nom du bot : ModerationBot
Nom du serveur : Gaming Arena France
Description : Bot pour gérer les sanctions automatiques, les rôles de bienvenue et les alertes de stream.`,
  'devis_2.txt': `ID : 2
Nom : Dubois
Prénom : Camille
Email : camille.dubois@example.com
Nom du bot : EventMaster
Nom du serveur : Esport League Club
Description : Bot de tournois avec gestion des brackets, inscriptions automatiques et notifications vocales.`
};

// API Endpoints
app.get('/alive', (req, res) => {
  res.type('text/plain').send(siteStatus);
});

app.post('/change_site_status', (req, res) => {
  const { id, mdp, status } = req.body || {};
  if (!id || !mdp) {
    return res.status(400).json({ error: 'Identifiants obligatoires.' });
  }
  if (status !== 'ALIVE' && status !== 'OFFLINE') {
    return res.status(400).json({ error: 'Statut invalide.' });
  }
  siteStatus = status;
  return res.json({ status: 'success', current: siteStatus });
});

app.post('/newdevis', (req, res) => {
  const { nom, prenom, email, nom_bot, description, nom_du_serveur, taille_serveur } = req.body || {};
  if (!nom || !prenom || !email || !nom_bot || !description || !nom_du_serveur) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }
  const id = nextDevisId++;
  const filename = `devis_${id}.txt`;
  devisStore[filename] = `ID : ${id}
Nom : ${nom}
Prénom : ${prenom}
Email : ${email}
Nom du bot : ${nom_bot}
Nom du serveur : ${nom_du_serveur}
Taille du serveur : ${taille_serveur || 'N/A'}
Description : ${description}`;

  return res.json({ status: 'success', id });
});

app.post('/admin_devis', (req, res) => {
  const { id, mdp } = req.body || {};
  if (!id || !mdp) {
    return res.status(401).json({ error: 'Identifiants obligatoires.' });
  }
  return res.json(devisStore);
});

app.post('/send_response', (req, res) => {
  const { email, message, client, items } = req.body || {};
  if (!email || !items || !items.length) {
    return res.status(400).json({ status: 'error', msg: 'Données incomplètes.' });
  }
  console.log(`[Devis] Réponse envoyée à ${email} (${client}) :`, { message, items });
  return res.json({ status: 'sent' });
});

app.post('/check_admin', (req, res) => {
  const id = req.body?.id;
  const password = req.body?.password;
  if (!id || !password) {
    return res.status(401).json({ valid: false, error: 'Identifiants requis' });
  }
  // Allow login for admin credentials
  return res.json({ valid: true });
});

// Serve static directory with html extension fallback
app.use(express.static(__dirname, {
  extensions: ['html'],
  index: ['index.html']
}));

// Fallback to 404 page if exists
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'), (err) => {
    if (err) {
      res.status(404).send('Page non trouvée');
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`GeekSoft server running on http://0.0.0.0:${PORT}`);
});
