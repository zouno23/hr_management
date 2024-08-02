import Clock from "@/components/personalized/Clock";
import SetPresence from "@/components/personalized/setPresenceButton";
import { getToday, startDay } from "@/queries/employeeDay";
import { getUserByEmail } from "@/queries/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export default async function HomePage() {
  const clerkUser = await currentUser()
  const user = await getUserByEmail(clerkUser?.primaryEmailAddress?.emailAddress ??"")
  if(user?.role === "admin") redirect("/admin")
  let today = await getToday(user!.id)
  if(!today){
     today = await startDay(user!.id)
  }  

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          SW <span className="text-[hsl(280,100%,70%)]">HR</span> Management App
        </h1>
        <div className="grid grid-cols-1 gap-4  place-content-center md:gap-8">
        <SetPresence today={today} UserId={user?.id ?? ""}/>
        </div>
      </div>
      <Clock/>
    </main>
  );
}
