import { triggerCustomerSurveyCall } from '@/services/vapi';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { phoneNumber } = await request.json();
  await triggerCustomerSurveyCall(phoneNumber);
  console.log("phoneNumber ",phoneNumber);

  return NextResponse.json({ message: 'Hello from the API!' });
}
