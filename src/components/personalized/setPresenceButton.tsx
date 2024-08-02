"use client";

import { type employeeDay } from "@prisma/client";
import { Button } from "../ui/button";
import moment from "moment";
import { setPresence } from "@/queries/employeeDay";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import Loader from "./loader/loader";

export default function SetPresence({
  today,
  UserId,
}: {
  today: employeeDay | null | undefined;
  UserId: string;
}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const now = moment().format("HH:mm:ss");
  const { toast } = useToast();
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const update = { label: "", value: {} };
  if (!today!.checkInTime) {
    update.label = "set check In";
    update.value = { checkInTime: now };
  } else if (!today!.PauseTimeOut) {
    update.label = "set pause leave time";
    update.value = { PauseTimeOut: now };
  } else if (!today!.ComeBackTime) {
    update.label = "set come back time";
    update.value = { ComeBackTime: now };
  } else if (!today!.LeaveTime) {
    update.label = "set leave time";
    update.value = { LeaveTime: now };
  } else {
    update.label = "See you tomorrow";
  }

  useEffect(() => {
    fetch("https://ipinfo.io/json?token=c73720061388c6")
      .then((response) => response.json())
      .then((data: { ip: string }) => {
        const userIP = data.ip;
        const companyIPRange = "196.203.216."; // Example IP range
        buttonRef.current!.disabled = true;
        if (userIP.startsWith(companyIPRange)) {
          buttonRef.current!.disabled = false;
        }
      })
      .catch((e) => {
        setError("disable your adblock to access this website");
      });
  }, []);
  if (error.length > 0) throw new Error(error);
  return (
    <form
      ref={formRef}
      action={async () => {
        try {
          await setPresence(today!.day, UserId, update.value);
          toast({ description: "Presence updated", duration: 2000 });
          router.refresh();
          setLoading(false);
        } catch (error) {
          toast({ description: "an error accured making your presence" });
        }
      }}
    >
      {loading ? (
        <Loader />
      ) : (
        <Button
          type="submit"
          ref={buttonRef}
          onClick={() => {
            setLoading(true);
            formRef.current?.requestSubmit();
          }}
          disabled={update.label === "See you tomorrow" ?? loading}
          className="space-x-2 p-8 text-4xl font-bold"
        >
          {update.label}
        </Button>
      )}
    </form>
  );
}
