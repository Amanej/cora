import { VAPI_Payload } from '@/services/vapi/types';
import { NextRequest, NextResponse } from 'next/server';
import { triggerSlackAccessControlExample } from '@/services/slack';

export async function POST(req: NextRequest) {
    try {
        const info = await req.json();
        console.log("info ", info);
        const typedInfo = info as VAPI_Payload;
        console.log("Access Control Add called ");

        const buildingId = typedInfo.message.toolCallList[0].function.arguments.buildingId;
        const phoneNumberToAdd = typedInfo.message.toolCallList[0].function.arguments.phoneNumberToAdd;
        const addedBy = typedInfo.message.toolCallList[0].function.arguments.addedBy;

        console.log("buildingId ", buildingId, "phoneNumberToAdd ", phoneNumberToAdd, "addedBy ", addedBy);

        try {
            const response = await triggerSlackAccessControlExample({buildingId, phoneNumberToAdd, addedBy, phoneNumberAddedBy: typedInfo.message.call.customer?.number || "Ukjent"});
            console.log("response ", response);
            const vapiResponse = {
                "results": [
                    {
                        "toolCallId": typedInfo.message.toolCallList[0].id,
                        "result": "The user has been added to access control."
                    }
                ]
            };
            return NextResponse.json(vapiResponse, { status: 200 });
        } catch (error) {
            console.log("error ", error);
            return NextResponse.json({ message: 'Failed to add user to access control', error }, { status: 500 });
        }
    } catch (error) {
        console.log("error ", error);
        return NextResponse.json({ message: 'Failed to add user to access control', error }, { status: 500 });
    }
}
