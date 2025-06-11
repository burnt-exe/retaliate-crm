
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
    // Redirect to dashboard if user is logged in, auth check is complete, and FirebaseUI is ready to be rendered.
    if (!isLoading && user && renderAuth) {
      // Push navigation to the next tick of the event loop
      // This can help prevent race conditions with FirebaseUI cleanup
      const timerId = setTimeout(() => {
        router.push('/dashboard');
      }, 0);
      return () => clearTimeout(timerId); // Cleanup timer if component unmounts
    }
  }, [user, isLoading, router, renderAuth]);

  // Case 1: Waiting for FirebaseUI to be ready for client-side rendering.
  // This is displayed before StyledFirebaseAuth is mounted.
  if (!renderAuth) {
     return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // Case 2: Auth state has resolved, user is now logged in, and FirebaseUI was ready (renderAuth is true).
  // Navigation is imminent due to the useEffect above.
  // Render a loader here to ensure StyledFirebaseAuth is unmounted by this component's logic
  // before the router unmounts the entire page.
  if (!isLoading && user) { // renderAuth is implicitly true here if we passed Case 1
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Signing in, please wait...</p>
      </div>
    );
  }
  
  // Case 3: FirebaseUI is ready (renderAuth is true), and user is NOT logged in.
  // (The global AuthProvider handles the initial loading screen if isLoading is true from the start).
  // This is the state where we should show the login form.
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
          {/* renderAuth is guaranteed to be true here, so StyledFirebaseAuth can be rendered */}
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </CardContent>
      </Card>
    </div>
  );
}
