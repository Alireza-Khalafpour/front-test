import type { Metadata } from "next";
import "./globals.css";
import { AppWrapper } from "@/utils/AppWrapper";

export const metadata: Metadata = {
  title: "تست فرانت",
  description: "frontend NextJs app auth test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
