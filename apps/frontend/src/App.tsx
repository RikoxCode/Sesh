import Sidebar from './components/sidebar/sidebar';
import { RouteKey } from './components/sidebar/SidebarEnum';
import { useState } from 'react';

export default function App() {
  const [active, setActive] = useState<RouteKey>(RouteKey.Dashboard);

  return (
    <div className="min-h-screen">
      {/* Sidebar liegt über dem Inhalt */}
      <Sidebar active={active} onNavigate={setActive} />

      {/* Main bleibt unverändert, kein Pushen durch Sidebar */}
      <main className="relative">
        <div className="p-6">
          <h1 className="text-2xl font-semibold">Content: {active}</h1>
          <p className="text-sm text-[rgb(var(--muted-foreground))]">
            Die Sidebar überlagert den Inhalt und fährt bei Hover aus.
          </p>
        </div>
      </main>
    </div>
  );
}
