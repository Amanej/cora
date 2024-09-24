import { getAvailability } from '@/domains/integrations/booking';
import { fetchAirtableData } from '@/services/airtable';
import { VAPI_Payload } from '@/services/vapi/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        // console.log("req ", req.headers.keys());
        const data = await fetchAirtableData('Debts');
        console.log('Airtable data:', data);
        const availability = await getAvailability();
        console.log("availability ", availability);
        console.log("req ", req.url);
        const getRandomName = () => {
            const names = ['John', 'Jane', 'Doe', 'Smith'];
            return names[Math.floor(Math.random() * names.length)];
        };
        const randomName = getRandomName();
        return NextResponse.json(randomName, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Could not get random name', error }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    try {
        const info = await req.json();
        const typedInfo = info as VAPI_Payload;
        console.log("info ", info);
        console.log("info toolCallList ", info.message.toolCallList[0]);
        // console.log("info toolCall ", info.message.toolCall[0]);
        console.log("req ", req.url);
        const getRandomName = () => {
            const names = ['John', 'Jane', 'Doe', 'Smith'];
            return names[Math.floor(Math.random() * names.length)];
        };
        const randomName = getRandomName();
        const vapiResponse = {
            "results": [
                {
                    "toolCallId": typedInfo.message.toolCallList[0].id,
                    "result": randomName
                }
            ]
        };
        return NextResponse.json(vapiResponse, { status: 200 });
    } catch (error) {
        console.log("error ", error);
        return NextResponse.json({ message: 'Could not get random name', error }, { status: 500 });
    }
}

