import APP_CONFIG from "@/lib/config";
import { getLoggedInHeaders } from "@/domains/auth/utils";
import { IPhoneNumber } from "../types";

// Function to fetch phone numbers owned by a user
export const fetchUserPhoneNumbers = async (token: string): Promise<IPhoneNumber[]> => {
    try {
        const response = await fetch(`${APP_CONFIG.backendUrl}/phone-numbers/phoneNumbers`, {
            method: 'GET',
            headers: getLoggedInHeaders(token),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch phone numbers');
        }

        const phoneNumbers = await response.json();
        return phoneNumbers;
    } catch (error) {
        console.error('Error fetching phone numbers:', error);
        throw error;
    }
};