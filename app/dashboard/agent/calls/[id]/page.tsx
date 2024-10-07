'use client'

import CallLogs from "@/domains/calls/Logg";
import { useParams } from "next/navigation";

const CallLogsPage = () => {
  const { id } = useParams();
  console.log("id:", id)
  return (
      <CallLogs id={id.toString()} />
  )
}

export default CallLogsPage
