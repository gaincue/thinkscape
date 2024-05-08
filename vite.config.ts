import react from "@vitejs/plugin-react-swc"
import { visualizer } from "rollup-plugin-visualizer"
import { PluginOption, defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer() as PluginOption],
  server: {
    host: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes(".pnpm/three")) {
            return "@three"
          }

          if (id.includes("rapier3d")) {
            return "@rapier3d"
          }
        },
      },
    },
  },
})
