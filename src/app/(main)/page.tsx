"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MainPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-full">
      <p>Loading your dashboard...</p>
    </div>
  );
}
