'use client';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import APP_CONFIG from "@/lib/config";
import { useSearchParams } from "next/navigation"
import { useState, Suspense } from "react"

function VerificationContent() {
  const searchParams = useSearchParams();
  const callId = searchParams.get('callId');
  const phoneNumber = searchParams.get('phonenumber');
  const [status, setStatus] = useState<'pending' | 'confirmed' | 'failed'>('pending');

  const handleVerification = async () => {
    try {
      const response = await fetch(`${APP_CONFIG.backendUrl}/integrations/lea/verify-call`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callId, phoneNumber }),
      });

      if (!response.ok) {
        throw new Error('Verification failed');
      }

      setStatus('confirmed');
    } catch (error) {
      console.error('Verification error:', error);
      setStatus('failed');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Verify your call</CardTitle>
          <CardDescription>
            Please confirm your phone number: {phoneNumber}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === 'pending' && (
            <Button 
              className="w-full" 
              onClick={handleVerification}
              size="lg"
            >
              Confirm
            </Button>
          )}
          {status === 'confirmed' && (
            <div className="text-center text-green-600 font-medium py-4">
              Your call has been verified successfully!
            </div>
          )}
          {status === 'failed' && (
            <div className="text-center text-red-600 font-medium py-4">
              Failed to verify your call. Please try again.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function VerificationPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Loading...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    }>
      <VerificationContent />
    </Suspense>
  )
}
