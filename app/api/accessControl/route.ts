import { lookupAccessControl } from '@/domains/integrations/accessControl';
import { VAPI_Payload } from '@/services/vapi/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const info = await req.json();
        const typedInfo = info as VAPI_Payload;
        console.log("typedInfo ", typedInfo);
        const number = typedInfo.message.customer?.number;
        console.log("number ", number);
        if (!number) {
            return NextResponse.json({ message: 'No number provided', error: 'No number provided' }, { status: 400 });
        }
        const accessControl = await lookupAccessControl(number);
        console.log("accessControl ", accessControl);
        const vapiResponse = {
            "results": [
                {
                    "toolCallId": typedInfo.message.toolCallList[0].id,
                    "result": accessControl
                }
            ]
        };
        return NextResponse.json(vapiResponse, { status: 200 });
    } catch (error) {
        console.log("error ", error);
        return NextResponse.json({ message: 'Could not get find user', error }, { status: 500 });
    }
}

