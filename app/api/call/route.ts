import { failedCallSlackMessage, triggerSlackMessage } from '@/services/slack';
import { LANG, triggerCustomerSurveyCall, useCase } from '@/services/vapi';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { name, email, phoneNumber, useCase, lang }: {name?: string, email?: string, phoneNumber: string, useCase: useCase, lang: LANG} = await request.json();
  try {
    const response = await triggerCustomerSurveyCall(phoneNumber, useCase, lang);
    if(response) {
      await triggerSlackMessage({name, email, phoneNumber, useCase, lang});
    } else {
      await failedCallSlackMessage({name, email, phoneNumber, useCase, lang});
    }
  } catch(err) {
    await failedCallSlackMessage({name, email, phoneNumber, useCase, lang});
  }
  console.log("phoneNumber ",phoneNumber);

  return NextResponse.json({ message: 'Hello from the API!' });
}
