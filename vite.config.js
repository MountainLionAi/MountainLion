import { defineConfig } from 'vite'
import { resolve } from "path";
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'
function pathResolve(dir) {
  return resolve(__dirname, ".", dir);
}
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    viteCompression({
      verbose: true,   
      disable: false,  
      threshold: 1024 * 10,  
      algorithm: 'gzip', 
      ext: '.gz'
    })
  ],
  resolve: {
    alias: {
      "/@": pathResolve("src"),
    }
  },
  define:{
    'process.env': {
      
    }
  },
  optimizeDeps: {
    include: ['axios'],
  },
  base:'./',
  build: {
    publicDir: '',
    target: 'modules',
    outDir: 'dist', 
    assetsDir: 'assets',
    minify: 'terser', 
    rollupOptions: {
      output: {
          assetFileNames: 'static/[ext]/[name].[hash].[ext]',
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vandor'
            }
          }
        }
    }
  },
  server: {
    host: 'localhost',
    cors: true, 
    open: true, 
    proxy: {
        '/api': {
            target: 'http://192.168.99.223:3000',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
