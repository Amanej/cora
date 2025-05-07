import { AgentRecordingSetting } from "../agent/types";

export type Call = {
    _id: string;
    agentId: string;
    phoneNumber: string;
    recordingUrl?: string;
    // externalId: "e5a1100e-bb9f-4841-9c7f-8a961a5fa6d0",
    status: string;
    note?: string; // Should be there
    outcome: {
        endingReason: ENDING_REASON | null,
        typeOfOutcome: null,
        booleanValue: null,
        numericValue: null,
        receivedVoicemail?: boolean
        vulnerability?: boolean
        collectionAnalysis?: {
            paymentMade?: {
                total_debt_owed: number,
                payment_received: boolean,
                payment_failed: boolean,
                payment_amount?: number,
                remainder_amount?: number,
                settled_percentage?: number
            },
            paymentPlan?: {
                plan_accepted: boolean,
                total_debt_owed: number,
                pay_frequency: string,
                amount_agreed: number,
            },
            callProgress?: { // @TODO - This is custom to EPM
                attemptedVerification?: boolean,
                explainedDebt?: boolean,
                offeredPaymentOptions?: boolean
            },
            bankruptcy?: boolean,
            cease_and_desist?: boolean,
            legal_action?: boolean,
            typeOfHardship?: string,
            income_expenditure_analysis?: boolean,
        },
        contactAnalysis?: {
            was_the_right_number?: boolean,
            was_the_right_party?: boolean,
            wanted_to_talk_human?: boolean,
        }
    }
    createdAt: Date;
    transcript: string
    updatedAt: Date;
    startedAt?: Date;
    endedAt?: Date;
    settings?: {
        recordingType?: AgentRecordingSetting;
        acceptedRecording?: boolean;
    }
}

export enum ENDING_REASON {
    TECHNICAL_ERROR = "technical-error",
    VOICEMAIL = "voicemail",
    CUSTOMER_BUSY = "customer-busy",
    CUSTOMER_ENDED_CALL = "customer-ended-call",
    CUSTOMER_MISDIALLED = "customer-misdialed",
    CUSTOMER_DID_NOT_ANSWER = "customer-did-not-answer",
    CUSTOMER_SAID_END_CALL_PHRASE = "customer-said-end-call-phrase",
    MANUALLY_CANCELED = "manually-canceled",
    EXCEEDED_MAX_DURATION = "exceeded-max-duration",
    ASSISTANT_ERROR = "assistant-error",
    ASSISTANT_FORWARDED_CALL = "assistant-forwarded-call",
    ASSISTANT_SAID_END_CALL_PHRASE = "assistant-said-end-call-phrase",
    ASSISTANT_END_CALL = "assistant-end-call"
}