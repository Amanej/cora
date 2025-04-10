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

    // console.log("PhoneNumberId ", phoneNumberId, "numbers", numbers)
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
                    {numbers.map((number: IPhoneNumber) => (
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
