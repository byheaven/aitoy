import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TabBar from './components/layout/TabBar';
import LoadingSpinner from './components/common/LoadingSpinner';

const Community = lazy(() => import('./pages/Community'));
const Creation = lazy(() => import('./pages/Creation'));
const Production = lazy(() => import('./pages/Production'));

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="flex-1 pb-20 overflow-y-auto">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Navigate to="/community" replace />} />
            <Route path="/community" element={<Community />} />
            <Route path="/creation" element={<Creation />} />
            <Route path="/production" element={<Production />} />
          </Routes>
        </Suspense>
      </main>
      <TabBar />
    </div>
  );
};

export default App;