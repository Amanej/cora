import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Variable } from "@/domains/agent/utils";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";

type TestAgentProps = {
    isEditing: boolean;
    testNumber: string;
    setTestNumber: (value: string) => void;
    handleTestAgent: (testValues: Record<string, string>) => void;
    variables: Variable[];
    isLoading: boolean;
}

type TestAgentDialogProps = {
    variables: Variable[];
    isLoading: boolean;
    handleTestAgent: (testValues: Record<string, string>) => void;
    isEditing: boolean;
}
const TestAgentDialog = ({ variables, isLoading, handleTestAgent, isEditing }: TestAgentDialogProps) => {
    const [open, setOpen] = useState(false);
    const [testValues, setTestValues] = useState<Record<string, string>>(() => {
        // Initialize with default values for each variable
        const initialValues: Record<string, string> = {};
        variables.forEach(variable => {
            initialValues[variable.name] = `Test value for ${variable.name}`;
        });
        return initialValues;
    });

    const handleInputChange = (key: string, value: string) => {
        setTestValues(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleTest = () => {
        // Pass the complete testValues object to the test function
        handleTestAgent(testValues);
        setOpen(false);
        console.log("Test values:", testValues); // For debugging
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full" 
                    disabled={!isEditing}
                >
                    <PlusCircle className="h-5 w-5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white text-gray-800" aria-describedby="Enter variables to test the agent">
                <DialogHeader>
                    <DialogTitle>Test Agent with Variables</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {variables.map((variable) => (
                        <div key={variable.name} className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor={variable.name} className="text-right">
                                {variable.name}
                            </Label>
                            <Input
                                id={variable.name}
                                className="col-span-3"
                                value={testValues[variable.name]}
                                onChange={(e) => handleInputChange(variable.name, e.target.value)}
                                placeholder={`Test value for ${variable.name}`}
                            />
                        </div>
                    ))}
                    <div className="flex justify-end mt-4">
                        <Button 
                            onClick={handleTest}
                            disabled={isLoading}
                        >
                            Test Agent
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const TestAgent = ({ isEditing, testNumber, setTestNumber, handleTestAgent, isLoading, variables }: TestAgentProps) => {
    return (
        <div className="space-y-2">
            <Label>Test agent</Label>
            <div className="flex space-x-4">
                {isEditing &&
                    <div className="flex items-center space-x-2">
                        <Input
                            id="phoneNumber"
                            type="tel"
                            placeholder="Test number"
                            value={testNumber}
                            onChange={(e) => setTestNumber(e.target.value)}
                        />
                    </div>
                }
                <Button variant="outline"
                    onClick={() => {
                        handleTestAgent({})
                    }}
                    disabled={isLoading || !isEditing || !testNumber.length}
                >Test agent</Button>
                
                <TestAgentDialog 
                    variables={variables}
                    isLoading={isLoading}
                    handleTestAgent={handleTestAgent}
                    isEditing={isEditing}
                />
            </div>
        </div>
    )
}

export default TestAgent;