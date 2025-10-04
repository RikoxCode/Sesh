import { createFileRoute, Outlet } from '@tanstack/react-router';
import Sidebar from '../components/sidebar/sidebar';

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
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
