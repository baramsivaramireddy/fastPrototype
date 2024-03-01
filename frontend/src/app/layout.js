import { Inter } from "next/font/google";
import "./global.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "boiler plate code",
  description: "usefull for fast prototyping .. ",
};



import Layout from "./components/Layout";
import Providers from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">

  
    <body className={inter.className}>
    

    <Providers>
    <Layout>

    {children}
    </Layout>
  




    </Providers>
    </body>

    </html>
  );
}
