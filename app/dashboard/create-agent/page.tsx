import { Suspense } from "react";
import CreateEditAgent from "@/domains/agent/CreateAgent/CreateEditAgent";

const CreateEditAgentPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateEditAgent />
    </Suspense>
  )
}

export default CreateEditAgentPage
