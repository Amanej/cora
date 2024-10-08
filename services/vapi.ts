export enum useCase {
    "CUSTOMER_SURVEY" = "CUSTOMER_SURVEY",
    "DEBT_COLLECTION" = "DEBT_COLLECTION",
    "FAIR_COLLECTION" = "FAIR_COLLECTION",
    "SVEA_FINANS" = "SVEA_FINANS",
    "SELGER" = "SELGER",
    "LEAD_FOLLOW_UP_CORA" = "LEAD_FOLLOW_UP_CORA"
}

export enum LANG {
    NO = "NORWEGIAN",
    SWE = "SWEDISH",
    ENG = "ENGLISH"
}

const NORWEGIAN_ASSISTANTS = {
    [useCase.CUSTOMER_SURVEY]: "54279e03-34ee-4269-9bb1-08262b7937b0",
    [useCase.DEBT_COLLECTION]: "b232ce78-b5c6-4481-8f1a-06b01456918c",
    [useCase.FAIR_COLLECTION]: "d27af6d4-6eda-4269-b430-a5d786a790d7", // "c9c749e0-9325-4d28-841a-0232f6d8c1db",
    CUSTOMER_SERVICE: "01624712-cdf8-4586-a9a4-f236754808f9",
    [useCase.SVEA_FINANS]: "0df67b57-deb7-4016-bb85-1eb86ba70d61",
    [useCase.SELGER]: "f15c2af8-5041-4f32-ab60-a9caf366590d",
    [useCase.LEAD_FOLLOW_UP_CORA]: "3c5217af-e915-4aed-977a-d612ce349a48" // Secret
}

const SWEDISH_ASSISTANTS = {
    [useCase.CUSTOMER_SURVEY]: "7f0f9571-33ee-4bb0-bb28-c40264bfa034",
    [useCase.DEBT_COLLECTION]: "b232ce78-b5c6-4481-8f1a-06b01456918c", // Missing
    [useCase.FAIR_COLLECTION]: "b232ce78-b5c6-4481-8f1a-06b01456918c", // Missing
    [useCase.SVEA_FINANS]: "0df67b57-deb7-4016-bb85-1eb86ba70d61", // Missing
    [useCase.SELGER]: "f15c2af8-5041-4f32-ab60-a9caf366590d",
    [useCase.LEAD_FOLLOW_UP_CORA]: "b232ce78-b5c6-4481-8f1a-06b01456918c" // Missing
}

const ENGLISH_ASSISTANTS = {
    [useCase.CUSTOMER_SURVEY]: "30af1aba-1da6-4c58-955a-dd77a8045490",
    [useCase.DEBT_COLLECTION]: "b232ce78-b5c6-4481-8f1a-06b01456918c", // Missing
    [useCase.FAIR_COLLECTION]: "99cd9d0d-9777-46c7-b731-f3501a40d922", // "b232ce78-b5c6-4481-8f1a-06b01456918c",
    [useCase.SVEA_FINANS]: "0df67b57-deb7-4016-bb85-1eb86ba70d61", // Missing
    [useCase.SELGER]: "f15c2af8-5041-4f32-ab60-a9caf366590d",
    [useCase.LEAD_FOLLOW_UP_CORA]: "b232ce78-b5c6-4481-8f1a-06b01456918c" // Missing
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

        phoneNumberId: "c895bb88-d52d-40da-83e7-002883450d5e",
        customer: {
            numberE164CheckEnabled: true,
            number: phoneNumberToCall || "+4740568399"
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
        .then(response => console.log(response))
        .catch(err => console.error(err));
}