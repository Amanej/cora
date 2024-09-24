import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        // console.log("req ", req.headers.keys());
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