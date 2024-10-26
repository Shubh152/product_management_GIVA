import "./globals.css";
import { Providers } from "./providers";
import { Montserrat, Noto_Sans, Playfair_Display } from "next/font/google";
import Navbar from "../app/_components/Navbar.jsx";
const mont = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
});

const play = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-play",
});

const noto = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto",
});

export const metadata = {
  title: "Product Management App",
  description: "GIVA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={mont.className}>
        <Providers>

          <div className="bg-mainbg">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
