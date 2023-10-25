import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { UiProvider } from "../providers/UiProvider";
import { ToastContainer } from "react-toastify";
import { TanstackProvider } from "../providers/TanStackProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TODO App",
  description: "Simple TODO App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <TanstackProvider>
          <UiProvider>
            <ToastContainer autoClose={1000} />
            <main className="p-8">{children}</main>
          </UiProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
