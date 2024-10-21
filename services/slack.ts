import { WebClient } from '@slack/web-api';

// Initialize the Slack WebClient with your bot token
const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

export const triggerSlackIntegrationExample = async ({name, phoneNumber, note}:{name?: string, phoneNumber: string, note: string}) => {
      const text = `*Kundehenvendelse* \n Name: ${name} \n Phone: ${phoneNumber} \n Note: ${note}.`;
      await sendSlackMessage(text, "CMGFVL1EU"); // replace with your channel id
}


export const triggerSlackMessage = async ({name, email, phoneNumber, useCase, lang}:{name?: string, email?: string, phoneNumber: string, useCase: string, lang: string}) => {
    if(phoneNumber !== "+4746164687") {
      const text = `*CoraFone Lead* \n Phone: ${phoneNumber} \n Use case: ${useCase} \n Lang: ${lang} \n Name: ${name} \n Email: ${email}.`;
      await sendSlackMessage(text);
    }
}

export const failedCallSlackMessage = async ({name, email, phoneNumber, useCase, lang}:{name?: string, email?: string, phoneNumber: string, useCase: string, lang: string}) => {
  if(phoneNumber !== "+4746164687") {
    const text = `*CoraFone Call Failed* \n Phone: ${phoneNumber} \n Use case: ${useCase} \n Lang: ${lang} \n Name: ${name} \n Email: ${email}.`;
    await sendSlackMessage(text);
  }
}

export async function sendSlackMessage(message: string, channel="CMGFVL1EU"): Promise<void> {
  try {
    await slackClient.chat.postMessage({
      channel: channel,
      text: message,
    });
    console.log('Message sent successfully to Slack');
  } catch (error) {
    console.error('Error sending message to Slack:', error);
    throw new Error('Failed to send message to Slack');
  }
}
