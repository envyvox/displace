"use client";

import { OnboardingStep, useOnboardingStore } from "@/store/onboarding-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TypographyInlineCode from "@/components/typography/inline-code";
import TypographyLarge from "@/components/typography/large";
import TypographyMuted from "@/components/typography/muted";

const FormSchema = z.object({
  handle: z
    .string()
    .min(3, { message: "Имя пользователя не может быть менее 3 символов." })
    .max(16, { message: "Имя пользователя не может быть более 16 символов." }),
});

const OnboardingHandleForm = () => {
  const setHandle = useOnboardingStore((state) => state.setHandle);
  const setStep = useOnboardingStore((state) => state.setStep);
  const { handle } = useOnboardingStore((state) => state.Form);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      handle: handle,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setHandle(data.handle);
    setStep(OnboardingStep.Roles);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8"
      >
        <FormField
          control={form.control}
          name="handle"
          render={({ field }) => (
            <FormItem>
              <div className="mb-4 space-y-2">
                <TypographyLarge>Имя пользователя</TypographyLarge>
                <TypographyMuted>
                  Отображаемое имя пользователя. Ваш профиль так же будет
                  доступен по ссылке{" "}
                  <TypographyInlineCode>
                    displace.vercel.app/u/username
                  </TypographyInlineCode>
                  .
                </TypographyMuted>
                <TypographyMuted>Вы НЕ сможете изменить его.</TypographyMuted>
              </div>
              <FormControl>
                <Input {...field} type="text" placeholder="username" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="self-end">
          Далее
        </Button>
      </form>
    </Form>
  );
};

export default OnboardingHandleForm;
