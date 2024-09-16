const ASSISTANTS = {
    customerSurvey: "54279e03-34ee-4269-9bb1-08262b7937b0",
    debtCollection: "b232ce78-b5c6-4481-8f1a-06b01456918c"
}
export const triggerCustomerSurveyCall = async (phoneNumberToCall: string) => {
    const body = { 
        assistantId: ASSISTANTS.customerSurvey, 
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
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}