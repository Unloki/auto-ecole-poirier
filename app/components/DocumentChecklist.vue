<script setup lang="ts">
import { computed, ref } from 'vue'

const documents = [
  { title: "Photocopie recto/verso de la pièce d’identité de l’élève" },
  { title: '4 photos d’identité aux normes ANTS (e-photos obligatoires)' },
  { title: 'JDC ou attestation de recensement', detail: 'Selon l’âge et la situation du candidat.' },
  { title: 'ASSR 1 et 2', detail: 'Selon la situation du candidat.' },
  { title: 'Photocopie recto/verso du permis AM', detail: 'Si le candidat le possède.' },
  { title: 'Adresse e-mail et numéro de téléphone de l’élève' },
  { title: 'Photocopie recto/verso de la pièce d’identité des parents', detail: 'Si le candidat est mineur.' },
  { title: 'Justificatif de domicile de moins de 3 mois' },
  { title: 'Attestation d’hébergement', detail: 'Si applicable.' },
  { title: 'Adresse e-mail et numéro de téléphone des parents', detail: 'Si le candidat est mineur.' },
  { title: 'Règlement à l’inscription : 290 €' },
]

const checked = ref<number[]>([])
const completed = computed(() => checked.value.length)
function toggle(index:number, state:boolean) {
  checked.value = state ? [...checked.value, index] : checked.value.filter(x => x !== index)
}
</script>

<template>
  <section id="inscription" class="section documents-section" aria-labelledby="documents-title">
    <div class="container">
      <p class="section-kicker">Inscription</p>
      <h2 id="documents-title">Constitution du dossier</h2>
      <p class="documents-lead">Retrouve ici les éléments mentionnés dans le dépliant pour préparer ton inscription. Certaines pièces ne s’appliquent qu’aux mineurs ou selon la situation du candidat.</p>
      <div class="documents-layout">
        <div class="document-list">
          <label v-for="(doc, i) in documents" :key="i" class="document-row">
            <input type="checkbox" :checked="checked.includes(i)" @change="toggle(i, ($event.target as HTMLInputElement).checked)" />
            <span>{{ doc.title }}<small v-if="doc.detail">{{ doc.detail }}</small></span>
          </label>
        </div>
        <aside class="document-summary">
          <p class="summary-label">Préparation du dossier</p>
          <strong>{{ completed }} / {{ documents.length }}</strong>
          <p>éléments cochés. Si besoin, l’auto-école pourra te préciser les documents réellement nécessaires selon ton profil.</p>
          <a href="/documents/depliant-tarifs.pdf" target="_blank" rel="noopener">Consulter le dépliant complet ↗</a>
        </aside>
      </div>
      <p class="document-disclaimer">Liste recopiée depuis le dépliant fourni par Objectif Permis. À confirmer avec l’établissement avant publication finale.</p>
    </div>
  </section>
</template>
