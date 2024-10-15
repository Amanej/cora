import { validateAddress } from '@/services/maps';
import { VAPI_Payload } from '@/services/vapi/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const info = await req.json();
        console.log("info ", info);
        const typedInfo = info as VAPI_Payload;
        const address = typedInfo.message.toolCallList[0].function.arguments.address;
        console.log("address ", address);
        try {
            const response = await validateAddress(address);
            console.log("response ", response);
            const vapiResponse = {
                "results": [
                    {
                        "toolCallId": typedInfo.message.toolCallList[0].id,
                        "result": "Validated address is " + response.formattedAddress
                    }
                ]
            };
            return NextResponse.json(vapiResponse, { status: 200 });
        } catch (error) {
            console.log("error ", error);
            return NextResponse.json({ message: 'Could not validate address', error }, { status: 500 });
        }
    } catch (error) {
        console.log("error ", error);
        return NextResponse.json({ message: 'Could not validate address', error }, { status: 500 });
    }
}
