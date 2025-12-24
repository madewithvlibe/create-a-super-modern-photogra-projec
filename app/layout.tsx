import type { Metadata } from 'next';
import './globals.css';
import { initializeDatabase } from '@/lib/db-setup';
import '@/lib/vlibe-edit-mode';

// Initialize database on server start (runs once)
if (typeof window === 'undefined') {
  initializeDatabase().catch(console.error);
}

export const metadata: Metadata = {
  title: 'DP Studio - Photography',
  description: 'Modern photography portfolio showcasing creative vision',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
