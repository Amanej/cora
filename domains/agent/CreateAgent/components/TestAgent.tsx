import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

type TestAgentProps = {
    isEditing: boolean;
    testNumber: string;
    setTestNumber: (value: string) => void;
    handleTestAgent: () => void;
    isLoading: boolean;
}

const TestAgent = ({ isEditing, testNumber, setTestNumber, handleTestAgent, isLoading }: TestAgentProps) => {
    return (
        <div className="space-y-2">
            <Label>Test agent</Label>
            <div className="flex space-x-4">
                {isEditing &&
                    <div className="flex items-center space-x-2">
                        <Input
                            id="phoneNumber"
                            type="tel"
                            placeholder="Test nummber"
                            value={testNumber}
                            onChange={(e) => setTestNumber(e.target.value)}
                        />
                    </div>
                }
                <Button variant="outline"
                    onClick={() => {
                        handleTestAgent()
                    }}
                    disabled={isLoading || !isEditing}
                >Test agent</Button>
            </div>
        </div>
    )
}

export default TestAgent;