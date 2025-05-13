import '../styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { Toaster } from 'react-hot-toast';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

const GOOGLE_MEET_ICON = 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Google_Meet_icon_%282020%29.svg';


export const metadata: Metadata = {
  title: {
    default: 'Google Meet',
    template: '%s',
  },
  description:
    'Google Meet is a video conferencing platform that allows you to meet with your team, friends, and family.',
  twitter: {
    creator: '@googlemeet',
    site: '@googlemeet',
    card: 'summary_large_image',
  },
  openGraph: {
    url: 'https://meet.google.com',
    images: [
      {
        url: GOOGLE_MEET_ICON,
        width: 124,
        height: 40,
        type: 'image/svg+xml',
      },
    ],
    siteName: 'Google Meet',
  },
  icons: {
    icon: GOOGLE_MEET_ICON,
    apple: GOOGLE_MEET_ICON,
    shortcut: GOOGLE_MEET_ICON,
  },
};  

export const viewport: Viewport = {
  themeColor: '#070707',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ colorScheme: 'light' }}>
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href={GOOGLE_MEET_ICON}
          type="image/svg+xml"
          sizes="any"
        />
      </head>
      <body data-lk-theme="default" className={inter.className}>
        <Toaster />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
