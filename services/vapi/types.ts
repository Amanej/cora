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
      timestamp: number,
      type: string,
      toolCalls: [ [Object] ],
      toolCallList: VAPI_TOOL_CALL[ ],
      toolWithToolCallList: [ [Object] ],
      artifact: { messages: [], messagesOpenAIFormatted: [] },
      call: {
        id: string,
        orgId: string,
        createdAt: string,
        updatedAt: string,
        type: string,
        monitor: {
          listenUrl: string,
          controlUrl: string,
        },
        webCallUrl: string,
        status: string,
        assistantId: string,
        customer?: { number: string, numberE164CheckEnabled: boolean },
      },
      customer?: { number: string, numberE164CheckEnabled: boolean },
      assistant: {
        id: string,
        orgId: string,
        name: string,
        voice: {
          id: string,
          name: string,
        },
        createdAt: string,
        updatedAt: string,
        model: {
          id: string,
          name: string,
        },
        recordingEnabled: boolean,
        firstMessage: string,
        voicemailMessage: string,
        endCallMessage: string,
        transcriber: {
          id: string,
          name: string,
        },
        clientMessages: [],
        serverMessages: [],
        responseDelaySeconds: number,
        endCallPhrases: [],
        backgroundSound: string,
        backchannelingEnabled: boolean
      }
    }
  }