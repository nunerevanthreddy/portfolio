import React, { useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import NotFound from './pages/NotFound.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Listen for custom SPA state transitions
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const renderPage = () => {
    switch (currentPath) {
      case '/':
      case '/home':
        return <Home />;
      case '/login':
        return <Login />;
      case '/admin':
        return <AdminDashboard />;
      default:
        return <NotFound />;
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        {/* Visual loading sequence */}
        <LoadingScreen />
        {/* Render page based on route state */}
        {renderPage()}
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
