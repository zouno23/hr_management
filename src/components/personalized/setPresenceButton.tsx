"use client";

import { type employeeDay } from "@prisma/client";
import { Button } from "../ui/button";
import moment from "moment";
import { setPresence } from "@/queries/employeeDay";
import { useEffect, useRef } from "react";

export default function SetPresence({today,UserId}:{today:employeeDay | null | undefined,UserId:string}) {
    const now =moment().format("HH:mm:ss")
    const buttonRef= useRef<HTMLButtonElement | null>(null)
    const update = {label:"", value:{}}
    if(!today!.checkInTime){
        update.label ="set check In"
        update.value = {checkInTime:now}
    }else if (!today!.PauseTimeOut){
        update.label ="set pause leave time"
        update.value = {PauseTimeOut:now}
    }else if (!today!.ComeBackTime){
        update.label = "set come back time"
        update.value = {ComeBackTime:now}
    }else if (!today!.LeaveTime){
        update.label = "set leave time"
        update.value = {LeaveTime:now}
    }else{
        update.label = "See you tomorrow"
    }

    useEffect(()=>{
        fetch('https://ipinfo.io/json?token=c73720061388c6')
  .then(response => response.json())
  .then((data:{ip:string}) => {
    const userIP = data.ip;
    console.log(userIP)
    const companyIPRange = '196.203.216.'; // Example IP range
    if (userIP.startsWith(companyIPRange)) {
      buttonRef.current!.disabled = false;
    } else {
      buttonRef.current!.disabled = true;
    }
  })
  .catch(error => console.error('Error fetching IP:', error));
    },[])
  
    return (
        <form action={async()=>{
            try {
                await setPresence(today!.day ,UserId , update.value)
            } catch (error) {
                
            }
        }}>
            <Button type="submit" ref={buttonRef} className="text-4xl font-bold p-8">{update.label}</Button>
        </form>
);
}
