"use server";

import { db } from "@/server/db";
import moment from "moment";

export const getToday = async (id: string) => {
  try {
    const now = moment().format("MMMM Do YYYY");
    const today = await db.employeeDay.findFirst({
      where: { day: now, UserId: id },
    });
    return today;
  } catch (error) {
    console.log(error);
  }
};

export const startDay = async (id: string) => {
  try {
    const now = moment().format("MMMM Do YYYY");
    const today = await db.employeeDay.create({
      data: {
        day: now,
        user: { connect: { id: id } },
      },
    });
    return today;
  } catch (error) {
    console.log(error);
  }
};

export const setPresence = async (
  today: string,
  UserId: string,
  data: {
    checkInTime?: string;
    PauseTimeOut?: string;
    ComeBackTime?: string;
    LeaveTime?: string;
  },
) => {
  try {
    const now = await db.employeeDay.findFirst({
      where: { day: today, UserId },
    });
    const updated = await db.employeeDay.update({
      data: {
        checkInTime: data.checkInTime
          ? moment().format("HH:mm:ss")
          : now?.checkInTime,
        PauseTimeOut: data.PauseTimeOut
          ? moment().format("HH:mm:ss")
          : now?.PauseTimeOut,
        ComeBackTime: data.ComeBackTime
          ? moment().format("HH:mm:ss")
          : now?.ComeBackTime,
        LeaveTime: data.LeaveTime
          ? moment().format("HH:mm:ss")
          : now?.LeaveTime,
      },
      where: { id: now!.id },
    });
    return updated;
  } catch (error) {
    console.log(error);
  }
};
