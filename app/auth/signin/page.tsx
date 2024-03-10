"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SignInPage = () => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();
  const params = useSearchParams();
  const error = params.get("error");

  useEffect(() => {
    const loadData = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    loadData();
  }, []);

  return (
    <main className="container py-6">
      <Card className="grid p-6 sm:grid-cols-2">
        <div className="flex flex-col items-center justify-center">
          <div>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Войти в систему</CardTitle>
              <CardDescription>
                Используя один из следующих сервисов:
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-5">
              {providers ? (
                Object.values(providers).map((provider) => (
                  <Button
                    key={provider.name}
                    variant="outline"
                    onClick={() =>
                      signIn(provider.id, { callbackUrl: "/dashboard" })
                    }
                  >
                    {provider.name}
                  </Button>
                ))
              ) : (
                <>
                  <Skeleton className="h-10" />
                  <Skeleton className="h-10" />
                </>
              )}
              {error && (
                <div className="col-span-2 text-destructive">{error}</div>
              )}
            </CardContent>
          </div>
        </div>
      </Card>
    </main>
  );
};

export default SignInPage;
