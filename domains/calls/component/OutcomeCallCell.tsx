import { Badge } from "@/components/ui/badge";

interface OutcomeCallCellProps {
  isCeaseAndDesist?: boolean;
  isBankruptcy?: boolean;
  isLegalAction?: boolean;
}

export const OutcomeCallCell: React.FC<OutcomeCallCellProps> = ({
  isCeaseAndDesist,
  isBankruptcy,
  isLegalAction,
}) => {
  return (
    <>
      {(() => {
        switch (true) {
          case isCeaseAndDesist:
            return <Badge variant="destructive">Cease and Desist</Badge>;
          case isBankruptcy:
            return <Badge variant="destructive" className="ml-2">Bankruptcy</Badge>;
          case isLegalAction:
            return <Badge variant="destructive" className="ml-2 bg-indigo-800">Legal Action</Badge>;
          default:
            return null;
        }
      })()}
    </>
  );
};
