<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const menuOpen = ref(false)
const activeSection = ref('accueil')

// L'ordre correspond exactement à l'ordre réel des sections de la page.
const navigation = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'horaires', label: 'Horaires' },
  { id: 'approche', label: 'Approche' },
  { id: 'formations', label: 'Forfaits' },
  { id: 'galerie', label: 'Photos' },
  { id: 'tarifs', label: 'Tarifs' },
  { id: 'inscription', label: 'Inscription' },
  { id: 'contact', label: 'Contact' },
]

let animationFrame = 0
function updateActiveSection() {
  if (typeof window === 'undefined') return
  const headerHeight = document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 96
  const marker = window.scrollY + headerHeight + Math.min(window.innerHeight * 0.22, 150)
  let current = 'accueil'
  for (const item of navigation) {
    const element = document.getElementById(item.id)
    if (element && element.getBoundingClientRect().top + window.scrollY <= marker) {
      current = item.id
    }
  }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 3) {
    current = 'contact'
  }
  activeSection.value = current
}
function scheduleActiveSectionUpdate() {
  if (animationFrame) return
  animationFrame = window.requestAnimationFrame(() => {
    animationFrame = 0
    updateActiveSection()
  })
}
function selectSection(id: string) {
  menuOpen.value = false
  activeSection.value = id
}
onMounted(() => {
  window.addEventListener('scroll', scheduleActiveSectionUpdate, { passive: true })
  window.addEventListener('resize', scheduleActiveSectionUpdate)
  updateActiveSection()
})
onUnmounted(() => {
  window.removeEventListener('scroll', scheduleActiveSectionUpdate)
  window.removeEventListener('resize', scheduleActiveSectionUpdate)
  if (animationFrame) window.cancelAnimationFrame(animationFrame)
})

const keyHighlights = [
  { title: 'Sécurité avant tout', text: 'Une formation tournée vers de bons réflexes et une conduite responsable.' },
  { title: 'Code en salle', text: 'Des cours avec échanges pour mieux comprendre les règles et progresser.' },
  { title: 'Accompagnement personnalisé', text: 'Un suivi humain, au plus près de votre rythme et de vos besoins.' },
]

const formations = [
  {
    title: 'Permis B — 20 heures',
    price: '1 550 €',
    items: [
      'Frais administratif + kit pédagogique : 150 €',
      'Code en salle : 40 €',
      'Évaluation de départ : 40 €',
      '20 h de conduite : 1 200 €',
      'Frais d’accompagnement à l’examen de conduite : 60 €',
    ],
  },
  {
    title: 'Permis B / Conduite supervisée',
    price: '1 670 €',
    items: [
      'Permis B 20 heures : 1 550 €',
      '1 rendez-vous préalable (2 h pratique avec accompagnateur obligatoire) : 120 €',
      'Option : bilan de compétences avant examen : 120 €',
    ],
  },
  {
    title: 'Permis B / Conduite accompagnée (AAC)',
    price: '1 870 €',
    items: [
      'Permis B 20 heures : 1 550 €',
      '1 rendez-vous préalable avec accompagnateur obligatoire : 120 €',
      'Bilan des 6 mois / 1000 km minimum, avec accompagnateur : 120 €',
      'Bilan des 1 an / 3000 km et 2 ans de théorie, avec accompagnateur : 100 €',
      'Obligatoire : 1 h de conduite + 2 h de théorie : 100 €',
    ],
  },
]

const officeHours = [
  { day: 'Lundi', time: '18h à 19h30' },
  { day: 'Mercredi', time: '18h à 19h30' },
  { day: 'Samedi', time: '9h à 12h' },
]

const codePrices = [
  { label: 'Livre de code', price: '15 €' },
  { label: 'Pack code : salle + internet (valable 6 mois) + livre de code offert', price: '100 €' },
  { label: 'Forfait code en salle valable 1 an', price: '50 €' },
  { label: 'Accès internet code en ligne (valable 6 mois)', price: '60 €' },
  { label: 'Redevance à l’examen du code directement sur les sites agréés', price: '30 €' },
  { label: 'Forfait séance de code en salle le samedi matin (pour toutes personnes titulaires du permis de conduire de +10 ans)', price: '20 €' },
]

