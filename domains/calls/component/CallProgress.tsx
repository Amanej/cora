import { Badge } from "@/components/ui/badge";

interface CallProgressProps {
    attemptedVerification?: boolean;
    explainedDebt?: boolean;
    offeredPaymentOptions?: boolean;
}

export const CallProgress: React.FC<CallProgressProps> = ({
    attemptedVerification,
    explainedDebt,
    offeredPaymentOptions
}) => {
    const getLastReachedStep = () => {
        if (offeredPaymentOptions) return "Offered Payment";
        if (explainedDebt) return "Explained Debt";
        if (attemptedVerification) return "Attempted Verification";
        return null;
    };

    const lastStep = getLastReachedStep();
    return (
        <>
            {lastStep && <Badge className="ml-1 bg-purple-500">{lastStep}</Badge>}
        </>
    );
}; 