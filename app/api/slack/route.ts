import { VAPI_Payload } from '@/services/vapi/types';
import { NextRequest, NextResponse } from 'next/server';
import { triggerSlackIntegrationExample } from '@/services/slack';

export async function POST(req: NextRequest) {
    try {
        const info = await req.json();
        console.log("info ", info);
        const typedInfo = info as VAPI_Payload;
        console.log("typedInfo - toolCallList ", typedInfo.message.toolCallList[0]);
        console.log("typedInfo - toolCallLists ", typedInfo.message.toolCallList);
        console.log("typedInfo - call ", typedInfo.message.call);
        console.log("typedInfo - call ", typedInfo.message.customer);

        const name = typedInfo.message.toolCallList[0].function.arguments.name;
        const note = typedInfo.message.toolCallList[0].function.arguments.note;
        // console.log("name ", name);
        try {
            const response = await triggerSlackIntegrationExample({name, note, phoneNumber: typedInfo.message.call.customer?.number || "Ukjent"});
            console.log("response ", response);
            const vapiResponse = {
                "results": [
                    {
                        "toolCallId": typedInfo.message.toolCallList[0].id,
                        "result": "Your message has been sent to the customer service desk."
                    }
                ]
            };
            return NextResponse.json(vapiResponse, { status: 200 });
        } catch (error) {
            console.log("error ", error);
            return NextResponse.json({ message: 'Failed to send message to customer service desk', error }, { status: 500 });
        }
    } catch (error) {
        console.log("error ", error);
        return NextResponse.json({ message: 'Failed to send message to customer service desk', error }, { status: 500 });
    }
}
