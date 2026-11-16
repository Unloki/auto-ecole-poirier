export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      title: 'Objectif Permis | Auto-école à Sainte-Maure-de-Touraine',
      meta: [
        { name: 'description', content: 'Objectif Permis à Sainte-Maure-de-Touraine : permis B, conduite accompagnée et supervisée, code en salle et en ligne. Une formation axée sur la sécurité routière.' }
      ]
    }
  }
})
