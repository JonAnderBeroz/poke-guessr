import "./globals.css";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "PokeGuessr",
  description: "Juego de adivinar el pokemon",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="grid place-content-center h-screen w-screen">{children}</body>
    </html>
  );
}
