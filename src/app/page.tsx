
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
  const { user, isLoading: authContextIsLoading } = useAuth(); // Renamed to avoid confusion
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
    if (!authContextIsLoading && user && renderAuth) {
      // Push navigation to the next tick of the event loop
      // This can help prevent race conditions with FirebaseUI cleanup
      const timerId = setTimeout(() => {
        router.push('/dashboard');
      }, 0);
      return () => clearTimeout(timerId); // Cleanup timer if component unmounts
    }
  }, [user, authContextIsLoading, router, renderAuth]);

  // Case 1: Waiting for FirebaseUI to be ready for client-side rendering.
  if (!renderAuth) {
     return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // Case 2: Render the login form if client-side is ready, auth state is resolved, and no user is present.
  // The navigation effect (`useEffect` above) handles the case where a user becomes present.
  // The AuthProvider higher up handles the initial global loading screen (`authContextIsLoading`).
  if (renderAuth && !authContextIsLoading && !user) {
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
            {/* renderAuth is guaranteed to be true here, so StyledFirebaseAuth can be rendered */}
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Fallback: If renderAuth is true, but conditions for login form are not met.
  // This typically means authContextIsLoading is true (covered by AuthProvider's global loader) 
  // OR user is present (and navigation useEffect is about to redirect).
  // This loader acts as a placeholder during these brief transient states if not covered by AuthProvider.
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="ml-4 text-muted-foreground">Loading...</p>
    </div>
  );
}
