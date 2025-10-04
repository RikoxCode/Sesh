import { createRootRoute, Outlet } from '@tanstack/react-router';
import Sidebar from '../components/sidebar/sidebar';
import NotFoundView from '../views/NotFoundView';

export const Route = createRootRoute({
  component: AuthenticatedLayout,
  notFoundComponent: NotFoundWithSidebar,
});

function AuthenticatedLayout() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="relative ml-16">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function NotFoundWithSidebar() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="relative ml-16">
        <div className="p-6">
          <NotFoundView />
        </div>
      </main>
    </div>
  );
}
