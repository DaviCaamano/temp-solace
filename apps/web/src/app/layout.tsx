import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '../styles/global.css';
import { droidFont, montserratFont } from '@fonts/index';
import { Providers } from '@components/providers/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Notes from Solace',
  description: 'Whether it\'s Starting your next best seller, battling with writers block, finding inspiration for ' +
      'the gaming table, with our AI assistant, all you need are a few notes from Solace.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <html
        lang='en'
        className={`${droidFont.variable} ${montserratFont.variable} ${droidFont.className} ${montserratFont.className}`}
      >
        <body className={inter.className}>{children}</body>
      </html>
    </Providers>
  );
}
