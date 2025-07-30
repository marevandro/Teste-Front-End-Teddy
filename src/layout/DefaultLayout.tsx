import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';

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
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      <main className="content-area">
        {children}
      </main>
    </div>
  );
}
