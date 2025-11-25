import localFont from "next/font/local";
import "./globals.css";
import GridPattern from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/Providers/Theme";
import Header from "@/components/Header";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";
import HackerBackground from "@/components/ui/hacker-background";
import BouncingBalls from "@/components/ui/bouncing-balls";
import FallingText from "@/components/ui/falling-text";
import Terminal from "@/components/ui/terminal";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata = {
  title: "Muhammad Adil - Portfolio",
  icons:{
icon: "/logo.png"
  },
  description: "Software Engineering student specializing in Flutter, Django, and AI-powered applications. View my projects, skills, and experience.",
  keywords: "software engineer, mobile developer, flutter developer, django developer, web development, machine learning, Python, Dart, portfolio, Muhammad Adil",
  author: "Muhammad Adil",
  robots: "index, follow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.className} antialiased`}
      >

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <HackerBackground />
          <BouncingBalls />
          <FallingText />
          <Terminal />
          
          <NextTopLoader />
          <Header />

          {children}

          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              className: 'font-semibold backdrop-blur-md text-black rounded-3xl',
            }}
          />

          <GridPattern
            width={200}
            height={200}
            x={-1}
            y={-1}
            className={cn(
              "[mask-image:linear-gradient(to_bottom,white,transparent)]",
            )}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
