<script setup lang="ts">
import { computed, ref } from 'vue'

// Cinq photos, deux catégories, une seule photo visible à la fois.
// Les quatre images manquantes sont des emplacements : remplacer leurs fichiers
// par les photos originales envoyées par Sandrine et Fred.
const photos = [
  { src: '/images/galerie/voiture-2.jpg', alt: 'Voiture Objectif Permis, deuxième vue', category: 'vehicules' },
  { src: '/images/galerie/voiture-3.jpg', alt: 'Voiture Objectif Permis, troisième vue', category: 'vehicules' },
  { src: '/images/galerie/interieur-1.jpg', alt: 'Intérieur de l’auto-école, première vue', category: 'interieur' },
  { src: '/images/galerie/interieur-2.jpg', alt: 'Intérieur de l’auto-école, deuxième vue', category: 'interieur' },
] as const

const categories = {
  vehicules: {
    title: 'Nos véhicules',
    text: 'Découvrez les véhicules qui vous accompagneront tout au long de votre formation.',
  },
  interieur: {
    title: 'Nos espaces de formation',
    text: 'Un cadre accueillant pour échanger, apprendre le code et préparer votre permis.',
  },
}

const currentIndex = ref(0)
const photo = computed(() => photos[currentIndex.value]!)
const category = computed(() => categories[photo.value.category])
const missingImages = ref<string[]>([])
const isMissing = computed(() => missingImages.value.includes(photo.value.src))
const startTouchX = ref<number | null>(null)

function show(index: number) {
  currentIndex.value = (index + photos.length) % photos.length
}
function previous() { show(currentIndex.value - 1) }
function next() { show(currentIndex.value + 1) }
function markMissing(src: string) {
  if (!missingImages.value.includes(src)) missingImages.value.push(src)
}
function handleTouchStart(event: TouchEvent) {
  startTouchX.value = event.changedTouches[0]?.screenX ?? null
}
function handleTouchEnd(event: TouchEvent) {
  if (startTouchX.value === null) return
  const endX = event.changedTouches[0]?.screenX
  if (endX === undefined) return
  const delta = endX - startTouchX.value
  if (Math.abs(delta) > 50) delta > 0 ? previous() : next()
  startTouchX.value = null
}
</script>

<template>
  <section id="galerie" class="section gallery-section" aria-labelledby="gallery-heading">
    <div class="container">
      <div class="gallery-heading-row">
        <div>
          <p class="section-kicker">En images</p>
          <h2 id="gallery-heading">Découvrez Objectif Permis</h2>
        </div>
        <span class="gallery-count" aria-live="polite">{{ currentIndex + 1 }} / {{ photos.length }}</span>
      </div>

      <div
        class="gallery-carousel"
        role="region"
        aria-roledescription="carrousel"
        aria-label="Photos des véhicules et des locaux"
        tabindex="0"
        @keydown.left.prevent="previous"
        @keydown.right.prevent="next"
        @touchstart.passive="handleTouchStart"
        @touchend.passive="handleTouchEnd"
      >
        <Transition name="gallery-fade" mode="out-in">
          <div :key="photo.src" class="gallery-slide">
            <img
              v-if="!isMissing"
              :src="photo.src"
              :alt="photo.alt"
              loading="lazy"
              @error="markMissing(photo.src)"
            />
            <div v-else class="gallery-fallback" role="img" :aria-label="`Photo à ajouter : ${photo.alt}`">
              <span class="gallery-fallback-brand">OBJECTIF PERMIS</span>
              <span>Photo à ajouter</span>
            </div>
          </div>
        </Transition>

        <button class="gallery-arrow gallery-arrow-prev" type="button" aria-label="Photo précédente" @click="previous">
          <span aria-hidden="true">‹</span>
        </button>
        <button class="gallery-arrow gallery-arrow-next" type="button" aria-label="Photo suivante" @click="next">
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <div class="gallery-bottom">
        <Transition name="gallery-text" mode="out-in">
          <div :key="photo.category" class="gallery-category" aria-live="polite">
            <h3>{{ category.title }}</h3>
            <p>{{ category.text }}</p>
          </div>
        </Transition>
        <div class="gallery-dots" aria-label="Choisir une photo">
          <button
            v-for="(item, index) in photos"
            :key="item.src"
            class="gallery-dot"
            :class="{ 'is-active': index === currentIndex }"
            :aria-label="`Afficher la photo ${index + 1} sur ${photos.length}`"
            :aria-current="index === currentIndex ? 'true' : undefined"
            type="button"
            @click="show(index)"
          />
        </div>
      </div>
    </div>
  </section>
</template>
