import { AgentData } from "../../agent/types";

type AgentSelectorProps = {
  agents: AgentData[];
  selectedAgent: AgentData | null;
  onAgentChange: (agent: AgentData | null) => void;
}

const AgentSelector = ({
  agents,
  selectedAgent,
  onAgentChange,
}: AgentSelectorProps) => {
  return (
    <div>
      <select
        className="w-full p-2 border rounded-md text-gray-800 bg-white"
        value={selectedAgent?._id}
        onChange={(e) => {
          const agent = agents.find(a => a._id === e.target.value);
          onAgentChange(agent || null);
        }}
      >
        {agents.map((agent) => (
          <option key={agent._id} value={agent._id}>
            {agent.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AgentSelector;
