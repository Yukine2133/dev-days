import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Dev Days",
  description: "Mapping Your Project Journey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} `}>{children}</body>
    </html>
  );
}
