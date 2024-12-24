import { ENDING_REASON } from "./types";

export function formatEndingReason(endingReason: ENDING_REASON): string {
    switch (endingReason) {
        case ENDING_REASON.TECHNICAL_ERROR:
            return "Technical Error";
        case ENDING_REASON.VOICEMAIL:
            return "Voicemail";
        case ENDING_REASON.CUSTOMER_BUSY:
            return "Customer Busy";
        case ENDING_REASON.CUSTOMER_ENDED_CALL:
            return "Customer Ended Call";
        case ENDING_REASON.CUSTOMER_MISDIALLED:
            return "Customer Misdialed";
        case ENDING_REASON.CUSTOMER_DID_NOT_ANSWER:
            return "Customer Did Not Answer";
        case ENDING_REASON.CUSTOMER_SAID_END_CALL_PHRASE:
            return "Customer Said End Call Phrase";
        case ENDING_REASON.MANUALLY_CANCELED:
            return "Manually Canceled";
        case ENDING_REASON.EXCEEDED_MAX_DURATION:
            return "Exceeded Max Duration";
        case ENDING_REASON.ASSISTANT_ERROR:
            return "Assistant Error";
        case ENDING_REASON.ASSISTANT_FORWARDED_CALL:
            return "Assistant Forwarded Call";
        case ENDING_REASON.ASSISTANT_SAID_END_CALL_PHRASE:
            return "Assistant Said End Call Phrase";
        case ENDING_REASON.ASSISTANT_END_CALL:
            return "Assistant Ended Call";
        default:
            return "Unknown Reason";
    }
}
