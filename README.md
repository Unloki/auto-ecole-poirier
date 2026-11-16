# POC Objectif Permis — fichiers prêts à copier

1. Installer Node.js LTS récent (v22.21+ ou v24 LTS).
2. `npm create nuxt@latest objectif-permis`
3. Entrer dans le répertoire `objectif-permis`.
4. Copier dans ce projet les dossiers `app/`, `public/` et le fichier `nuxt.config.ts` contenus dans cette archive (en écrasant les fichiers initiaux si nécessaire).
5. `npm run dev` puis ouvrir http://localhost:3000.
6. `npm i -g vercel` puis `vercel login`, `vercel` pour un déploiement de prévisualisation, `vercel --prod` quand le site est prêt à être publié.

Ce POC utilise uniquement du CSS natif pour faciliter la première mise en ligne. Tu peux ajouter Tailwind ensuite via `npx nuxi@latest module add tailwindcss`.

La photo de voiture du hero est **à ajouter** : prévoir une vraie photo du véhicule dans `public/images/voiture.jpg` et une adaptation du CSS de `.hero`.

Important : tarifs et informations administratives à valider. Les mentions légales, la politique de confidentialité, le règlement intérieur et la conformité de la publication du dépliant doivent être finalisés avant lancement public.
