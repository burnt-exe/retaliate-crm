import NextImage, { type ImageProps as NextImageProps } from 'next/image';
import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

// IMPORTANT: Please place your logo image in the `public` folder
// and ensure it is named `crs-logo.png` for this component to work.
const logoPath = "/crs-logo.png";

interface LogoProps {
  className?: string;
  priority?: NextImageProps['priority'];
}

export const Logo = ({ className, priority }: LogoProps) => {
  return (
    <div style={{ position: 'relative' }} className={cn("w-full h-full", className)}>
      <NextImage
        src={logoPath}
        alt="Retaliate CRM Logo"
        fill
        style={{ objectFit: 'contain' }}
        data-ai-hint="company logo"
        priority={priority}
      />
    </div>
  );
};

export const GoogleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    <path d="M1 1h22v22H1z" fill="none"/>
  </svg>
);

export const MicrosoftIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M11.4 21.9H2.1V12.6h9.3v9.3zm0-11.2H2.1V2.1h9.3v8.6zm10.5 11.2h-9.3V12.6h9.3v9.3zm0-11.2h-9.3V2.1h9.3v8.6z" />
  </svg>
);
