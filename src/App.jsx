import { lazy, Suspense } from 'react'
import MainLayout from './layouts/MainLayout.jsx'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import Solutions from './pages/Solutions.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'
import { getAllProjects } from './data/projects/index.js'

// Caricato solo quando si visita /admin: tiene il SDK Firebase (Auth/
// Firestore/Storage) fuori dal bundle e dal prerendering delle pagine
// pubbliche. Vedi src/admin/firebaseClient.js per l'inizializzazione lazy.
const AdminApp = lazy(() => import('./admin/AdminApp.jsx'))

/**
 * Albero delle route. `getStaticPaths` usa i progetti fallback per mantenere
 * compatibilità con il prerendering; nel browser i progetti Firestore sono la
 * fonte di verità e possono includere anche nuovi slug senza una nuova build.
 */
export const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'progetti', element: <Projects /> },
      {
        path: 'progetti/:slug',
        element: <ProjectDetail />,
        // Deve restituire path assoluti (con prefisso /progetti/): vite-react-ssg
        // 0.9.2 non applica il prefisso del segmento statico del genitore agli
        // slug restituiti da getStaticPaths, quindi con soli slug relativi
        // genererebbe file HTML piatti (es. dist/studio-flow.html invece di
        // dist/progetti/studio-flow.html), rompendo gli URL e le anteprime social.
        getStaticPaths: () => getAllProjects().map((project) => `/progetti/${project.slug}`),
      },
      { path: 'soluzioni', element: <Solutions /> },
      { path: 'chi-sono', element: <About /> },
      { path: 'contatti', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: 'admin/*',
    element: (
      <Suspense fallback={null}>
        <AdminApp />
      </Suspense>
    ),
  },
]
