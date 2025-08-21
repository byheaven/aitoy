import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import TabBar from './components/layout/TabBar';
import LoadingSpinner from './components/common/LoadingSpinner';
import { LandingPage } from './pages/LandingPage';

const Community = lazy(() => import('./pages/Community'));
const Creation = lazy(() => import('./pages/Creation'));
const Production = lazy(() => import('./pages/Production'));

const AppLayout: React.FC = () => {
  const location = useLocation();
  
  // Check if current route is a landing page route
  const isLandingPage = ['/landing', '/zh', '/en', '/'].includes(location.pathname);

  return (
    <div className={`flex flex-col min-h-screen ${
      isLandingPage 
        ? 'bg-black' // Dark background for landing page
        : 'bg-gradient-to-br from-gray-50 to-gray-100' // Original app background
    }`}>
      <main className={`flex-1 overflow-y-auto ${
        isLandingPage ? '' : 'pb-20' // No bottom padding for landing page
      }`}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Landing page routes */}
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/zh" element={<LandingPage />} />
            <Route path="/en" element={<LandingPage />} />
            
            {/* Root path shows landing page */}
            <Route path="/" element={<LandingPage />} />
            
            {/* App routes */}
            <Route path="/community" element={<Community />} />
            <Route path="/creation" element={<Creation />} />
            <Route path="/production" element={<Production />} />
          </Routes>
        </Suspense>
      </main>
      
      {/* Only show TabBar for app routes, not landing page */}
      {!isLandingPage && <TabBar />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppLayout />
    </LanguageProvider>
  );
};

export default App;