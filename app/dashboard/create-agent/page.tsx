import { Suspense } from "react";
import CreateEditAgent, { SkeletonLoader } from "@/domains/agent/CreateAgent/CreateEditAgent";

const CreateEditAgentPage = () => {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <CreateEditAgent />
    </Suspense>
  )
}

export default CreateEditAgentPage
