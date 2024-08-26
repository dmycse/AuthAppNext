'use client';

import { ReactNode } from "react";
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Header } from "@/components/auth/Header";
import { Social } from "@/components/auth/Social";
import { BackButton } from "@/components/auth/BackButton";

type CardWrapperProps = {
  headerLabel: string,
  backButtonLabel: string,
  backButtonHref: string,
  showSocial?: boolean,
  children: ReactNode,
};


export const CardWrapper = ({
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
  children
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter>
        {showSocial && <Social />}
      </CardFooter>
      <CardFooter>
        <BackButton 
          label={backButtonLabel}
          href={backButtonHref}
        />
      </CardFooter>
    </Card>
  )
}
