import React, { useState, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Header from '@/Components/Header/Header';
import Sidebar from '@/Components/Sidebar/Sidebar';
import { ToastContent, ToastWrapper } from '@/Components/Notification/Toast';
import { useLoading } from '@/Context/LoadingContext';
import LoaderScreen from '@/Components/Loader/LoaderScreen';

export default function DashboardLayout({ title, children }) {
  const { loading } = useLoading();
  const { flash } = usePage().props;
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // Initialize sidebar state based on screen width
    return window.innerWidth >= 1024;
  });

  useEffect(() => {
    // Update sidebar state when window is resized
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const { 'toast-success': successMessage, 'toast-error': failedMessage } = flash;

    if (successMessage) ToastContent.success(successMessage);
    if (failedMessage) ToastContent.error(failedMessage);
  }, [flash]);

  return (
    <div className='flex flex-col min-h-screen'>
      <Head title={title} />

      <ToastWrapper />
      {loading && <LoaderScreen />}

      <main className='app'>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className='app__content'>
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className='min-h-screen relative'>
            <div className='content bg-gradient-to-br from-primary to-secondary'>
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
