
"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
// Updated import to directly target the component
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/icons";
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [renderAuth, setRenderAuth] = useState(false);

  const uiConfig = useMemo(() => ({
    signInFlow: 'popup',
    signInOptions: [
      EmailAuthProvider.PROVIDER_ID,
      GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => {
        // We handle redirect in useEffect, so FirebaseUI should not redirect.
        return false;
      }
    },
  }), []);

  useEffect(() => {
    // FirebaseUI only works on the client-side
    setRenderAuth(true);
  }, []);

  useEffect(() => {
    // Redirect to dashboard if user is logged in and initial auth check is complete.
    // This hook will trigger after a successful login on this page.
    if (!isLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  // If AuthProvider is still handling initial load, it shows a global loader.
  // This page (LoginPage) should only render if AuthProvider.isLoading is false and AuthProvider.user is null.
  // The useAuth() hook here reflects that state.

  // We only need a loader here if we are waiting for renderAuth (client-side FirebaseUI readiness).
  if (!renderAuth) {
     return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // If we reach here, AuthProvider determined the user is not logged in,
  // and renderAuth is true, so we can display the login form.
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16">
            <Logo />
          </div>
          <CardTitle className="text-3xl font-headline">Welcome to Retaliate CRM</CardTitle>
          <CardDescription>Sign in or create an account</CardDescription>
        </CardHeader>
        <CardContent>
          {/* renderAuth is true here */}
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </CardContent>
      </Card>
    </div>
  );
}
