import { ClerkProvider } from "@clerk/nextjs";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster" 
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { AddUser, getUserByEmail } from "@/queries/user";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const clerkUser = await currentUser()
  const clerkEmail = clerkUser?.primaryEmailAddress?.emailAddress ?? ""
    if(clerkUser){
       const user = await getUserByEmail(clerkEmail)
        if(!user){
            await AddUser(clerkUser)
        }

    }
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <ClerkProvider>
        <body>
        <Toaster />
          {children}
          </body>
      </ClerkProvider>
    </html>
  );
}
