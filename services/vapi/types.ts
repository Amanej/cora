export type VAPI_TOOL_CALL = {
    id: string,
    type: string,
    function: {
        name: string,
        arguments: {
            [key: string]: any,
        }
    }
}

export type VAPI_Payload = {
    message: {
      timestamp: 1727177444028,
      type: 'tool-calls',
      toolCalls: [ [Object] ],
      toolCallList: VAPI_TOOL_CALL[ ],
      toolWithToolCallList: [ [Object] ],
      artifact: { messages: [], messagesOpenAIFormatted: [] },
      call: {
        id: '9745b16f-f28c-4213-b448-c21432ba8f2c',
        orgId: 'add56255-bfe7-43b6-bcba-5b1218c356f0',
        createdAt: '2024-09-24T11:30:23.497Z',
        updatedAt: '2024-09-24T11:30:23.497Z',
        type: 'webCall',
        monitor: [Object],
        webCallUrl: 'https://vapi.daily.co/xiZazlPOb0rbjZd2eRtf',
        status: 'queued',
        assistantId: '99cd9d0d-9777-46c7-b731-f3501a40d922'
      },
      assistant: {
        id: '99cd9d0d-9777-46c7-b731-f3501a40d922',
        orgId: 'add56255-bfe7-43b6-bcba-5b1218c356f0',
        name: 'CustomerService_English',
        voice: [Object],
        createdAt: '2024-09-24T10:19:48.312Z',
        updatedAt: '2024-09-24T11:21:51.959Z',
        model: [Object],
        recordingEnabled: true,
        firstMessage: 'Hey, this is Joan from Yaya Massage. Hope you are having a great day!',
        voicemailMessage: "Hey this is Mary from Mary's Dental. Please call back when you're available.",
        endCallMessage: "Thank you for contacting Mary's Dental. Have a great day!",
        transcriber: [Object],
        clientMessages: [],
        serverMessages: [],
        responseDelaySeconds: 0.1,
        endCallPhrases: [],
        backgroundSound: 'off',
        backchannelingEnabled: true
      }
    }
  }