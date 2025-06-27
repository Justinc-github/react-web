import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "markdown-raw-loader",
      enforce: "pre",
      transform(code, id) {
        if (id.endsWith(".md")) {
          return `export default ${JSON.stringify(code)}`;
        }
      },
    },
  ],
});
