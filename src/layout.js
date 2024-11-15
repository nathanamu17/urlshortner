import "./globals.css";
import { Inter } from "next/font/google";

// Import the Inter font once
const inter = Inter({ subsets: ["latin"] });

// Metadata to set title and description for the app
export const metadata = {
  title: "Next.js App",
  description: "A Next.js app generated using create-next-app",
};

// RootLayout component with children as the main content
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
