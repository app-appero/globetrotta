import { lazy, Suspense } from 'react'
import MainLayout from './layouts/MainLayout.jsx'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import Solutions from './pages/Solutions.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Privacy from './pages/Privacy.jsx'
import NotFound from './pages/NotFound.jsx'
import RouteErrorBoundary from './components/RouteErrorBoundary.jsx'

// Caricato solo quando si visita /admin: tiene il SDK Firebase (Auth/
// Firestore/Storage) fuori dal bundle e dal prerendering delle pagine
// pubbliche. Vedi src/admin/firebaseClient.js per l'inizializzazione lazy.
const AdminApp = lazy(() => import('./admin/AdminApp.jsx'))

/**
 * I progetti sono caricati da Firestore a runtime. Le route progetto restano
 * dinamiche così una bozza non può finire nell'HTML prerenderizzato.
 */
export const routes = [
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      { path: 'progetti', element: <Projects /> },
      {
        path: 'progetti/:slug',
        element: <ProjectDetail />,
      },
      { path: 'soluzioni', element: <Solutions /> },
      { path: 'chi-sono', element: <About /> },
      { path: 'contatti', element: <Contact /> },
      { path: 'privacy', element: <Privacy /> },
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
    errorElement: <RouteErrorBoundary />,
  },
]
