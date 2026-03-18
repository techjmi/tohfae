import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import ErrorBoundaryProvider from "@/components/providers/ErrorBoundaryProvider";
import StoreProvider from "@/components/providers/StoreProvider";
import { Header } from "@/components/layout/header";
import { buildSeo } from "@/lib/seo/seo";
import { default_seo_constant } from "@/lib/seo/seo.constant";
import Footer from "@/components/layout/footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiClient from "@/services/api/client";
import { ENDPOINT } from "@/services/api/endpoint";
import { mapUserResponse } from "@/services/user/user.mapper";
// import { Bounce } from "react-toastify/dist/animations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const generateMetadata = () => {
  return buildSeo({
    title: default_seo_constant.title,
    description: default_seo_constant.description,
    keywords: default_seo_constant.keywords,
    canonical: default_seo_constant.canonical,
    image: default_seo_constant.image,
    type: default_seo_constant.type,
    author: default_seo_constant.author,
  });
};

/**
 * Fetch user data on server side
 */
async function getUserData() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken');

    if (!accessToken) {
      return null;
    }
    const response = await apiClient.get(ENDPOINT.USER.ME, {
      headers: {
        Cookie: `accessToken=${accessToken.value}`
      }
    });
    return mapUserResponse(response);
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
}
export default async function RootLayout({ children }) {
  const userData = await getUserData();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <StoreProvider initialUser={userData}>
          <ErrorBoundaryProvider>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              style={{ zIndex: 10000 }}
              // transition={Bounce}
            />
            <Header />
            <main>{children}</main>
            <Footer />
          </ErrorBoundaryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
