import { fetchAirtableData } from "@/services/airtable";

export type AvailabilityRecord = {
    Date: string,
    Hour: number,
    SlotsAvailable: number,
    Label: string
};

export const getAvailability = async () => {
    const records = await fetchAirtableData('Availability');
    const typedRecords = records as AvailabilityRecord[];
    return typedRecords;
}