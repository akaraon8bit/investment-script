// import { Analytics } from "@vercel/analytics/react";
import ToastProvider from "@/components/ToastProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import AuthProvider from "@/components/AuthProvider";
import ClientOnly from "@/components/ClientOnly";

import mongooseConnect from "@/lib/mongoose";
import Company from "@/models/Company";
import nextLogger from "@/constants/logger";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "500", "700"],
  preload: true,
  style: ["italic", "normal"],
});

export async function generateMetadata(): Promise<Metadata> {
  await mongooseConnect();
  const companies = await Company.find<CompanyProps>({});
  const company = companies[0];

  if (!company) nextLogger.info("No Company yet");
  return {
    title: company?.head?.title,
    icons: company?.head?.iconUrl.startsWith("https")
      ? company?.head?.iconUrl
      : company?.head?.iconUrl.replace("http", "https"),
    description: company?.head?.description,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${nunito.className} max-w-[2520px] min-h-screen`}>
          <ClientOnly>
            <ToastProvider />
            {children}
          </ClientOnly>
          {/* <script
            src="//code.tidio.co/apikey"
            async
          ></script> */}
        </body>
      </html>
    </AuthProvider>
  );
}
