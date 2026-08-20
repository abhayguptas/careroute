import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CareRoute - Local Healthcare Intelligence',
  description:
    'CareRoute turns fragmented public healthcare information into clear, location-aware options you can act on.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
