import type { Metadata } from "next";
import {
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollMenuButton from "@/components/ScrollMenuButton";
import ContactFormWrapper from "@/components/ContactFormWrapper";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-grotesk",
});

export const metadata: Metadata = {
  title: "Mahmudul Hasan — Full Stack Developer",
  description:
    "Full Stack Developer specializing in React.js, Next.js, and the MERN stack. Building responsive, production-ready web applications from Dhaka, Bangladesh.",
  metadataBase: new URL("https://mahmuduls-portfolio.vercel.app"),
  openGraph: {
    title: "Mahmudul Hasan — Full Stack Developer",
    description:
      "Full Stack Developer specializing in React.js, Next.js, and the MERN stack. Building responsive, production-ready web applications from Dhaka, Bangladesh.",
    url: "/",
    siteName: "Mahmudul Hasan",
    type: "website",
    images: [
      {
        url: "/images/mahmudul-portrait.jpg",
        width: 600,
        height: 300,
        alt: "Mahmudul Hasan Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Mahmudul Hasan — Full Stack Developer",
    description:
      "Full Stack Developer specializing in React.js, Next.js, and the MERN stack. Building responsive, production-ready web applications from Dhaka, Bangladesh.",
    images: ["/images/mahmudul-portrait.jpg"],
  },
};

// export const metadata: Metadata = {
//   title: "Mahmudul Hasan — Full Stack Developer",
//   description:
//     "Full Stack Developer specializing in React.js, Next.js, and the MERN stack. Building responsive, production-ready web applications from Dhaka, Bangladesh.",
//   openGraph: {
//     title: "Mahmudul Hasan — Full Stack Developer",
//     description:
//       "Full Stack Developer specializing in React.js, Next.js, and the MERN stack. Building responsive, production-ready web applications from Dhaka, Bangladesh.",
//     url: "https://mahmuduls-portfolio.vercel.app",
//     siteName: "Mahmudul Hasan",
//     images: [
//       {
//         url: "/images/mahmudul-portrait.jpg",
//         width: 1200,
//         height: 630,
//         alt: "Mahmudul Hasan — Full Stack Developer",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Mahmudul Hasan — Full Stack Developer",
//     description:
//       "Full Stack Developer specializing in React.js, Next.js, and the MERN stack. Building responsive, production-ready web applications from Dhaka, Bangladesh.",
//     images: ["/images/mahmudul-portrait.jpg"],
//   },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${sans.variable} ${mono.variable} ${grotesk.variable} font-sans antialiased`}
      >
        <ContactFormWrapper>
          <SmoothScroll>{children}</SmoothScroll>
          <ScrollMenuButton />
        </ContactFormWrapper>
      </body>
    </html>
  );
}
