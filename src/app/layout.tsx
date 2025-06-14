
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme/theme-provider";

export const metadata: Metadata = {
  title: 'Retaliate CRM',
  description: 'Customer Relationship Management for Cyber Retaliator Solutions',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          defaultTheme="system"
          defaultFontSize={16}
          storageKeyTheme="retaliate-crm-theme"
          storageKeyFontSize="retaliate-crm-font-size"
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

