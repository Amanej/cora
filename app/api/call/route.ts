import { triggerSlackMessage } from '@/services/slack';
import { LANG, triggerCustomerSurveyCall, useCase } from '@/services/vapi';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { phoneNumber, useCase, lang }: {phoneNumber: string, useCase: useCase, lang: LANG} = await request.json();
  await triggerCustomerSurveyCall(phoneNumber, useCase, lang);
  triggerSlackMessage(phoneNumber, useCase, lang);
  console.log("phoneNumber ",phoneNumber);

  return NextResponse.json({ message: 'Hello from the API!' });
}
