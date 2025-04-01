import { fetchAirtableData } from "@/services/airtable";

export type CustomerRecord = {
    Phone: string,
    Name: string,
    Outstanding: string,
    FirstName: string,
    BankName: string,
    MinimumDownPayment: string,
    BirthDate: string,
}

export const lookupCustomer = async (phoneNumber: string) => {
    try {
        const records = await fetchAirtableData('Elite') as CustomerRecord[];
        const user = records.find(record => record.Phone === phoneNumber);
        return user;
    } catch (error) {
        console.error('Error looking up access control:', error);
        throw error;
    }
}

