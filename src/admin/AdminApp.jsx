import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { AuthProvider } from './AuthProvider.jsx'
import RequireAuth from './RequireAuth.jsx'
import AdminLayout from './AdminLayout.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProjectsList from './pages/ProjectsList.jsx'
import ProjectForm from './pages/ProjectForm.jsx'
import ContentEditor from './pages/ContentEditor.jsx'

export default function AdminApp() {
  return (
    <AuthProvider>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="progetti" element={<ProjectsList />} />
          <Route path="progetti/nuovo" element={<ProjectForm mode="create" />} />
          <Route path="progetti/:id" element={<ProjectForm mode="edit" />} />
          <Route path="contenuti/:blockId" element={<ContentEditor />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
