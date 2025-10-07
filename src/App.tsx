// Copyright © 2025 Rawat Innovations Private Limited. All rights reserved.

import { Suspense, lazy } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import MainLayout from './layouts/MainLayout';

// Lazy load pages for better performance
const Index = lazy(() => import('./pages/Index'));
const Discover = lazy(() => import('./pages/discover'));
const Community = lazy(() => import('./pages/Community'));
const Events = lazy(() => import('./pages/Events'));
const Profile = lazy(() => import('./pages/Profile'));
const NotFound = lazy(() => import('./pages/NotFound'));
const CreateProfile = lazy(() => import('./pages/CreateProfile'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="nearby-connect-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/create-profile" element={<CreateProfile />} />
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Index />} />
                <Route path="discover" element={<Discover />} />
                <Route path="community" element={<Community />} />
                <Route path="events" element={<Events />} />
                <Route path="profile" element={<Profile />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
