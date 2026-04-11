import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <div className="flex min-h-screen">
        <aside className="fixed top-0 left-0 h-screen w-64 z-50">
          <Sidebar />
        </aside>
        <div className="flex-1 ml-64">
          <Dashboard />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;