# 🐺 API Documentation - Loup-Garou Flask Server

**URL de base** : `https://tankroyal.pythonanywhere.com`

---

## 📋 Table des Matières

1. [Routes Générales](#routes-générales)
2. [Gestion des Rooms](#gestion-des-rooms)
3. [Actions de Nuit](#actions-de-nuit)
4. [Résolution de la Nuit](#résolution-de-la-nuit)
5. [Actions de Jour](#actions-de-jour)
6. [État du Jeu](#état-du-jeu)
7. [Format des Fichiers](#format-des-fichiers)
8. [Rôles et Fonctions](#rôles-et-fonctions)
9. [Flux de Jeu Complet](#flux-de-jeu-complet)
10. [Codes d'Erreur](#codes-derreur)

---

## 🏠 Routes Générales

### `GET /`

**Description** : Page d'accueil du serveur Flask

**URL complète** :
```
https://tankroyal.pythonanywhere.com/
```

**Paramètres** : Aucun

**Réponse** :
```
Serveur Flask Du Loup Garou
```

**Code HTTP** : `200 OK`

**Utilité** : Vérifier que le serveur est bien en ligne

---

## 🏠 Gestion des Rooms

### `GET /Room/Create`

**Description** : Crée une nouvelle room de jeu avec tous les fichiers nécessaires

**URL complète** :
```
https://tankroyal.pythonanywhere.com/Room/Create
```

**Paramètres** : Aucun

**Réponse** :
```
123456
```
*(ID aléatoire de la room créée)*

**Code HTTP** : `200 OK`

**Fichiers créés automatiquement** :
- `<ROOM_ID>/Joueurs.txt` : Liste vide pour les joueurs
- `<ROOM_ID>/Game.txt` : État initial = `STATUS=WAITING, PHASE=lobby, TOUR=0`
- `<ROOM_ID>/Actions.txt` : Fichier vide pour les actions de nuit
- `<ROOM_ID>/Votes.txt` : Fichier vide pour les votes du jour

**Exemple d'utilisation** :
```
import requests
response = requests.get("https://tankroyal.pythonanywhere.com/Room/Create")
room_id = response.text
print(f"Room créée : {room_id}")
```

---

### `GET /join/<Room>/<Pseudo>`

**Description** : Permet à un joueur de rejoindre une room avec son pseudo

**URL complète** :
```
https://tankroyal.pythonanywhere.com/join/123456/Artemix89
```

**Paramètres URL** :
- `Room` *(string)* : ID de la room à rejoindre
- `Pseudo` *(string)* : Pseudo du joueur (sans espaces recommandé)

**Réponse** :
```
26396205
```
*(ID unique généré pour ce joueur)*

**Code HTTP** : `200 OK`

**Action effectuée** :
- Génère un ID unique entre 0 et 30 000 000
- Ajoute la ligne `ID,Pseudo,NOROLE,vivant` dans `Joueurs.txt`
- Retourne l'ID pour que le joueur puisse l'utiliser dans les autres routes

**Exemple d'utilisation** :
```
response = requests.get("https://tankroyal.pythonanywhere.com/join/123456/Artemix89")
player_id = response.text
print(f"ID joueur : {player_id}")
```

**Fichier `Joueurs.txt` après** :
```
26396205,Artemix89,NOROLE,vivant
```

---

### `GET /launch/<Room>/<launcher_id>`

**Description** : Lance la partie et attribue les rôles de manière aléatoire. Seul le premier joueur de la liste peut lancer.

**URL complète** :
```
https://tankroyal.pythonanywhere.com/launch/123456/26396205?lg=3&vil=8&voy=1&sor=1&cha=1&cup=0&vol=0&pf=0&lb=0
```

**Paramètres URL** :
- `Room` *(string)* : ID de la room
- `launcher_id` *(string)* : ID du joueur qui tente de lancer (doit être le premier inscrit)

**Paramètres Query (obligatoires)** :
- `lg` *(int)* : Nombre de **Loup-Garou**
- `vil` *(int)* : Nombre de **Simple Villageois**
- `voy` *(int)* : Nombre de **Voyante**
- `sor` *(int)* : Nombre de **Sorcière**
- `cha` *(int)* : Nombre de **Chasseur**
- `cup` *(int)* : Nombre de **Cupidon**
- `vol` *(int)* : Nombre de **Voleur**
- `pf` *(int)* : Nombre de **Petite Fille**
- `lb` *(int)* : Nombre de **Loup Blanc**

**Réponse (succès)** :
```
OK
```

**Réponses (erreur)** :
- `400` : `"Aucun joueur dans la room"` si le fichier Joueurs.txt est vide
- `403` : `"Tu n'es pas autorisé à lancer la partie"` si launcher_id n'est pas le premier joueur
- `400` : `"Nombre de rôles différent du nombre de joueurs"` si la somme des rôles ≠ nombre de joueurs

**Actions effectuées** :
1. Lit tous les joueurs dans `Joueurs.txt`
2. Vérifie que `launcher_id` correspond au premier joueur inscrit
3. Crée une liste avec tous les rôles demandés
4. Mélange aléatoirement cette liste avec `random.shuffle()`
5. Attribue un rôle à chaque joueur
6. Réécrit `Joueurs.txt` avec les rôles attribués
7. Met à jour `Game.txt` : `STATUS=LAUNCHED`, `PHASE=nuit`, `TOUR=1`

**Exemple avec 17 joueurs** :
```
https://tankroyal.pythonanywhere.com/launch/123456/26396205?lg=3&vil=8&voy=1&sor=1&cha=1&cup=1&vol=1&pf=1&lb=0
```
Donne 17 rôles au total pour 17 joueurs.

**Fichier `Joueurs.txt` avant** :
```
26396205,Artemix89,NOROLE,vivant
10670811,Player2,NOROLE,vivant
2764359,Player3,NOROLE,vivant
```

**Fichier `Joueurs.txt` après** :
```
26396205,Artemix89,Loup-Garou,vivant
10670811,Player2,Simple Villageois,vivant
2764359,Player3,Voyante,vivant
```

**Fichier `Game.txt` après** :
```
STATUS=LAUNCHED
PHASE=nuit
TOUR=1
```

---

## 🌙 Actions de Nuit

### `GET /night/loup/vote/<Room>/<player_id>/<target_id>`

**Description** : Un Loup-Garou ou Loup Blanc vote pour désigner une victime à tuer pendant la nuit

**URL complète** :
```
https://tankroyal.pythonanywhere.com/night/loup/vote/123456/26396205/10670811
```

**Paramètres URL** :
- `Room` *(string)* : ID de la room
- `player_id` *(string)* : ID du loup qui vote
- `target_id` *(string)* : ID de la victime ciblée

**Réponse (succès)** :
```
Vote enregistré
```

**Réponses (erreur)** :
- `403` : `"Joueur invalide"` si le joueur n'existe pas ou est mort
- `403` : `"Tu n'es pas un loup"` si le rôle du joueur n'est pas Loup-Garou ou Loup Blanc

**Action effectuée** :
- Ajoute la ligne `LOUP_VOTE,<player_id>,<target_id>` dans `Actions.txt`

**Conditions** :
- Le joueur doit être vivant (`statut == "vivant"`)
- Le joueur doit avoir le rôle `"Loup-Garou"` ou `"Loup Blanc"`

**Exemple `Actions.txt` après plusieurs votes** :
```
LOUP_VOTE,26396205,10670811
LOUP_VOTE,5980465,10670811
LOUP_VOTE,12712873,2764359
```
*Ici, 2 loups votent pour 10670811, 1 loup vote pour 2764359*

**Résolution** : Le joueur avec le plus de votes sera tué lors de `/night/resolve` (sauf si sauvé par la sorcière)

---

### `GET /night/voyante/voir/<Room>/<player_id>/<target_id>`

**Description** : La Voyante observe le rôle d'un joueur pendant la nuit

**URL complète** :
```
https://tankroyal.pythonanywhere.com/night/voyante/voir/123456/26396205/10670811
```

**Paramètres URL** :
- `Room` *(string)* : ID de la room
- `player_id` *(string)* : ID de la Voyante
- `target_id` *(string)* : ID du joueur à observer

**Réponse (succès)** :
```
{
  "role": "Loup-Garou"
}
```

**Réponses (erreur)** :
- `403` : `"Action non autorisée"` si le joueur n'est pas la Voyante, est mort, ou n'existe pas
- `400` : `"Cible invalide"` si target_id n'existe pas

**Actions effectuées** :
1. Vérifie que `player_id` est bien la Voyante et est vivant
2. Enregistre l'action : `VOYANTE,<player_id>,<target_id>` dans `Actions.txt`
3. Retourne le rôle de la cible en JSON

**Conditions** :
- Le joueur doit être vivant
- Le joueur doit avoir le rôle `"Voyante"`
- La cible doit exister

**Utilité** : La Voyante découvre si un joueur est Loup ou Villageois pour aider le village

---

### `GET /night/sorciere/sauver/<Room>/<player_id>/<target_id>`

**Description** : La Sorcière utilise sa potion de vie pour sauver un joueur de la mort

**URL complète** :
```
https://tankroyal.pythonanywhere.com/night/sorciere/sauver/123456/26396205/10670811
```

**Paramètres URL** :
- `Room` *(string)* : ID de la room
- `player_id` *(string)* : ID de la Sorcière
- `target_id` *(string)* : ID du joueur à sauver (généralement la victime des loups)

**Réponse (succès)** :
```
Potion de vie utilisée
```

**Réponses (erreur)** :
- `403` : `"Action non autorisée"` si le joueur n'est pas la Sorcière ou est mort

**Action effectuée** :
- Ajoute la ligne `SORCIERE_SAVE,<player_id>,<target_id>` dans `Actions.txt`

**Conditions** :
- Le joueur doit être vivant
- Le joueur doit avoir le rôle `"Sorcière"`

**Note importante** : La potion de vie peut être utilisée **une seule fois** par partie (gestion à implémenter côté client ou avec un fichier de suivi)

**Effet** : Lors de `/night/resolve`, si `target_id` devait mourir par les loups, il survit

---

### `GET /night/sorciere/tuer/<Room>/<player_id>/<target_id>`

**Description** : La Sorcière utilise sa potion de mort pour tuer un joueur

**URL complète** :
```
https://tankroyal.pythonanywhere.com/night/sorciere/tuer/123456/26396205/10670811
```

**Paramètres URL** :
- `Room` *(string)* : ID de la room
- `player_id` *(string)* : ID de la Sorcière
- `target_id` *(string)* : ID du joueur à tuer

**Réponse (succès)** :
```
Potion de mort utilisée
```

**Réponses (erreur)** :
- `403` : `"Action non autorisée"` si le joueur n'est pas la Sorcière ou est mort

**Action effectuée** :
- Ajoute la ligne `SORCIERE_KILL,<player_id>,<target_id>` dans `Actions.txt`

**Conditions** :
- Le joueur doit être vivant
- Le joueur doit avoir le rôle `"Sorcière"`

**Note importante** : La potion de mort peut être utilisée **une seule fois** par partie

**Effet** : Lors de `/night/resolve`, `target_id` meurt en plus de la victime des loups (si elle existe)

---

### `GET /night/cupidon/lier/<Room>/<player_id>/<target1_id>/<target2_id>`

**Description** : Cupidon crée un couple entre deux joueurs. Si l'un meurt, l'autre meurt aussi de chagrin.

**URL complète** :
```
https://tankroyal.pythonanywhere.com/night/cupidon/lier/123456/26396205/10670811/2764359
```

**Paramètres URL** :
- `Room` *(string)* : ID de la room
- `player_id` *(string)* : ID de Cupidon
- `target1_id` *(string)* : ID du premier joueur du couple
- `target2_id` *(string)* : ID du deuxième joueur du couple

**Réponse (succès)** :
```
Couple créé
```

**Réponses (erreur)** :
- `403` : `"Action non autorisée"` si le joueur n'est pas Cupidon ou est mort

**Action effectuée** :
- Ajoute la ligne `CUPIDON,<player_id>,<target1_id>,<target2_id>` dans `Actions.txt`

**Conditions** :
- Le joueur doit être vivant
- Le joueur
