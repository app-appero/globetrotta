import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Workaround per un bug noto di Rolldown (il bundler di Vite 8) che a
    // volte segnala "is not exported by" per export nominali che esistono
    // davvero (es. SITE_URL in src/data/site.js) — vedi
    // https://github.com/rolldown/rolldown/issues/10044. Capita in modo
    // intermittente/dipendente dalla piattaforma; questa opzione dice al
    // bundler di non bloccare la build in quel caso limite.
    rollupOptions: {
      shimMissingExports: true,
    },
  },
})
