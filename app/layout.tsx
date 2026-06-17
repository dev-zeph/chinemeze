import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "In Loving Memory of Chief Engineer Godswill Nwosu",
  description:
    "A memorial tribute to Chief Engineer Godswill Nwosu. Share your condolences and celebrate a life well lived.",
  openGraph: {
    title: "In Loving Memory of Chief Engineer Godswill Nwosu",
    description: "A memorial tribute to Chief Engineer Godswill Nwosu.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${lato.variable}`}>
      <body className="min-h-screen antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
