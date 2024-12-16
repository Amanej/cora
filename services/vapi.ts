export enum useCase {
    "CUSTOMER_SURVEY" = "CUSTOMER_SURVEY",
    "DEBT_COLLECTION" = "DEBT_COLLECTION",
    "CUSTOMER_SERVICE" = "CUSTOMER_SERVICE",
    "LEAD_QUALIFICATION" = "LEAD_QUALIFICATION",
    "REAL_ESTATE" = "REAL_ESTATE",
    /*
    "APPOINTMENT_BOOKING" = "APPOINTMENT_BOOKING"
    "FAIR_COLLECTION" = "FAIR_COLLECTION",
    "SVEA_FINANS" = "SVEA_FINANS",
    "SELGER" = "SELGER",
    "LEAD_FOLLOW_UP_CORA" = "LEAD_FOLLOW_UP_CORA",
    "BLID_CUSTOMER_SERVICE" = "BLID_CUSTOMER_SERVICE"
    */
}

export enum LANG {
    NO = "NORWEGIAN",
    SWE = "SWEDISH",
    ENG = "ENGLISH",
    /*
    ES = "SPANISH",
    FR = "FRENCH",
    DE = "GERMAN",
    PT = "PORTUGUESE",
    NL = "DUTCH",
    PL = "POLISH",
    FI = "FINNISH",
    IT = "ITALIAN",
    DAN = "DANISH"
    */
}

const NORWEGIAN_ASSISTANTS = {
    [useCase.CUSTOMER_SURVEY]: "54279e03-34ee-4269-9bb1-08262b7937b0",
    [useCase.DEBT_COLLECTION]: "b232ce78-b5c6-4481-8f1a-06b01456918c",
    [useCase.CUSTOMER_SERVICE]: "2a6c9d5f-8d4c-48a3-a4fb-5018c7e2f430",
    [useCase.LEAD_QUALIFICATION]: "b671996c-1776-4084-a58d-e7b187277065",
    [useCase.REAL_ESTATE]: "b671996c-1776-4084-a58d-e7b187277065", // Missing
    /*
    [useCase.APPOINTMENT_BOOKING]: ""
    [useCase.FAIR_COLLECTION]: "884e518a-08c4-4650-a73e-00eeae4e1243", // "d27af6d4-6eda-4269-b430-a5d786a790d7", // "c9c749e0-9325-4d28-841a-0232f6d8c1db",
    [useCase.SVEA_FINANS]: "0df67b57-deb7-4016-bb85-1eb86ba70d61",
    [useCase.SELGER]: "f15c2af8-5041-4f32-ab60-a9caf366590d",
    [useCase.LEAD_FOLLOW_UP_CORA]: "3c5217af-e915-4aed-977a-d612ce349a48", // Secret
    [useCase.BLID_CUSTOMER_SERVICE]: "fc0a4cb4-098c-4b22-9417-c6ba7b6bd255" // Secret
    */
}

const SWEDISH_ASSISTANTS = {
    [useCase.CUSTOMER_SURVEY]: "7f0f9571-33ee-4bb0-bb28-c40264bfa034",
    [useCase.DEBT_COLLECTION]: "b232ce78-b5c6-4481-8f1a-06b01456918c", // Missing
    [useCase.CUSTOMER_SERVICE]: "22bb7dad-670c-4ef7-90d0-d16c18132170",
    [useCase.LEAD_QUALIFICATION]: "ef081b59-5111-4bd9-b628-9585d8030069",
    [useCase.REAL_ESTATE]: "ef081b59-5111-4bd9-b628-9585d8030069", // Missing
    /*
    [useCase.APPOINTMENT_BOOKING]: ""
    [useCase.FAIR_COLLECTION]: "b232ce78-b5c6-4481-8f1a-06b01456918c", // Missing
    [useCase.SVEA_FINANS]: "0df67b57-deb7-4016-bb85-1eb86ba70d61", // Missing
    [useCase.SELGER]: "f15c2af8-5041-4f32-ab60-a9caf366590d",
    [useCase.LEAD_FOLLOW_UP_CORA]: "b232ce78-b5c6-4481-8f1a-06b01456918c", // Missing
    [useCase.BLID_CUSTOMER_SERVICE]: "fc0a4cb4-098c-4b22-9417-c6ba7b6bd255" // Missing
    */
}

const ENGLISH_ASSISTANTS = {
    [useCase.CUSTOMER_SURVEY]: "30af1aba-1da6-4c58-955a-dd77a8045490",
    [useCase.DEBT_COLLECTION]: "b232ce78-b5c6-4481-8f1a-06b01456918c", // Missing
    [useCase.CUSTOMER_SERVICE]: "30187067-b023-4fb7-b7d4-f91d0089eeb5",
    [useCase.LEAD_QUALIFICATION]: "2529deba-e5a8-4465-b057-ede6dfe661db",
    [useCase.REAL_ESTATE]: "3edb5051-75e4-41ec-90f3-3b89f1972535",
    /*
    [useCase.FAIR_COLLECTION]: "99cd9d0d-9777-46c7-b731-f3501a40d922", // "b232ce78-b5c6-4481-8f1a-06b01456918c",
    [useCase.SVEA_FINANS]: "0df67b57-deb7-4016-bb85-1eb86ba70d61", // Missing
    [useCase.SELGER]: "f15c2af8-5041-4f32-ab60-a9caf366590d",
    [useCase.LEAD_FOLLOW_UP_CORA]: "b232ce78-b5c6-4481-8f1a-06b01456918c", // Missing
    [useCase.BLID_CUSTOMER_SERVICE]: "fc0a4cb4-098c-4b22-9417-c6ba7b6bd255" // Missing
    */
}



const getAssistantId = (useCase: useCase, lang: LANG) => {
    switch (lang) {
        case LANG.NO:
            console.log("isNorwegian")
            return NORWEGIAN_ASSISTANTS[useCase]
            break;
        case LANG.ENG:
            console.log("isEnglish")
            return ENGLISH_ASSISTANTS[useCase]
            break;
        case LANG.SWE:
            console.log("isSwedish")
            return SWEDISH_ASSISTANTS[useCase]
            break;
    }
};

export const triggerCustomerSurveyCall = async (phoneNumberToCall: string, useCase: useCase, lang: LANG) => {
    console.log("useCase, lang",useCase, lang);
    const assistantId = getAssistantId(useCase, lang);
    console.log("assistantId ",assistantId);

    const body = {
        assistantId: assistantId,

        phoneNumberId: "e354916c-659a-489e-b141-a1e0ddb13712", // - US  // "c895bb88-d52d-40da-83e7-002883450d5e", - NO
        customer: {
            numberE164CheckEnabled: true,
            number: phoneNumberToCall
        }
    };
    const options = {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.VAPI_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };

    return fetch('https://api.vapi.ai/call', options)
        .then(response => {
            console.log("response ", response);
            return response.json()
        })
        .then(response => {
            console.log(response)
            return true
        })
        .catch(err => {
            console.error(err)
            return null
        });
}