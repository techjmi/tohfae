import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ErrorBoundaryProvider from "@/components/providers/ErrorBoundaryProvider";
import StoreProvider from "@/components/providers/StoreProvider";
import { Header } from "@/components/layout/header";
import { buildSeo } from "@/lib/seo/seo";
import { DEFAULT_SEO } from "@/lib/seo/seo.constant";
import Footer from "@/components/layout/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const generateMetadata = () => {
  buildSeo({
    title: DEFAULT_SEO.title,
    description: DEFAULT_SEO.description,
    keywords: DEFAULT_SEO.keywords,
    canonical: DEFAULT_SEO.canonical,
    image: DEFAULT_SEO.image,
    type: DEFAULT_SEO.type,
    author: DEFAULT_SEO.author,
  });
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <ErrorBoundaryProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </ErrorBoundaryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
