import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";
import { Jost } from "next/font/google";
import { Bodoni_Moda } from "next/font/google";
import AuthProvider from "@/components/providers/AuthProvider";
import supabaseServer from "@/utils/supabaseServer";
import { Toaster } from "@/components/ui/Toaster";
import TanstackProvider from "@/components/providers/TanstackProvider";

const jost = Jost({
  variable: "--font-sans",
  subsets: ["latin"],
});
const bodoni_moda = Bodoni_Moda({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata = {
  title: "Home",
  description: "Homepage of Brand.",
};

export default async function RootLayout({ children }) {
  const {
    data: { session },
  } = await supabaseServer().auth.getSession();

  return (
    <html lang="en" className={`${jost.variable} ${bodoni_moda.variable}`}>
      <body>
        <AuthProvider accessToken={session?.access_token}>
          <TanstackProvider>
            <ThemeProvider attribute="class" defaultTheme="light">
              {children}
              <Toaster />
            </ThemeProvider>
          </TanstackProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
