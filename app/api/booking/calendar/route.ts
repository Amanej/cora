import { createCalendarEvent } from '@/services/calendar';
import { VAPI_Payload } from '@/services/vapi/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const info = await req.json();
        console.log("info ", info);
        const typedInfo = info as VAPI_Payload;
        const day = typedInfo.message.toolCallList[0].function.arguments.day;
        const notes = typedInfo.message.toolCallList[0].function.arguments.notes;
        console.log("day ", day, " notes ", notes);
        try {
            const record = await createCalendarEvent({date: day, title: "Dentist appointment", description: notes});
            console.log("record ", record);
            const vapiResponse = {
                "results": [
                    {
                        "toolCallId": typedInfo.message.toolCallList[0].id,
                        "result": "Successfully created booking for " + day
                    }
                ]
            };
            return NextResponse.json(vapiResponse, { status: 200 });
        } catch (error) {
            console.log("error ", error);
            return NextResponse.json({ message: 'Could not create booking', error }, { status: 500 });
        }
    } catch (error) {
        console.log("error ", error);
        return NextResponse.json({ message: 'Could not create booking', error }, { status: 500 });
    }
}
