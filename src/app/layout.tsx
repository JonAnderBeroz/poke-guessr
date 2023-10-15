import {createContext} from "vm";
import "./globals.css";
import type {Metadata} from "next";
import {DifficultyProvider} from "@/providers/difficulty-provider";

export const metadata: Metadata = {
  title: "PokeGuessr",
  description: "Juego de adivinar el pokemon",
};

const testContext = createContext();
export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="grid place-content-center h-screen w-screen p-4">
        <DifficultyProvider>{children}</DifficultyProvider>
      </body>
    </html>
  );
}
