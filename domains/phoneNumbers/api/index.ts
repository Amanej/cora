import APP_CONFIG from "@/lib/config";

export const addPhoneNumberRequest = async (name: string, phoneNumber: string) => {
  try {
    const response = await fetch(`${APP_CONFIG.backendUrl}/phone-numbers/addPhoneNumberRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, phoneNumber }),
    });

    if (!response.ok) {
      throw new Error('Failed to add phone number');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding phone number:', error);
    throw error;
  }
};
