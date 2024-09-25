import Airtable from 'airtable';

// Configure Airtable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base("appkVMifma9j3Gxoz");

export const fetchAirtableData = async (tableName: string) => {
    try {
        const records = await base(tableName).select().all();
        return records.map(record => record.fields);
    } catch (error) {
        console.error('Error fetching data from Airtable:', error);
        throw error;
    }
};
