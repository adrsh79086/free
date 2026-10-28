import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'A Little Moonlight Adventure ♡',
  description: 'A tiny night-time adventure, made with love.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
