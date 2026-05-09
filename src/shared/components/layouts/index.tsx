import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutExample: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 border-b">Header</header>
      <main className="flex-1">{children}</main>
      <footer className="p-4 border-t text-center">Footer</footer>
    </div>
  );
};

export default LayoutExample;
