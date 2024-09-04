import { Inter } from "next/font/google";
import "./globals.css";
import BottomBar from "./components/BottomBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Algorithm Visualizer",
    description: "A handy tool.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/images/favicon.ico?v=2" sizes="any" />
            </head>
            <body className={inter.className}>
                {children}
                <BottomBar></BottomBar>
            </body>
        </html>
    );
}
