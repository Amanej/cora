import { Badge } from "@/components/ui/badge";
import { OutcomeCallCell } from "./OutcomeCallCell";
import { CallProgress } from "./CallProgress";

interface OutcomeCallCellProps {
    paymentFailed?: boolean;
    paymentMade?: boolean;
    humanWantedToTalk?: boolean;
    isCeaseAndDesist?: boolean;
    isBankruptcy?: boolean;
    isLegalAction?: boolean;
}

export const OutcomesCell: React.FC<OutcomeCallCellProps> = ({
    paymentFailed,
    paymentMade,
    humanWantedToTalk,
    isCeaseAndDesist,
    isBankruptcy,
    isLegalAction,  
}) => {
    return (
        <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
                {paymentFailed && <Badge variant="destructive">Payment failed</Badge>}
                {paymentMade && <Badge className="bg-green-500">Payment made</Badge>}
                {humanWantedToTalk && <Badge className="bg-blue-500">Wants human</Badge>}
                <OutcomeCallCell
                    isCeaseAndDesist={isCeaseAndDesist}
                    isBankruptcy={isBankruptcy}
                    isLegalAction={isLegalAction}
                />
            </div>
        </div>
    );
};

