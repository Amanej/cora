import { ENDING_REASON } from "./types";

export function formatEndingReason(endingReason: ENDING_REASON): string {
    switch (endingReason) {
        case ENDING_REASON.TECHNICAL_ERROR:
            return "Ended";
        case ENDING_REASON.VOICEMAIL:
            return "Voicemail";
        case ENDING_REASON.CUSTOMER_BUSY:
            return "Busy";
        case ENDING_REASON.CUSTOMER_ENDED_CALL:
            return "Customer Ended";
        case ENDING_REASON.CUSTOMER_MISDIALLED:
            return "Customer Misdialed";
        case ENDING_REASON.CUSTOMER_DID_NOT_ANSWER:
            return "No Answer";
        case ENDING_REASON.CUSTOMER_SAID_END_CALL_PHRASE:
            return "Customer Triggered End";
        case ENDING_REASON.MANUALLY_CANCELED:
            return "Manually Canceled";
        case ENDING_REASON.EXCEEDED_MAX_DURATION:
            return "Exceeded Duration";
        case ENDING_REASON.ASSISTANT_ERROR:
            return "Agent Error";
        case ENDING_REASON.ASSISTANT_FORWARDED_CALL:
            return "Agent Forwarded";
        case ENDING_REASON.ASSISTANT_SAID_END_CALL_PHRASE:
            return "Agent Ended";
        case ENDING_REASON.ASSISTANT_END_CALL:
            return "Agent Ended";
        default:
            return "Unknown Reason";
    }
}
