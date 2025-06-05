import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Card Spy',
  description: 'Web app for searching Magic: the Gathering cards',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <link
        rel='search'
        type='application/opensearchdescription+xml'
        href='https://cardspy.nz/opensearch.xml'
        title='Card Spy'
      />
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
