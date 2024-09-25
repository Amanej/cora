import { AvailabilityRecord, getAvailability } from '@/domains/integrations/booking';
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
        const day = typedInfo.message.toolCallList[0].function.arguments.day;
        console.log("day ", day);
        const availability = await getAvailability();
        console.log("availability ", availability);
        const wednesdayAvailability = availability.find((day: AvailabilityRecord) => day.Date === "2024-09-25");
        console.log("wednesdayAvailability ", wednesdayAvailability);
        const formattedAvailability = availability.filter((d) => d.SlotsAvailable > 0).map((d) => d.Hour).toString();
        console.log("formattedAvailability ", formattedAvailability);
        const formattedString = `We have available bookings for ${formattedAvailability}`;
        const vapiResponse = {
            "results": [
                {
                    "toolCallId": typedInfo.message.toolCallList[0].id,
                    "result": formattedString
                }
            ]
        };
        return NextResponse.json(vapiResponse, { status: 200 });
    } catch (error) {
        console.log("error ", error);
        return NextResponse.json({ message: 'Could not get random name', error }, { status: 500 });
    }
}

