import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IndustryStandard } from "@/domains/agent/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
    industryStandard: IndustryStandard;
    setIndustryStandard: (industryStandard: IndustryStandard) => void;
}

const IndustryStandardDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-4 w-4 hover:bg-transparent">
                    <InfoIcon className="h-4 w-4" />    
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
                <DialogHeader  className="text-black">
                    <DialogTitle>Industry Best Practices Analysis</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Select an industry standard to analyze calls against specific regulatory requirements and best practices. This helps ensure compliance and quality in regulated industries like financial services.
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}
const BestPractices = ({ industryStandard, setIndustryStandard }: Props) => {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Industry Best Practices Analysis</Label>
              <IndustryStandardDialog />
            </div>
            <Select 
                value={industryStandard} 
                onValueChange={(value) => setIndustryStandard(value as IndustryStandard)}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an industry standard" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={IndustryStandard.None}>None</SelectItem>
                    <SelectItem value={IndustryStandard.ConsumerDutyUK}>Consumer Duty - UK</SelectItem>
                    <SelectItem value={IndustryStandard.FDCPAUS}>FDCPA - US</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

export default BestPractices;