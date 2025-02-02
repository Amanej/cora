import CallLogs, { SkeletonLoader } from "@/domains/calls/Logg";
import { Suspense } from "react";

const CallLogsPage = () => {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <CallLogs />
    </Suspense>
  )
}

export default CallLogsPage
