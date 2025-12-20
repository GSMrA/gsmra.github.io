# Documentation des fonctions

## Fonctions utilitaires CSV

### `nb_lignes(nom_fichier: str) -> int`
Compte le nombre de lignes d’un fichier texte ou CSV. [web:16]

n = nb_lignes("joueurs.csv")
print(n) # par ex. 5

text

---

### `creer_csv(nom_fichier: str, colonnes: List[str]) -> None`
Crée un fichier CSV vide avec une ligne d’en-tête. [web:16]

creer_csv("joueurs.csv", ["ID", "Pseudo", "Role", "Status", "RoleStatus"])

text

---

### `ajouter_ligne(nom_fichier: str, valeurs: List[str]) -> None`
Ajoute une ligne à la fin du CSV. [web:16]

ajouter_ligne("joueurs.csv", ["1", "Alice", "Aucun", "Lobby", "0"])

text

---

### `get_ligne_numero(nom_fichier: str, index: int) -> Optional[List[str]]`
Retourne la ligne numéro `index` (0 = en-tête), ou `None` si l’index est hors limites. [web:16]

ligne0 = get_ligne_numero("joueurs.csv", 0) # en-tête
ligne1 = get_ligne_numero("joueurs.csv", 1) # premier joueur

text

---

### `get_ligne_par_valeur(nom_fichier: str, nom_colonne: str, valeur_recherchee: str) -> Optional[List[str]]`
Retourne la première ligne pour laquelle la colonne donnée a la valeur recherchée, ou `None` si pas trouvée. [web:16]

joueur = get_ligne_par_valeur("joueurs.csv", "Pseudo", "Alice")
if joueur:
print("ID du joueur:", joueur)

text

---

### `modifier_ligne_par_valeur(nom_fichier: str, nom_colonne: str, valeur_recherchee: str, nouvelles_valeurs: List[str]) -> bool`
Remplace entièrement la première ligne qui correspond à la valeur donnée dans la colonne cible. Retourne `True` si une ligne a été modifiée. [web:16]

nouvelle_ligne = ["1", "Alice", "Loup-Garou", "EnVie", "0"]
ok = modifier_ligne_par_valeur("joueurs.csv", "ID", "1", nouvelle_ligne)

text

---

## Fonctions utilitaires TXT

### `creer_txt(nom_fichier: str, contenu_initial: str = "") -> None`
Crée un fichier texte (ou l’écrase) avec un contenu initial optionnel. [web:31]

creer_txt("game.txt", "entracte\n0\n\n\n\n\n\n")

text

---

### `lire_ligne(nom_fichier: str, index: int) -> Optional[str]`
Lit la ligne numéro `index` dans un fichier texte, ou `None` si hors limites. [web:31]

etat = lire_ligne("game.txt", 0) # par ex. "entracte\n"

text

---

### `modifier_ligne(nom_fichier: str, index: int, nouveau_texte: str) -> bool`
Remplace la ligne numéro `index` par `nouveau_texte` (le `\n` est ajouté si absent). Retourne `True` en cas de succès. [web:31]

modifier_ligne("game.txt", 0, "nuit")
modifier_ligne("game.txt", 1, "3") # par ex. 3 joueurs

text

---

## Fonctions de jeu sur les joueurs

### `mettre_tous_status_envie(joueurs_csv: str) -> None`
Charge le fichier `joueurs.csv` et met la colonne `Status` à `"EnVie"` pour tous les joueurs. [web:20]

mettre_tous_status_envie("ID_de_room/joueurs.csv")

text

---

### `attribuer_roles(room: str, roles: list[str]) -> None`
Attribue les rôles donnés (liste) à tous les joueurs de la room, en les mélangeant, puis en mettant à jour la colonne `Role` dans `joueurs.csv`. Lève une erreur si le nombre de rôles est différent du nombre de joueurs. [web:20]

roles = ["LG", "VIL", "VOY"]
attribuer_roles("ABCDEFGH", roles)

text

---

## Routes Flask

### `CreateRoom() -> str` — `GET /create`
Crée une nouvelle room. [web:19]

- Génère un ID de room (8 lettres majuscules).
- Crée le dossier correspondant.
- Crée `joueurs.csv` avec les colonnes `["ID","Pseudo","Role","Status","RoleStatus"]`.
- Crée `game.txt` avec un contenu initial.
- Retourne l’ID de la room en texte.

GET /create

text

Exemple de réponse (body) :

QWERTYUI

text

---

### `JoinRoom(room: str, pseudo: str) -> str` — `GET /join/<room>/<pseudo>`
Rejoint une room existante. [web:19]

- Génère un ID numérique pour le joueur.
- Ajoute une ligne dans `<room>/joueurs.csv` avec les infos du joueur.
- Incrémente le nombre de joueurs dans `<room>/game.txt` (ligne 1).
- Retourne l’ID du joueur en texte.

GET /join/QWERTYUI/Alice

text

Exemple de réponse (body) :

123456789

text

---

### `Launch(room: str, id: str)` — `GET /launch/<room>/<id>`
Lance la partie si l’ID fourni correspond au créateur de la room (premier joueur). [web:19]

- Récupère les paramètres de query (`lg`, `lgb`, `vil`, `ch`, `pf`, `voy`, `sor`, `cup`, `vol`).
- Construit la liste des rôles et les écrit dans `game.txt`.
- Sépare les rôles loup et village dans `game.txt`.
- Attribue les rôles aux joueurs avec `attribuer_roles`.
- Met tous les joueurs `EnVie` avec `mettre_tous_status_envie`.
- Met l’état de la partie à `"nuit"` dans `game.txt`.
- Retourne `"Game launch"`.

GET /launch/QWERTYUI/123456789?lg=1&vil=2&voy=1&sor=1

text

Exemple de réponse (body) :

Game launch

text
undefined
