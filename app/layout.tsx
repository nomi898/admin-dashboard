import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Providers from "@/Components/Providers";
import LayoutShell from "@/Components/LayoutShell";
import ThemeRegistry from "@/app/ThemeRegistry";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "hey",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        {/* Remove dev-tool injected attrs (e.g., locatorjs) before hydration */}
        <Script id="strip-devtool-attrs" strategy="beforeInteractive">
          {`
            try {
              const html = document.documentElement;
              if (html && html.hasAttribute('data-locator-target')) {
                html.removeAttribute('data-locator-target');
              }
              if (document.body && document.body.hasAttribute('cz-shortcut-listen')) {
                document.body.removeAttribute('cz-shortcut-listen');
              }
            } catch (e) {
              console.warn('Pre-hydration cleanup failed', e);
            }
          `}
        </Script>
        <ThemeRegistry>
          <Providers>
            <LayoutShell>{children}</LayoutShell>
          </Providers>
        </ThemeRegistry>
      </body>
    </html>
  );
}
