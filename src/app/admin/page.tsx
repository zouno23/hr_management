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
import { getEmployeeAttendanceByDay } from "@/queries/employeeDay";
import moment from "moment";
import Link from "next/link";
export type searchParamsType = Record<string, string | string[] | undefined>;
export default async function page({
  searchParams,
}: {
  searchParams: searchParamsType;
}) {
  const today = (searchParams.day as string) ?? moment().format("MMMM Do YYYY");
  const attendance = await getEmployeeAttendanceByDay(today);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <Card className="h-[75dvh] w-[75dvw] bg-white/80 shadow-lg">
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle>Attendance Record {today}</CardTitle>
                <CardDescription>
                  View the attendance details for each employee.
                </CardDescription>
              </div>
              <CalendarForm/>
            </div>
          </CardHeader>
          <CardContent>
            <Table className="text-lg">
              <TableHeader>
                <TableRow>
                  <TableHead>Employee Name</TableHead>
                  <TableHead>Arrival Time</TableHead>
                  <TableHead>Break Start Time</TableHead>
                  <TableHead>Break End Time</TableHead>
                  <TableHead>Departure Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendance?.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <Link
                        href={"/admin/" + employee.UserId}
                        className="font-medium"
                      >
                        {employee.user.name}
                      </Link>
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
