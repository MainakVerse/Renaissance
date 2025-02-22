import type { Metadata } from 'next';
import { Sora, Space_Grotesk } from 'next/font/google';
import './globals.css';

const soraFont = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: 'variable',
});
const spaceGroteskFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: 'variable',
});

export const metadata: Metadata = {
  title: 'Renaissance',
  description: ' Futuristic Next.js AI Saas Landing Page',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${soraFont.variable} ${spaceGroteskFont.variable} antialiased bg-gray-950 text-gray-300 font-body`}
      >
        {children}
      </body>
    </html>
  );
}
