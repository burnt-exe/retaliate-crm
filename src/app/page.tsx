
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
  }, [user, isLoading, router, renderAuth]); // Added renderAuth to dependency array

  // Loader for when FirebaseUI is not yet ready to render (client-side only check).
  // This is displayed before StyledFirebaseAuth is mounted.
  if (!renderAuth) {
     return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // If we reach here, AuthProvider determined the user is not logged in (isLoading is false and user is null),
  // and renderAuth is true, so we can display the login form.
  // The AuthProvider handles the global loading screen for initial auth state resolution.
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
          {/* renderAuth is true here, so StyledFirebaseAuth can be rendered */}
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </CardContent>
      </Card>
    </div>
  );
}

