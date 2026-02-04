// Test script for viz.ts
import { generateSalesChart } from './src/utils/viz.ts';

// Beispiel-Daten
const data = [
  { year: 2023, month: 1, price: 10.99, sold: 100 },
  { year: 2023, month: 2, price: 10.99, sold: 150 },
  { year: 2023, month: 3, price: 10.99, sold: 200 },
  { year: 2024, month: 1, price: 12.99, sold: 120 },
  { year: 2024, month: 2, price: 12.99, sold: 180 }
];

const svg = generateSalesChart(data);
console.log(svg);