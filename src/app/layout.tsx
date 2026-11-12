import type { Metadata } from "next";
import "./globals.css";
import { PortfolioMotionProvider } from "@/components/portfolio/motion-provider";
import { ProjectSelectionProvider } from "@/components/portfolio/project-selection";
import { AmbientBackground } from "@/components/portfolio/ambient-background";
import { SiteHeader } from "@/components/portfolio/site-header";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { assetPath } from "@/lib/portfolio-assets";

export const metadata: Metadata = {
  metadataBase: new URL("https://yasinzhyper.github.io"),
  title: "Mohammed Yasin Zuhayr — Full-stack & AI Engineer",
  description: "Full-stack products, reliable AI systems, and open-source tools. Explore Mohammed Yasin Zuhayr’s work, experience, and projects.",
  alternates: { canonical: "/Portfolio/" },
  icons: { icon: assetPath("/portfolio/favicon.svg") },
  openGraph: {
    title: "Yasin — Useful products. Reliable systems.",
    description: "Full-stack engineer in Bengaluru. Creator of AlgoAce, schemafit, and ossready.",
    url: "/Portfolio/",
    siteName: "Yasin.dev",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <PortfolioMotionProvider>
          <ProjectSelectionProvider>
            <AmbientBackground />
            <SiteHeader />
            {children}
            <SiteFooter />
          </ProjectSelectionProvider>
        </PortfolioMotionProvider>
      </body>
    </html>
  );
}
