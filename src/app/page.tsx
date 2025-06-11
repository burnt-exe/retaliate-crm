
"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
// Updated import to directly target the component
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { EmailAuthProvider, GoogleAuthProvider, PhoneAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/icons";
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { user, isLoading: authContextIsLoading } = useAuth();
  const [renderAuth, setRenderAuth] = useState(false);

  const uiConfig = useMemo(() => ({
    signInFlow: 'popup',
    signInSuccessUrl: '/dashboard', // FirebaseUI will redirect here
    signInOptions: [
      EmailAuthProvider.PROVIDER_ID,
      GoogleAuthProvider.PROVIDER_ID,
      {
        provider: PhoneAuthProvider.PROVIDER_ID,
        recaptchaParameters: {
          size: 'invisible',
          badge: 'bottomright'
        },
      }
    ],
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        // Return false to let FirebaseUI redirect to signInSuccessUrl.
        // If you need to do something with authResult, do it here.
        // For example, if you wanted to create a user profile in Firestore:
        // if (authResult.additionalUserInfo?.isNewUser) { /* create profile */ }
        return false;
      }
    },
  }), []);

  useEffect(() => {
    // FirebaseUI only works on the client-side
    setRenderAuth(true);
  }, []);

  // If auth context is still loading, or if FirebaseUI is not ready to be rendered yet,
  // or if user is logged in (FirebaseUI should be handling/have handled redirect), show a loader.
  if (authContextIsLoading || !renderAuth || user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // At this point:
  // - authContextIsLoading is false (auth state resolved)
  // - renderAuth is true (client-side ready for FirebaseUI)
  // - user is null (not logged in)
  // So, we should render the login form.
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16">
            <Logo sizes="64px"/>
          </div>
          <CardTitle className="text-3xl font-headline">Welcome to Retaliate CRM</CardTitle>
          <CardDescription>Sign in or create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </CardContent>
      </Card>
    </div>
  );
}
