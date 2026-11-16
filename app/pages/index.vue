<script setup lang="ts">
import { ref } from 'vue'
const menuOpen = ref(false)
const formations = [
  { title: 'Permis B', detail: '20 heures de conduite', price: '1 550 €' },
  { title: 'Conduite supervisée', detail: 'Pour progresser à son rythme', price: '1 670 €' },
  { title: 'Conduite accompagnée', detail: 'AAC', price: '1 870 €' },
]
</script>

<template>
  <div>
    <header class="site-header">
      <div class="container header-inner">
        <a href="#accueil" class="brand"><img src="/images/logo.jpg" alt="Objectif Permis — En route pour l'avenir" /></a>
        <button class="menu-toggle" type="button" :aria-expanded="menuOpen" aria-controls="site-nav" @click="menuOpen = !menuOpen">☰ <span class="sr-only">Ouvrir le menu</span></button>
        <nav id="site-nav" :class="{ open: menuOpen }" aria-label="Navigation principale">
          <a href="#approche" @click="menuOpen = false">Notre approche</a>
          <a href="#formations" @click="menuOpen = false">Formations</a>
          <a href="#tarifs" @click="menuOpen = false">Tarifs</a>
          <a href="#contact" @click="menuOpen = false">Contact</a>
        </nav>
        <a class="button button-small header-call" href="tel:+33651143236">06 51 14 32 36</a>
      </div>
    </header>

    <main id="accueil">
      <section class="hero">
        <div class="container hero-content">
          <div class="eyebrow"><span></span> Auto-école à Sainte-Maure-de-Touraine</div>
          <h1>Apprendre à conduire,<br/><em>apprendre à être responsable.</em></h1>
          <p>Bien plus qu'un permis : une formation humaine, personnalisée et tournée vers la sécurité de tous.</p>
          <div class="hero-actions"><a class="button" href="#formations">Découvrir nos formations <span aria-hidden="true">→</span></a><a class="button button-outline" href="#contact">Nous contacter</a></div>
        </div>
        <div class="hero-accent" aria-hidden="true"></div>
      </section>

      <section id="approche" class="section container intro">
        <p class="section-kicker">Notre philosophie</p>
        <h2>Votre sécurité, notre priorité.</h2>
        <p class="lead">Chez Objectif Permis, nous ne préparons pas seulement à l'examen. Nous formons des conducteurs sûrs, responsables et attentifs aux enjeux de la route.</p>
        <div class="features">
          <article><span class="feature-icon">◇</span><h3>La sécurité avant tout</h3><p>Comprendre les bons réflexes pour conduire avec confiance.</p></article>
          <article><span class="feature-icon">▤</span><h3>Le code en salle</h3><p>Des échanges et des explications pour mieux retenir.</p></article>
          <article><span class="feature-icon">◎</span><h3>Un suivi personnalisé</h3><p>Un accompagnement adapté à votre progression.</p></article>
        </div>
      </section>

      <section id="formations" class="section light-section"><div class="container">
        <p class="section-kicker">Nos formations</p><h2>La route commence ici.</h2>
        <div class="formation-grid"><article v-for="formation in formations" :key="formation.title" class="formation-card"><div class="small-icon">↗</div><h3>{{ formation.title }}</h3><p>{{ formation.detail }}</p><strong>À partir de {{ formation.price }}</strong></article></div>
        <p class="note">Tarifs issus du dépliant fourni : vérifier leur validité et les conditions avant publication définitive.</p>
      </div></section>

      <section id="tarifs" class="section container split-section">
        <div><p class="section-kicker">Transparence</p><h2>Des tarifs clairs, dès le départ.</h2><p>Consultez nos forfaits, les prestations complémentaires et les conditions de règlement dans notre dépliant.</p><a class="button" href="/documents/depliant-tarifs.pdf" target="_blank" rel="noopener">Voir le dépliant tarifaire ↗</a></div>
        <div class="opening-hours"><h3>Horaires du bureau</h3><div><span>Lundi</span><strong>18h – 19h30</strong></div><div><span>Mercredi</span><strong>18h – 19h30</strong></div><div><span>Samedi</span><strong>9h – 12h</strong></div><small>Leçons de conduite sur rendez-vous.</small></div>
      </section>

      <section id="contact" class="section contact-section"><div class="container contact-grid"><div><p class="section-kicker">Parlons de votre projet</p><h2>Prêt à prendre la route ?</h2><p>Nous serons ravis de répondre à vos questions et de vous accompagner vers votre permis.</p><div class="contact-buttons"><a class="button" href="tel:+33651143236">Nous appeler</a><a class="button button-outline" href="mailto:objectifpermis37@gmail.com">Écrire un e-mail</a></div></div><div class="contact-card"><h3>Objectif Permis</h3><p>46 place du Maréchal-Leclerc<br/>37800 Sainte-Maure-de-Touraine</p><p><a href="tel:+33651143236">06 51 14 32 36</a><br/><a href="mailto:objectifpermis37@gmail.com">objectifpermis37@gmail.com</a></p><a href="https://www.google.com/maps/search/?api=1&query=46+Place+du+Marechal+Leclerc+37800+Sainte+Maure+de+Touraine" target="_blank" rel="noopener">Voir l'itinéraire ↗</a></div></div></section>
    </main>
    <footer><div class="container footer-inner"><span>© Objectif Permis — En route pour l'avenir</span><span>SIRET 102 613 007 00016 · Agrément E 26 037 0001 0</span></div><p class="container legal-note">POC : prévoir la page de mentions légales, la politique de confidentialité et les informations réglementaires avant mise en production publique.</p></footer>
  </div>
</template>
