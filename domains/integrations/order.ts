import { fetchAirtableData } from "@/services/airtable";

export type OrderRecord = {
    Ordernummer: string,
    Kundenavn: string,
    Status: string,
    Value: number,
    CustomerId: string
    Telefon: string;
};

export const getOrders = async () => {
    const records = await fetchAirtableData('Orders');
    const typedRecords = records as OrderRecord[];
    return typedRecords;
}

export const getOrderByNumber = async (orderNumber: string) => {
    const records = await fetchAirtableData('Orders');
    const typedRecords = records as OrderRecord[];
    return typedRecords.find(record => record.Ordernummer === orderNumber);
}

export const getOrderByPhone = async (phone: string) => {
    const records = await fetchAirtableData('Orders');
    const typedRecords = records as OrderRecord[];
    return typedRecords.find(record => record.Telefon === phone);
}

export const getOrder = async ({ orderNumber, phone }: { orderNumber?: string, phone: string }) => {
    const records = await fetchAirtableData('Orders');
    const typedRecords = records as OrderRecord[];
    
    if (orderNumber) {
        return typedRecords.find(record => record.Ordernummer === orderNumber);
    }
    
    return typedRecords.find(record => record.Telefon === phone);
}
