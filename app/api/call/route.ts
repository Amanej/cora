import { failedCallSlackMessage, triggerSlackMessage } from '@/services/slack';
import { LANG, triggerCustomerSurveyCall, useCase } from '@/services/vapi';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // const { name, email, phoneNumber, useCase, lang }: {name?: string, email?: string, phoneNumber: string, useCase: useCase, lang: LANG} = await request.json();
  const { phoneNumber, fullName, firstName, item, date, amount, birthYear }: {phoneNumber: string, fullName?: string, firstName?: string, item?: string, date?: string, amount?: number, birthYear?: number} = await request.json();
  try {
    const response = await triggerCustomerSurveyCall(phoneNumber, useCase.DEBT_COLLECTION, LANG.AR, {fullName, firstName, item, date, amount, birthYear});
    if(response) {
      await triggerSlackMessage({name: fullName, email: "", phoneNumber, useCase: "Arabic Collection Agent", lang: "Arabic"});
    } else {
      await failedCallSlackMessage({name: fullName, email: "", phoneNumber, useCase: "Arabic Collection Agent", lang: "Arabic"});
    }

  } catch(err) {
    // await failedCallSlackMessage({name, email, phoneNumber, useCase, lang});
    await failedCallSlackMessage({phoneNumber, name: fullName, useCase: "Arabic Collection Agent", lang: "Arabic"});
  }
  console.log("phoneNumber ",phoneNumber);

  return NextResponse.json({ message: 'Hello from the API!' });
}
