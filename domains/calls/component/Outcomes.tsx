import { Badge } from "@/components/ui/badge";
import { OutcomeCallCell } from "./OutcomeCallCell";

interface OutcomeCallCellProps {
    paymentFailed?: boolean;
    paymentMade?: boolean;
    humanWantedToTalk?: boolean;
    isCeaseAndDesist?: boolean;
    isBankruptcy?: boolean;
    isLegalAction?: boolean;
    callProgress?: {
        attemptedVerification?: boolean;
        explainedDebt?: boolean;
        offeredPaymentOptions?: boolean;
    }
}

export const OutcomesCell: React.FC<OutcomeCallCellProps> = ({
    paymentFailed,
    paymentMade,
    humanWantedToTalk,
    isCeaseAndDesist,
    isBankruptcy,
    isLegalAction,  
    callProgress
}) => {
    const getLastReachedStep = () => {
        if (callProgress?.offeredPaymentOptions) return "Offered Payment";
        if (callProgress?.explainedDebt) return "Explained Debt";
        if (callProgress?.attemptedVerification) return "Verified";
        return null;
    };

    const lastStep = getLastReachedStep();

    return (
        <>
            {paymentFailed && <Badge variant="destructive">Payment failed</Badge>}
            {paymentMade && <Badge className="ml-1 bg-green-500">Payment made</Badge>}
            {humanWantedToTalk && <Badge className="ml-1 bg-blue-500">Wants human</Badge>}
            {lastStep && <Badge className="ml-1 bg-purple-500">Reached: {lastStep}</Badge>}
            <OutcomeCallCell
                isCeaseAndDesist={isCeaseAndDesist}
                isBankruptcy={isBankruptcy}
                isLegalAction={isLegalAction}
            />
        </>
    );
};
