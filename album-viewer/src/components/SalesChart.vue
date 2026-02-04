<template>
  <div class="sales-chart">
    <h2>Album Sales Chart</h2>
    <div v-if="loading">Loading chart...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else v-html="chartSvg"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { generateLineChart } from '@/utils/viz';

const chartSvg = ref('');
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    // Assuming the JSON is served from public folder
    const url = '/sales-data.json';
    console.log('Loading chart from:', url);
    const svg = await generateLineChart(url);
    chartSvg.value = svg;
  } catch (err) {
    error.value = 'Failed to load chart';
    console.error('Chart error:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.sales-chart {
  text-align: center;
  margin: 20px;
}

.sales-chart svg {
  max-width: 100%;
  height: auto;
}
</style>