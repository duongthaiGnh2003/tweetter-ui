import { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "./provider";
import ReduxProvider from "./ReduxProvider";

export const metadata: Metadata = {
  title: "X. It's what's happening / X",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <ReduxProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
