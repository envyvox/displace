"use client";

import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Github } from "lucide-react";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import TypographyLarge from "@/components/typography/large";

const ProviderIcon: Record<string, React.ReactElement> = {
  Google: (
    <Image
      src="/google.png"
      alt="Google"
      width={20}
      height={20}
      className="mr-2"
    />
  ),
  GitHub: <Github className="mr-2" />,
};

const AuthError = () => {
  const params = useSearchParams();
  const error = params.get("error");

  return error && <div className="col-span-2 text-destructive">{error}</div>;
};

const LoginPage = () => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();

  useEffect(() => {
    const loadData = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    loadData();
  }, []);

  return (
    <Suspense>
      <main className="-mt-24 flex min-h-screen flex-col items-center justify-center">
        <TypographyLarge>Войти в Displace</TypographyLarge>
        <div className="mt-8 flex w-[150px] flex-col gap-2">
          {providers ? (
            Object.values(providers).map((provider) => (
              <Button
                key={provider.name}
                variant="secondary"
                onClick={() =>
                  signIn(provider.id, { callbackUrl: "/dashboard" })
                }
              >
                {ProviderIcon[provider.name]}
                {provider.name}
              </Button>
            ))
          ) : (
            <>
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
            </>
          )}
        </div>
        <AuthError />
      </main>
    </Suspense>
  );
};

export default LoginPage;
