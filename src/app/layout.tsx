import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import "./globals.css";

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DanishPress - Premium Wedding Invitation Cards",
  description:
    "Discover beautiful wedding invitation cards for Hindu and Muslim ceremonies. Premium quality printing with customization options. Trusted by 1000+ happy couples.",
  keywords: [
    "wedding cards",
    "invitation cards",
    "hindu wedding cards",
    "muslim wedding cards",
    "nikah cards",
    "premium wedding invitations",
    "printing shop",
    "custom wedding cards",
  ],
  authors: [{ name: "DanishPress" }],
  openGraph: {
    title: "DanishPress - Premium Wedding Invitation Cards",
    description:
      "Discover beautiful wedding invitation cards for Hindu and Muslim ceremonies. Premium quality printing with customization options.",
    type: "website",
    siteName: "DanishPress",
  },
  twitter: {
    card: "summary_large_image",
    title: "DanishPress - Premium Wedding Invitation Cards",
    description: "Beautiful wedding invitation cards for Hindu and Muslim ceremonies.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans bg-white">
        <Header />
        <main className="min-h-screen pb-24 md:pb-0">{children}</main>
        <BottomNav />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#0f172a",
              color: "#fff",
              borderRadius: "16px",
              padding: "16px 24px",
              fontSize: "14px",
              fontWeight: "500",
            },
            success: {
              iconTheme: {
                primary: "#14b8a6",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ff6b4a",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
