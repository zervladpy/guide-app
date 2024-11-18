import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import {ThemeProvider} from "@/lib/theme/theme-provider";
import {Sidebar, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import PageTopNavigation from "@/components/custom/topbar/page-top-navigation";
import {Dialog} from "@/components/ui/dialog";
import {ProfileHeader} from "@/components/custom/sidebar/components/profile-header";
import {DocumentTree} from "@/components/custom/sidebar/components/document-tree";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Guide App",
    description: "Created for fast and easy documentation",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="es" suppressHydrationWarning>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <ThemeProvider
            attribute={"class"}
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Dialog>
                <SidebarProvider>
                    <Sidebar>
                        <ProfileHeader/>
                        <DocumentTree/>
                    </Sidebar>
                    <section className="flex flex-col w-full">
                        <PageTopNavigation
                            sideNavigationTrigger={<SidebarTrigger/>}
                        />
                        {children}
                    </section>
                </SidebarProvider>
            </Dialog>
        </ThemeProvider>
        </body>
        </html>
    );
}
