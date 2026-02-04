<template>
  <div class="language-selector">
    <label for="language-select">{{ $t('language.select') }}:</label>
    <select id="language-select" v-model="selectedLanguage" @change="changeLanguage">
      <option value="en">English</option>
      <option value="fr">Français</option>
      <option value="de">Deutsch</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const selectedLanguage = ref(locale.value)

const changeLanguage = () => {
  locale.value = selectedLanguage.value
}

watch(locale, (newLocale) => {
  selectedLanguage.value = newLocale
})
</script>

<style scoped>
.language-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.language-selector label {
  font-size: 0.9rem;
  color: #666;
}

.language-selector select {
  padding: 0.25rem 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  font-size: 0.9rem;
}
</style>