import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default ({mode}) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())}; 
  return defineConfig({
    plugins: [react()],
    base: process.env.BASE_URL,
    server:{
      port:3500
    }
  })
  
}