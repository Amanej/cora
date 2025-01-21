import { fetchAirtableData } from "@/services/airtable";

export type AccessControlRecord = {
    Phone: string,
    Name: string,
    canAdd: boolean,
    AdminName: string,
    BuildingId: number
}

export const lookupAccessControl = async (phoneNumber: string) => {
    try {
        const records = await fetchAirtableData('AccessControl') as AccessControlRecord[];
        const user = records.find(record => record.Phone === phoneNumber);
        return user;
    } catch (error) {
        console.error('Error looking up access control:', error);
        throw error;
    }
}

