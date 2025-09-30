import './globals.css';
import type { Metadata } from 'next';
import AppShell from '@/components/AppShell';
import { Providers } from '@/providers';



export const metadata: Metadata = {
  title: 'LivQuiz Admin Dashboard',
  description: 'Admin dashboard for managing LivQuiz educational platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body >
        <Providers>
          <AppShell>
            {children}
          </AppShell>
        </Providers>
      </body>
    </html>
  );
}