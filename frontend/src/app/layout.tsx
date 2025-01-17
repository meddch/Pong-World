import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ContextsProviders from "@/contexts/Providers";
import Navbar from "@/Components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactQueryProvider } from "./react-query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextsProviders>
          <ToastContainer className={"mt-16"} />
          <ReactQueryProvider>{children}</ReactQueryProvider>
          <div id="navbar"></div>
        </ContextsProviders>
      </body>
    </html>
  );
}
