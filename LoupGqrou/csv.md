text
# Utilitaires CSV en Python

Ce fichier décrit les fonctions de `csv_utils.py` pour créer, lire et modifier des fichiers CSV avec le module standard `csv` de Python. [web:42][web:34]

import csv
from typing import List, Optional

def creer_csv(nom_fichier: str, colonnes: List[str]) -> None:
"""Crée un fichier CSV avec les colonnes données."""
with open(nom_fichier, "w", newline="", encoding="utf-8") as f:
writer = csv.writer(f)
writer.writerow(colonnes) # ligne d'en-tête

def ajouter_ligne(nom_fichier: str, valeurs: List[str]) -> None:
"""Ajoute une ligne (liste de valeurs) à la fin du CSV."""
with open(nom_fichier, "a", newline="", encoding="utf-8") as f:
writer = csv.writer(f)
writer.writerow(valeurs)

def get_ligne_numero(nom_fichier: str, index: int) -> Optional[List[str]]:
"""
Récupère la ligne numéro index (0 = première ligne du fichier).
Renvoie None si l'index est hors limite.
"""
with open(nom_fichier, "r", newline="", encoding="utf-8") as f:
reader = csv.reader(f)
lignes = list(reader)
if 0 <= index < len(lignes):
return lignes[index]
return None

def get_ligne_par_valeur(
nom_fichier: str,
nom_colonne: str,
valeur_recherchee: str
) -> Optional[List[str]]:
"""
Récupère la première ligne pour laquelle la colonne nom_colonne
a la valeur valeur_recherchee. Renvoie la ligne (liste) ou None.
"""
with open(nom_fichier, "r", newline="", encoding="utf-8") as f:
reader = csv.reader(f)
lignes = list(reader)

text
if not lignes:
    return None

en_tete = lignes
if nom_colonne not in en_tete:
    return None

idx_col = en_tete.index(nom_colonne)

for ligne in lignes[1:]:
    if len(ligne) > idx_col and ligne[idx_col] == valeur_recherchee:
        return ligne
return None
def modifier_ligne_par_valeur(
nom_fichier: str,
nom_colonne: str,
valeur_recherchee: str,
nouvelles_valeurs: List[str]
) -> bool:
"""
Modifie la première ligne qui a nom_colonne == valeur_recherchee
en remplaçant toute la ligne par nouvelles_valeurs.
Renvoie True si une ligne a été modifiée, False sinon.
"""
with open(nom_fichier, "r", newline="", encoding="utf-8") as f:
reader = csv.reader(f)
lignes = list(reader)

text
if not lignes:
    return False

en_tete = lignes
if nom_colonne not in en_tete:
    return False

idx_col = en_tete.index(nom_colonne)
modifie = False

for i in range(1, len(lignes)):
    ligne = lignes[i]
    if len(ligne) > idx_col and ligne[idx_col] == valeur_recherchee:
        lignes[i] = nouvelles_valeurs
        modifie = True
        break

if modifie:
    with open(nom_fichier, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerows(lignes)

return modifie
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
