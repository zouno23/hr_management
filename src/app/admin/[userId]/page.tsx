import Clock from "@/components/personalized/Clock";
import { CalendarForm } from "@/components/personalized/dateSelector";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAttendanceByEmployee } from "@/queries/employeeDay";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { type searchParamsType } from "../page";
export default async function page({ params,searchParams }: { params: { userId: string },searchParams:searchParamsType }) {
  const attendance = await getAttendanceByEmployee(params.userId);
  const displayedAttendance = !searchParams.day ? attendance : attendance?.filter((day)=>day.day===searchParams.day)
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <Card className="h-[75dvh] w-[75dvw] bg-white/80 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>
                  Attendance Record of {attendance![0]!.user.name}
                </CardTitle>
                <CardDescription>
                  View the attendance details for any employee.
                </CardDescription>
              </div>
              <div className="flex gap-4">
              <CalendarForm/>
              <Link
                href="/admin"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
                >
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Back
              </Link>
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table className="text-lg">
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Arrival Time</TableHead>
                  <TableHead>Break Start Time</TableHead>
                  <TableHead>Break End Time</TableHead>
                  <TableHead>Departure Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedAttendance?.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div className="font-medium">{employee.day}</div>
                    </TableCell>
                    <TableCell>{employee.checkInTime ?? "not yet"}</TableCell>
                    <TableCell>{employee.PauseTimeOut ?? "not yet"}</TableCell>
                    <TableCell>{employee.ComeBackTime ?? "not yet"}</TableCell>
                    <TableCell>{employee.LeaveTime ?? "not yet"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Clock />
      </div>
    </main>
  );
}
