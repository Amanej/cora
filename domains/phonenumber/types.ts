export enum PhoneNumberType {
    CORA = 'CORA',
    USER = 'USER'
}

export interface IPhoneNumber {
    externalId: string;
    countryCode: string;
    number: string;
    type: PhoneNumberType;
    ownerId: string | null;
    agentId: string | null;
    outboundAreas: string[];
}