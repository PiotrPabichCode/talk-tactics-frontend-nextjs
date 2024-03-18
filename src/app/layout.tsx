import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { ReactQueryClientProvider } from '@/lib/react-query-client-provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Navbar } from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang='en' suppressHydrationWarning>
        <body
          className={`${inter.className} h-full bg-gradient-to-b from-slate-900 via-violet-300 to-slate-900`}>
          {/* <Navbar /> */}
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange>
            {children}
          </ThemeProvider>
          <ReactQueryDevtools />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
