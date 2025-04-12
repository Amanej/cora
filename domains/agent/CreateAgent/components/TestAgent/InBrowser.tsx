'use client'

import { Button } from "@/components/ui/button";
import { Variable } from "@/domains/agent/utils";
import APP_CONFIG from "@/lib/config";
import Vapi from "@vapi-ai/web";
import { useState } from "react";

const vapi = new Vapi(APP_CONFIG.vapiPublicApiKey || "");

type Props = {
    assistantId?: string;
    variables?: Record<string, string>;
}

const InBrowser = ({ assistantId, variables }: Props) => {
    const [active, setActive] = useState(false);
    const [initiated, setInitiated] = useState(false);

    const startCall = async () => {
        console.log("Assistant ID", assistantId);
        await vapi.start(assistantId, {
            variableValues: variables
        });
        setInitiated(true);
    }

    vapi.on("call-end", () => {
        console.log("Call has ended.");
        setActive(false);
        setInitiated(false);
    });

    vapi.on("call-start", () => {
        console.log("Call has started.");
        setActive(true);
    });

    const stopCall = async () => {
        vapi.stop();
    }

    return (
        <Button variant="outline" onClick={() => {
            active ? stopCall() : startCall()
        }} className="flex items-center gap-2">
            {active && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
            {active ? "Stop conversation" : initiated ? "Calling..." : "Test in browser"}
        </Button>
    )
}

export default InBrowser;