const unitPrices = [
  { label: 'Frais de dossier', price: '100 €' },
  { label: 'Frais de dossier (dossier venant d’une autre auto-école ou candidat libre examen du code)', price: '100 €' },
  { label: 'Fournitures pédagogiques (livret numérique, livret de vérif, livret pédagogique)', price: '50 €' },
  { label: 'Évaluation de départ', price: '40 €' },
  { label: 'Heure de conduite', price: '60 €' },
  { label: 'Frais d’accompagnement à l’examen pratique', price: '60 €' },
  { label: 'Demande de permis sur ANTS', price: '30 €' },
  { label: 'Représentation à l’examen du permis', price: '60 €' },
  { label: 'Relance et traitement des impayés', price: '20 €' },
]

const conditionsExam = [
  'Examen blanc réussi à la fin de toutes les formations.',
  'Pour la conduite AAC, cet examen s’effectue après le 2ème bilan de conduite.',
]

const conditionsPayment = [
  'À l’inscription : 290 €',
  'Toutes les 6 heures de conduite : 360 €',
  'Le solde final doit être réglé avant le passage de l’examen de conduite.',
  'Toute leçon non décommandée 48 h à l’avance, sauf présentation d’un certificat médical, sera due.',
]
</script>

<template>
  <div>
    <header class="site-header">
      <div class="container header-inner">
        <a href="#accueil" class="brand" @click="selectSection('accueil')"><img src="/images/logo.jpg" alt="Objectif Permis — En route pour l'avenir" /></a>
        <button class="menu-toggle" type="button" :aria-expanded="menuOpen" aria-controls="site-nav" @click="menuOpen = !menuOpen">☰ <span class="sr-only">Ouvrir le menu</span></button>
        <nav id="site-nav" :class="{ open: menuOpen }" aria-label="Navigation principale">
          <a
            v-for="item in navigation"
            :key="item.id"
            :href="`#${item.id}`"
            class="nav-link"
            :class="{ 'is-active': activeSection === item.id }"
            :aria-current="activeSection === item.id ? 'location' : undefined"
            @click="selectSection(item.id)"
          >{{ item.label }}</a>
        </nav>
        <a class="button button-small header-call" href="tel:+33651143236">06 51 14 32 36</a>
      </div>
    </header>

    <main id="accueil">
      <section class="hero">
        <div class="container hero-content">
          <div class="eyebrow"><span></span> Auto-école à Sainte-Maure-de-Touraine</div>
          <h1>Apprendre à conduire,<br /><em>apprendre à être responsable.</em></h1>
          <p>Chez Objectif Permis, nous formons des conducteurs sûrs, responsables et conscients des enjeux de la sécurité routière.</p>
          <div class="hero-actions">
            <a class="button" href="#formations">Découvrir nos forfaits <span aria-hidden="true">→</span></a>
            <a class="button button-outline" href="#contact">Nous contacter</a>
          </div>
        </div>
        <div class="hero-accent" aria-hidden="true"></div>
      </section>

      <section id="horaires" class="hours-band">
        <div class="container hours-inner">
          <div>
            <p class="section-kicker">Horaires de l'agence</p>
            <h2>Le bureau vous accueille :</h2>
          </div>
          <div class="hours-cards">
            <article v-for="row in officeHours" :key="row.day" class="hour-card">
              <span>{{ row.day }}</span>
              <strong>{{ row.time }}</strong>
            </article>
          </div>
          <div class="hours-contact-quick">
            <a href="tel:+33651143236">06 51 14 32 36</a>
            <small>Par téléphone, par mail ou pendant les horaires du bureau</small>
          </div>
        </div>
      </section>

      <section id="approche" class="section container intro">
        <p class="section-kicker">Notre approche</p>
        <h2>Votre réussite passe d’abord par la sécurité.</h2>
        <p class="lead">L’équipe place la sécurité au cœur de son enseignement et propose notamment des cours de code en salle, favorisant les échanges et un accompagnement personnalisé.</p>
        <div class="features">
          <article v-for="item in keyHighlights" :key="item.title">
            <span class="feature-icon">✦</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </article>
        </div>
      </section>

      <section id="formations" class="section light-section">
        <div class="container">
          <p class="section-kicker">Nos forfaits</p>
          <h2>Des formules détaillées et transparentes.</h2>
          <div class="package-grid">
            <article v-for="item in formations" :key="item.title" class="package-card">
              <div class="package-head">
                <h3>{{ item.title }}</h3>
                <strong>{{ item.price }}</strong>
              </div>
              <ul>
                <li v-for="detail in item.items" :key="detail">{{ detail }}</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <PhotoGallery />

      <section id="tarifs" class="section container rates-section">
        <div class="rates-main">
          <div>
            <p class="section-kicker">Code & prestations</p>
            <h2>Les autres tarifs utiles.</h2>
            <p class="section-intro">Les forfaits ci-dessus restent les plus importants. Voici, à titre d’information, les tarifs unitaires et complémentaires figurant sur le dépliant.</p>
          </div>
          <div class="rate-columns">
            <article class="minor-card">
              <h3>Nos tarifs code</h3>
              <div class="price-list">
                <div v-for="item in codePrices" :key="item.label" class="price-row">
                  <span>{{ item.label }}</span>
                  <strong>{{ item.price }}</strong>
                </div>
              </div>
            </article>
            <article class="minor-card muted-card">
              <h3>Tarif unitaire & autres prestations</h3>
              <div class="price-list compact">
                <div v-for="item in unitPrices" :key="item.label" class="price-row">
                  <span>{{ item.label }}</span>
                  <strong>{{ item.price }}</strong>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div class="conditions-grid">
          <article class="condition-card">
            <p class="section-kicker">Conditions</p>
            <h3>Conditions de l’examen</h3>
            <ul>
              <li v-for="item in conditionsExam" :key="item">{{ item }}</li>
            </ul>
          </article>
          <article class="condition-card soft">
            <p class="section-kicker">Règlement</p>
            <h3>Conditions de règlement</h3>
            <ul>
              <li v-for="item in conditionsPayment" :key="item">{{ item }}</li>
            </ul>
          </article>
        </div>

        <p class="note">Tarifs et conditions repris depuis le dépliant transmis. À faire valider par l’auto-école avant mise en ligne définitive.</p>
      </section>

      <DocumentChecklist />

      <section id="contact" class="section contact-section">
        <div class="container contact-grid">
          <div>
            <p class="section-kicker">Contact</p>
            <h2>Une question ? Contactez-nous.</h2>
            <p>Objectif Permis vous répond par téléphone, par e-mail ou directement pendant les horaires d’ouverture du bureau.</p>
            <div class="contact-buttons">
              <a class="button" href="tel:+33651143236">Nous appeler</a>
              <a class="button button-dark" href="mailto:objectifpermis37@gmail.com">Écrire un e-mail</a>
            </div>
          </div>
          <div class="contact-card">
            <h3>Objectif Permis</h3>
            <p>46 place du Maréchal-Leclerc<br />37800 Sainte-Maure-de-Touraine</p>
            <p><a href="tel:+33651143236">06 51 14 32 36</a><br /><a href="mailto:objectifpermis37@gmail.com">objectifpermis37@gmail.com</a></p>
            <p class="contact-meta">SIRET 102 613 007 00016<br />Agrément E 26 037 0001 0</p>
            <a href="https://www.google.com/maps/search/?api=1&query=46+Place+du+Marechal+Leclerc+37800+Sainte+Maure+de+Touraine" target="_blank" rel="noopener">Voir l’itinéraire ↗</a>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <div class="container footer-inner"><span>© Objectif Permis — En route pour l'avenir</span><span>Facebook · Instagram · Business Suite</span></div>
      <p class="container legal-note">POC : prévoir les mentions légales, la politique de confidentialité, le règlement intérieur et les informations réglementaires avant publication publique.</p>
    </footer>
  </div>
</template>
