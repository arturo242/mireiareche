import { IBM_Plex_Serif } from "next/font/google";
import "../styles/globals.css";
// import Footer from "./footer";

const ibmPlexSerif = IBM_Plex_Serif({ subsets: ["latin"], weight: '400' });

export const metadata = {
  title: "Mireia Reche",
  description: "Portfolio",
};


export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className={ibmPlexSerif.className}>
        {/* <Nav /> */}
        <div id="app">
          {children}
        </div>
          {/* <Footer /> */}
      </body>

      
    </html>
  );
}