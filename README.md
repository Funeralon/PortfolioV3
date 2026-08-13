# Portfolio — Mathieu Dumas

Site statique en HTML / CSS / JavaScript, sans framework ni build. Tu ouvres `index.html`
dans un navigateur et ça marche.

```
index.html     structure et contenu — c'est le seul fichier à éditer au quotidien
styles.css     mise en forme
script.js      ports du switch, navigation active, filtres, copie de l'e-mail
favicon.svg    icône d'onglet
```

## Mettre en ligne (GitHub Pages, gratuit)

1. Crée un dépôt public nommé `mathieu-dumas.github.io` (remplace par ton pseudo GitHub).
2. Dépose les quatre fichiers à la racine.
3. Settings → Pages → Source : `main` / `root`. Le site est en ligne en une minute.

Alternatives équivalentes : Netlify, Cloudflare Pages, ou l'hébergement de ton IUT.

## À compléter — cherche `[` dans index.html

| Où | Quoi |
|---|---|
| Hero | Rythme d'alternance souhaité |
| Parcours | Parcours du BUT, mention du bac si tu veux l'afficher |
| Compétences | Pare-feu / VPN, niveau Linux, et le point ● / ○ de chaque chip |
| Projets | Carte « labo perso » et carte « projet suivant » |
| Projets | Les liens `data-placeholder` vers ton code et tes démos |
| En dehors | Tes sources de veille |
| Pied de page | Date de dernière mise à jour |
| `<head>` | `og:url` et `og:image` une fois le domaine connu |

Ajoute aussi ton CV à la racine sous le nom **`cv-mathieu-dumas.pdf`** : les deux boutons
« Télécharger le CV » pointent déjà dessus.

### Les pastilles des compétences

- `class="chip chip--pro"` → pastille verte, « pratiqué en entreprise »
- `class="chip"` → pastille grise, « pratiqué en formation ou en projet »

J'ai fait un premier tri à partir du CV. Repasse dessus : c'est la partie qu'un recruteur
technique lit en diagonale, et une pastille verte sur une techno que tu n'as vue qu'en cours
se retourne contre toi en entretien.

### Ajouter un projet

Duplique un bloc `<article class="project reveal">…</article>` dans la section Projets et
remplace le texte. La grille se réorganise seule. Pour une carte « à faire », ajoute la
classe `project--todo` (bordure en pointillés).

### Ajouter une expérience

Duplique un bloc `<article class="xp reveal" data-cat="it">`. `data-cat` vaut `it` ou
`autre` : c'est ce qui alimente le filtre au-dessus de la liste.

## Choix techniques

- **Polices** : Bricolage Grotesque (titres), Instrument Sans (texte), IBM Plex Mono
  (étiquettes et données). Chargées depuis Google Fonts. Si tu veux un site qui fonctionne
  hors ligne ou sans requête tierce, télécharge les `.woff2` et déclare-les en `@font-face`.
- **Accessibilité** : lien d'évitement, contours de focus visibles, `aria-current` sur la
  section active, `prefers-reduced-motion` respecté, contrastes vérifiés.
- **Sans JavaScript** : la page reste entièrement lisible. Seuls les LED du switch, le filtre
  et le bouton de copie disparaissent.
- **Impression** : une feuille de style `@media print` produit une version propre en PDF.

## Deux remarques

Le numéro de téléphone est affiché en clair dans la section Contact. Sur une page publique
il finit aspiré par des robots — supprime le bloc `<div class="card">` correspondant si tu
préfères ne laisser que l'e-mail et LinkedIn.

Le formulaire de contact a volontairement été écarté : il demande un service tiers ou un
backend, et un formulaire qui échoue en silence coûte plus cher qu'un lien `mailto:`.
