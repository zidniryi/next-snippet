import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Code Snippets",
  description: "A modern code snippet manager with Monaco Editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
