import { fetchAirtableData } from "@/services/airtable";

export type DebtCollectionDatabaseRecord = {
    Status: 'Active' | 'Closed' | 'Overdue',
    Value: number,
    Saksnr: number,
    Kundenavn: string
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

export const howMuchDoIOwe = async (saksNr: number) => { // TODO: Support multiple debts
    const specificCase = await getSpecificCase(saksNr);
    return specificCase?.Value;
}

export const isMyCaseActive = async (saksNr: number) => {
    const specificCase = await getSpecificCase(saksNr);
    return specificCase?.Status === 'Active' || specificCase?.Status === 'Overdue';
}

