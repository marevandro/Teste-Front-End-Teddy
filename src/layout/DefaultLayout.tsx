import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="default-layout">
      <Navbar onMenuClick={toggleSidebar} />
      <main className="content-area">
        {children}
      </main>
    </div>
  );
}
