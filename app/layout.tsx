import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Community Skill Index — 开源 Skill 图鉴',
  description: '一个持续更新的开源 Agent Skill 图鉴：发现创作者，浏览真实作品，找到下一次创作的起点。',
  openGraph: {
    title: 'Community Skill Index',
    description: '值得收藏的开源 Agent Skills，持续更新。',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Community Skill Index',
    description: '值得收藏的开源 Agent Skills，持续更新。',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
