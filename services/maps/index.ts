import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});

export const validateAddress = async (address: string): Promise<{isValid: boolean, formattedAddress: string}> => {
  try {
    console.log("Validate address ", address)
    const response = await client.geocode({
      params: {
        address: address,
        key: process.env.GOOGLE_MAPS_API_KEY || "",
      },
    });

    if (response.data.status === "OK" && response.data.results.length > 0) {
        console.log("response", response.data.results)
        const firstAddress = response.data.results[0];
        const addressComponents = firstAddress.address_components;
        console.log("addressComponents", addressComponents)
      return {
        isValid: true,
        formattedAddress: firstAddress.formatted_address
      };
    } else {
      return {
        isValid: false,
        formattedAddress: ""
      };
    }
  } catch (error) {
    console.error("Error validating address:", error);
    return {
      isValid: false,
      formattedAddress: ""
    };
  }
};