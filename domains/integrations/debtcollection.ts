import { fetchAirtableData } from "@/services/airtable";

export type DebtCollectionDatabaseRecord = {
    Status: 'Active' | 'Closed' | 'Overdue',
    Value: number,
    Saksnr: number,
    Kundenavn: string,
    CustomerId: number
}

function getCase(caseNumber: number, records: DebtCollectionDatabaseRecord[]): DebtCollectionDatabaseRecord | undefined {
    return records.find(record => record.Saksnr === caseNumber);
}

export const getSpecificCase = async (caseNumber: number) => {
    const records = await fetchAirtableData('Debts');
    const specificCase = getCase(caseNumber, records as DebtCollectionDatabaseRecord[]);
    console.log(specificCase);
    return specificCase;
}

const isThisCaseStillUnpaid = (caseRecord: DebtCollectionDatabaseRecord) => {
    return caseRecord.Status === 'Active' || caseRecord.Status === 'Overdue';
}

export const howMuchDoIOwe = async (saksNr: number) => { // TODO: Support multiple debts
    const specificCase = await getSpecificCase(saksNr);
    if (!specificCase) {
        return undefined;
    }
    const isActive = isThisCaseStillUnpaid(specificCase);
    return isActive ? specificCase?.Value : 'Paid';
}

export const howMuchDoIOweInTotal = async (saksNr: number) => {
    const records = await fetchAirtableData('Debts') as DebtCollectionDatabaseRecord[];
    const specificCase = getCase(saksNr, records);

    if (!specificCase) {
        return undefined;
    }

    const customerId = specificCase.CustomerId;
    const totalDebt = records.reduce((total, record) => {
        if (record.CustomerId === customerId && isThisCaseStillUnpaid(record)) {
            return total + record.Value;
        }
        return total;
    }, 0);

    return totalDebt;
}


export const isMyCaseActive = async (saksNr: number) => {
    const specificCase = await getSpecificCase(saksNr);
    return specificCase?.Status === 'Active' || specificCase?.Status === 'Overdue';
}

