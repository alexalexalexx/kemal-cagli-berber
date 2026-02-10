import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kemal Çağlı | Berber",
  description: "Profesyonel berber hizmeti. Saç kesimi, sakal ve cilt bakımı. Online randevu alın.",
  keywords: "berber, kuaför, saç kesimi, sakal, istanbul",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
