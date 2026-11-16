# Objectif Permis — POC V5 (Nuxt 4)

Site vitrine **Objectif Permis**, Sainte-Maure-de-Touraine.

## Installer dans le projet Nuxt existant

Copier les dossiers `app/` et `public/`, ainsi que `nuxt.config.ts`, dans le projet local.
Ne supprimez pas le `package.json` et le `package-lock.json` de votre projet Nuxt.

```powershell
npm install
npm run dev
```

Ouvrir http://localhost:3000.

## Nouveautés V5

- **Une seule galerie de 5 photos** (3 véhicules, 2 intérieurs), une photo affichée à la fois ; flèches gauche/droite et 5 points de navigation.
- **Deux seuls textes** de présentation : « Nos véhicules » (photos 1–3) et « Nos espaces de formation » (photos 4–5).
- Prise en charge des flèches du clavier et du balayage du doigt sur mobile.
- **Menu suivi au défilement** : la rubrique visible est mise en évidence par un soulignement dégradé reprenant le bleu et l’orange de l'identité visuelle.
- Tous les contenus tarifaires et sections V4 sont conservés.

## Ajouter les photos restantes

Les quatre photos manquantes doivent être fournies par l'auto-école :

| Photo | Emplacement |
| --- | --- |
| Voiture 1 | `public/images/voiture.webp` — déjà incluse |
| Voiture 2 | `public/images/galerie/voiture-2.jpg` |
| Voiture 3 | `public/images/galerie/voiture-3.jpg` |
| Intérieur 1 | `public/images/galerie/interieur-1.jpg` |
| Intérieur 2 | `public/images/galerie/interieur-2.jpg` |

Pour l'instant, les images manquantes donnent lieu à un emplacement explicite ; **aucune photo n'a été inventée**.
La photo du héros reste dans `public/images/hero-car.png`.

## Déploiement Vercel

Depuis votre projet Nuxt :

```powershell
npx vercel
```

Il faudra encore valider les tarifs avec les propriétaires, ajouter les pages légales, la politique de confidentialité et les autres documents exigibles avant publication publique.
