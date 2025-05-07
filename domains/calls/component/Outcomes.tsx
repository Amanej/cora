import { Badge } from "@/components/ui/badge";
import { OutcomeCallCell } from "./OutcomeCallCell";
import { User, Phone } from "lucide-react";
import { CallProgress } from "./CallProgress";

interface OutcomeCallCellProps {
    paymentFailed?: boolean;
    paymentMade?: boolean;
    humanWantedToTalk?: boolean;
    wasRightPerson?: boolean;
    wasRightNumber?: boolean;
    isCeaseAndDesist?: boolean;
    isBankruptcy?: boolean;
    isLegalAction?: boolean;
}

export const OutcomesCell: React.FC<OutcomeCallCellProps> = ({
    paymentFailed,
    paymentMade,
    humanWantedToTalk,
    wasRightPerson,
    wasRightNumber,
    isCeaseAndDesist,
    isBankruptcy,
    isLegalAction,  
}) => {
    const isWrongPerson = typeof wasRightPerson === "boolean" && !wasRightPerson;
    const isWrongNumber = typeof wasRightNumber === "boolean" && !wasRightNumber;
    return (
            <div className="flex flex-wrap gap-1">
                {paymentFailed && <Badge variant="destructive">Payment failed</Badge>}
                {paymentMade && <Badge className="bg-green-800">Payment made</Badge>}
                {humanWantedToTalk && <Badge className="bg-blue-500">Wants human</Badge>}
                {wasRightPerson && <Badge className="bg-purple-500" title="Right person"><User className="w-4 h-4" /></Badge>}
                {isWrongPerson && <Badge variant="destructive" title="Wrong person"><User className="w-4 h-4" /></Badge>}
                {wasRightNumber && <Badge className="bg-purple-500" title="Right number"><Phone className="w-4 h-4" /></Badge>}
                {isWrongNumber && <Badge variant="destructive" title="Wrong number"><Phone className="w-4 h-4" /></Badge>}
                <OutcomeCallCell
                    isCeaseAndDesist={isCeaseAndDesist}
                    isBankruptcy={isBankruptcy}
                    isLegalAction={isLegalAction}
                />
            </div>
    );
};

