import { VAPI_Payload } from '@/services/vapi/types';
import { NextRequest, NextResponse } from 'next/server';
import { getOrder } from '@/domains/integrations/order';

export async function POST(req: NextRequest) {
    try {
        const info = await req.json();
        console.log("info ", info);
        const typedInfo = info as VAPI_Payload;
        console.log("typedInfo - toolCallList ", typedInfo.message.toolCallList[0]);
        console.log("typedInfo - toolCallLists ", typedInfo.message.toolCallList);
        console.log("typedInfo - call ", typedInfo.message.call);
        console.log("typedInfo - call ", typedInfo.message.customer);

        const orderNumber = typedInfo.message.toolCallList[0].function.arguments.orderNumber;
        const phone = typedInfo.message.call.customer?.number || "Ukjent"
        console
        try {
            const response = await getOrder({orderNumber, phone});
            console.log("response ", response);
            const vapiResponse = {
                "results": [
                    {
                        "toolCallId": typedInfo.message.toolCallList[0].id,
                        "result": response
                    }
                ]
            };
            return NextResponse.json(vapiResponse, { status: 200 });
        } catch (error) {
            console.log("error ", error);
            return NextResponse.json({ message: 'Failed to get order', error }, { status: 500 });
        }
    } catch (error) {
        console.log("error ", error);
        return NextResponse.json({ message: 'Failed to get order', error }, { status: 500 });
    }
}