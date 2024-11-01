export type Call = {
    agentId: string;
    phoneNumber: string;
    recordingUrl?: string;
    // externalId: "e5a1100e-bb9f-4841-9c7f-8a961a5fa6d0",
    status: string;
    note?: string; // Should be there
    outcome: {
        endingReason: null,
        typeOfOutcome: null,
        booleanValue: null,
        numericValue: null
    }
    createdAt: Date;
    transcript: string
    updatedAt: Date;
    startedAt?: Date;
    endedAt?: Date;
}
