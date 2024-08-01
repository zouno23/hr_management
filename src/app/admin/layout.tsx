import { getUserByEmail } from "@/queries/user"
import {  currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"



export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
    const clerkUser = await currentUser()
    const clerkEmail = clerkUser?.primaryEmailAddress?.emailAddress ?? ""
    if(clerkUser){
       const user = await getUserByEmail(clerkEmail)
        if(!user || user.role !="admin"){
            redirect("/")
        }

    }
    return (
        <main>
            {children}
        </main>

  );
}
