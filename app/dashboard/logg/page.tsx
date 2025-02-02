import CallLogs from "@/domains/calls/Logg";
import { Suspense } from "react";

const CallLogsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallLogs />
    </Suspense>
  )
}

export default CallLogsPage
