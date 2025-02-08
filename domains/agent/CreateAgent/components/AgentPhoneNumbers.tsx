'use client'

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/domains/auth/state/AuthContext";
import { fetchUserPhoneNumbers } from "@/domains/phonenumber/api";
import { IPhoneNumber } from "@/domains/phonenumber/types";
import SelectedNumberToolTip from "@/domains/phonenumber/components/agent/selectedNumberToolTip";

interface AgentPhoneNumbersProps {
    agentId?: string;
    isIncoming: boolean;
    phoneNumberId?: string;
    setPhoneNumberId: (id: string) => void;
}


type PhoneNumberOption = {
    number: string;
    externalId: string;
    countryCode: string;
}

const PHONENUMBER_OPTIONS: PhoneNumberOption[] = [
    {
      number: "+12056971654",
      externalId: "e354916c-659a-489e-b141-a1e0ddb13712",
      countryCode: "US",
    },
    {
      number: "+4732994591",
      externalId: "c8471c8c-133f-4df2-abab-b1ad4d7cf59d",
      countryCode: "NO",
    },
    {
      number: "+4732994597",
      externalId: "e31add50-a0c2-4c0f-bb10-5518b198ad2f",
      countryCode: "NO",
    }
  ]
  

export default function AgentPhoneNumbers({ agentId, isIncoming, phoneNumberId, setPhoneNumberId }: AgentPhoneNumbersProps) {

    const { token } = useAuth();
    const [numbers, setNumbers] = useState<IPhoneNumber[]>([]);

    const fetchNumbers = async (token: string) => {
        const numbers = await fetchUserPhoneNumbers(token);
        console.log('Fetched phone numbers:', numbers);
        setNumbers(numbers);
    };

    useEffect(() => {
        if (token) {
            fetchNumbers(token);
        }
    }, [token]);

    const selectedNumber = numbers.find(number => number.externalId === phoneNumberId);
    const isCurrentPhoneNumber = selectedNumber?.agentId === agentId;
    const selectedNumberHasAgent = selectedNumber?.agentId !== null;

    const selectedNumberHasDifferentAgent = !isCurrentPhoneNumber && selectedNumberHasAgent && isIncoming;

    console.log("PhoneNumberId ", phoneNumberId, "numbers", numbers)
    return (
        <div className="space-y-2">
            <Label htmlFor="phone">Phone number</Label>
            <Select
                value={phoneNumberId}
                onValueChange={setPhoneNumberId}
            >
                <SelectTrigger id="phone">
                    <SelectValue placeholder="Select a phone number" />
                </SelectTrigger>
                <SelectContent>
                    {PHONENUMBER_OPTIONS.map((number: PhoneNumberOption) => (
                        <SelectItem key={number.externalId} value={number.externalId}>
                            {number.number}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {selectedNumberHasDifferentAgent && (
                <SelectedNumberToolTip hasExistingAgent={selectedNumberHasDifferentAgent} onOverwriteChange={() => {}} />
            )}
        </div>
    )
}
