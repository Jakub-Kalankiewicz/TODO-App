import type { Metadata } from "next";
import "./globals.css";
import AuthContext from "./context/AuthContext";

export const metadata: Metadata = {
  title: "TODO App",
  description: "TODO App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}
