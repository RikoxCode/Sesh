function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">Welcome to React + TypeScript</h1>
        <p className="text-muted-foreground">Start building your application</p>
        <div className="flex gap-4 justify-center">
          <button className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition">
            Primary
          </button>
          <button className="px-6 py-2 bg-secondary text-white rounded-lg hover:opacity-90 transition">
            Secondary
          </button>
          <button className="px-6 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition">
            Accent
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
