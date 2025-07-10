import { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "./provider";

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
        <ReactQueryProvider>
          {" "}
          <div>{children}</div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
