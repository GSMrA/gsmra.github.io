text


## creer_csv

- Crée un nouveau fichier CSV (ou écrase l’ancien s’il existe). [web:42]
- Écrit une seule ligne d’en-tête contenant les noms de colonnes passés dans `colonnes`. [web:42]
- Utilise `csv.writer` pour gérer correctement le format CSV et les séparateurs. [web:28]

**Paramètres :**

- `nom_fichier` : chemin du fichier CSV à créer (ex. `"scores.csv"`).
- `colonnes` : liste des noms de colonnes (ex. `["id", "pseudo", "score"]`).

## ajouter_ligne

- Ouvre le CSV en mode ajout (`"a"`) pour ne pas effacer les données existantes. [web:44]
- Ajoute une nouvelle ligne à la fin du fichier avec les valeurs de la liste `valeurs`. [web:44]
- Les valeurs doivent respecter l’ordre des colonnes du fichier. [web:20]

**Paramètres :**

- `nom_fichier` : chemin du fichier CSV existant.
- `valeurs` : liste représentant une ligne (même taille que le nombre de colonnes).

## get_ligne_numero

- Lit tout le fichier CSV et stocke chaque ligne dans une liste. [web:34]
- Renvoie la ligne à la position `index` (0 = première ligne, souvent l’en-tête). [web:40]
- Si `index` est invalide (trop grand ou négatif), renvoie `None`.

**Paramètres :**

- `nom_fichier` : chemin du fichier CSV.
- `index` : numéro de ligne désiré (0, 1, 2, …).

**Retour :**

- Une liste de chaînes représentant la ligne.
- Ou `None` si la ligne n’existe pas.

## get_ligne_par_valeur

- Lit tout le CSV, récupère l’en-tête puis cherche l’index de la colonne `nom_colonne`. [web:34]
- Parcourt les lignes de données et renvoie la première ligne où la valeur de cette colonne est `valeur_recherchee`. [web:20]
- Renvoie `None` si la colonne n’existe pas ou si aucune ligne ne correspond.

**Paramètres :**

- `nom_fichier` : chemin du fichier CSV.
- `nom_colonne` : nom de la colonne utilisée comme critère de recherche.
- `valeur_recherchee` : valeur à trouver dans cette colonne.

**Retour :**

- Une liste de chaînes représentant la ligne trouvée.
- Ou `None` si rien ne matche.

## modifier_ligne_par_valeur

- Lit tout le fichier CSV en mémoire (en-tête + lignes). [web:34]
- Trouve l’index de `nom_colonne` puis cherche la première ligne dont la valeur dans cette colonne vaut `valeur_recherchee`. [web:20]
- Remplace cette ligne par `nouvelles_valeurs` puis réécrit tout le fichier CSV. [web:39]
- Renvoie `True` si une ligne a été modifiée, sinon `False`.

**Paramètres :**

- `nom_fichier` : chemin du fichier CSV.
- `nom_colonne` : nom de la colonne utilisée comme critère.
- `valeur_recherchee` : valeur à rechercher dans cette colonne.
- `nouvelles_valeurs` : nouvelle ligne complète (liste, même taille que l’en-tête).

**Retour :**

- `True` si une ligne correspondante a été trouvée et modifiée.
- `False` sinon.
