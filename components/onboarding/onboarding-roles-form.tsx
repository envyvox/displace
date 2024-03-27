"use client";

import { OnboardingStep, useOnboardingStore } from "@/store/onboarding-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import RolePicker from "@/components/role-picker";
import TypographyLarge from "@/components/typography/large";
import TypographyMuted from "@/components/typography/muted";

const FormSchema = z.object({
  roles: z.array(z.string()).refine((value) => value.some((role) => role), {
    message: "Необходимо выбрать как минимум 1 роль.",
  }),
});

const OnboardingRolesForm = () => {
  const setRoles = useOnboardingStore((state) => state.setRoles);
  const setStep = useOnboardingStore((state) => state.setStep);
  const { roles: formRoles } = useOnboardingStore((state) => state.Form);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      roles: formRoles,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setRoles(data.roles);
    setStep(OnboardingStep.Socials);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8"
      >
        <FormField
          control={form.control}
          name="roles"
          render={({ field }) => (
            <FormItem>
              <div className="mb-4 space-y-2">
                <TypographyLarge>Роли</TypographyLarge>
                <TypographyMuted>
                  Выбери одну или несколько ролей, которые тебя интересуют.
                </TypographyMuted>
                <TypographyMuted>
                  Вы сможете изменить это в своем профиле в любой момент.
                </TypographyMuted>
              </div>
              <RolePicker selected={field.value} setSelected={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 self-end">
          <Button
            variant="ghost"
            onClick={() => setStep(OnboardingStep.Handle)}
          >
            Назад
          </Button>
          <Button type="submit">Далее</Button>
        </div>
      </form>
    </Form>
  );
};

export default OnboardingRolesForm;
