# 1. Projekt erstellen (React + TypeScript)
npm create vite@latest frontend -- --template react-ts
cd frontend

# 2. Router und Tailwind installieren
npm install react-router-dom@latest
npm install -D tailwindcss postcss autoprefixer

# 3. Tailwind initialisieren
npx tailwindcss init -p

# 4. Tailwind konfigurieren
echo '/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}' > tailwind.config.js

# 5. Tailwind in CSS aktivieren
echo '@tailwind base;
@tailwind components;
@tailwind utilities;' > src/index.css

# 6. Beispiel Router-Setup im Data-Mode (React Router v6.4+)
mkdir src/routes
echo "import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './routes/Home';
import About from './routes/About';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}" > src/App.tsx

echo 'export default function Home() { return <h1 className="text-3xl font-bold text-blue-600">Home</h1>; }' > src/routes/Home.tsx
echo 'export default function About() { return <h1 className="text-3xl font-bold text-green-600">About</h1>; }' > src/routes/About.tsx

# 7. Starten
npm run dev
