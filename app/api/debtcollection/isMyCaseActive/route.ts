import { isMyCaseActive } from '@/domains/integrations/debtcollection';
import { VAPI_Payload } from '@/services/vapi/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const info = await req.json();
        const typedInfo = info as VAPI_Payload;
        console.log("info ", info);
        console.log("info toolCallList ", info.message.toolCallList[0]);
        console.log("info toolCalls ", info.message.toolCalls[0]);
        console.log("req ", req.url);
        const saksNr = typedInfo.message.toolCallList[0].function.arguments.caseNumber;
        const isActive = await isMyCaseActive(saksNr);
        const vapiResponse = {
            "results": [
                {
                    "toolCallId": typedInfo.message.toolCallList[0].id,
                    "result": isActive ? "Is active" : "Is not active"
                }
            ]
        };
        return NextResponse.json(vapiResponse, { status: 200 });
    } catch (error) {
        console.log("error ", error);
        return NextResponse.json({ message: 'Could not get random name', error }, { status: 500 });
    }
}

