import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This proxy will redirect any requests starting with /api
    // from your frontend (localhost:5173 by default for Vite)
    // to your backend (localhost:5000, as defined in your backend's index.js)
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Your backend server URL
        changeOrigin: true, // Changes the origin of the host header to the target URL
        // If your backend routes did NOT have /api as a prefix (e.g., if a route was just '/assessments/sensory-profile')
        // then you would need the rewrite rule like this:
        // rewrite: (path) => path.replace(/^\/api/, ''),
        // However, since your backend routes DO have /api (e.g., app.use('/api/assessments', ...)),
        // you typically do NOT need the rewrite rule here.
      },
    },
  },
})