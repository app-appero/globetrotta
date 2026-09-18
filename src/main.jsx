import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './App.jsx'
import './styles/index.css'

export const createRoot = ViteReactSSG({
  routes,
  basename: import.meta.env.BASE_URL,
})
