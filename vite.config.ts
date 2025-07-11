import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  return {
    plugins: [react()],
    optimizeDeps: {
      include: ['chart.js', 'react-chartjs-2']
    },
  }
})
