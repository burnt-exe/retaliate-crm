
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FirebaseUIModule from 'react-firebaseui'; // Use canonical default import, aliased for clarity
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/icons";
import { Loader2 } from 'lucide-react';

// Attempt to get the actual component, whether it's the direct import or on the .default property
const StyledFirebaseAuth = FirebaseUIModule.default || FirebaseUIModule;

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
    GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false, // We handle redirect in useEffect
  },
};

export default function LoginPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [renderAuth, setRenderAuth] = useState(false);

  useEffect(() => {
    // FirebaseUI only works on the client-side
    setRenderAuth(true);
  }, []);

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  if (isLoading || (!isLoading && user)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

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
          {renderAuth ? (
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
          ) : (
            <div className="flex justify-center py-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
