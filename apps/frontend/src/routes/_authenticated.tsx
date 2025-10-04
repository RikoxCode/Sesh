import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router'
import Sidebar from '../components/sidebar/sidebar'
import { RouteKey } from '../components/sidebar/SidebarEnum'

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  const router = useRouterState()
  
  const getActiveRoute = (): RouteKey => {
    const path = router.location.pathname
    if (path === '/') return RouteKey.Dashboard
    // ... weitere Routes
    return RouteKey.Dashboard
  }

  return (
    <div className="min-h-screen">
      <Sidebar 
        active={getActiveRoute()} 
        onNavigate={() => {}} 
      />
      <main className="relative">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}