import { WebClient } from '@slack/web-api';

// Initialize the Slack WebClient with your bot token
const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

export const triggerSlackMessage = async (phoneNumber: string, useCase: string, lang: string) => {
    if(phoneNumber !== "+4746164687") {
        await sendSlackMessage(`Someone just sent a call to ${phoneNumber} with useCase ${useCase} and lang ${lang}`);
    }
}

export async function sendSlackMessage(message: string): Promise<void> {
  try {
    await slackClient.chat.postMessage({
      channel: "CMGFVL1EU",
      text: message,
    });
    console.log('Message sent successfully to Slack');
  } catch (error) {
    console.error('Error sending message to Slack:', error);
    throw new Error('Failed to send message to Slack');
  }
}
