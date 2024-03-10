"use client";

import { OnboardingStep, useOnboardingStore } from "@/store/onboarding-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useRoles } from "@/hooks/queries/use-roles";

import TypographyLarge from "../typography/large";
import TypographyMuted from "../typography/muted";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const FormSchema = z.object({
  roles: z.array(z.string()).refine((value) => value.some((role) => role), {
    message: "Необходимо выбрать как минимум 1 направление.",
  }),
});

const OnboardingRolesForm = () => {
  const setRoles = useOnboardingStore((state) => state.setRoles);
  const setStep = useOnboardingStore((state) => state.setStep);
  const { roles: formRoles } = useOnboardingStore((state) => state.Form);
  const { data: roles } = useRoles();
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
                <TypographyLarge>Направления</TypographyLarge>
                <TypographyMuted>
                  Выбери одно или несколько направлений, которые тебя
                  интересуют.
                </TypographyMuted>
                <TypographyMuted>
                  Вы сможете изменить это в своем профиле в любой момент.
                </TypographyMuted>
              </div>
              <div className="grid max-w-[500px] grid-cols-2 gap-8">
                {roles &&
                  roles.map((role) => (
                    <FormItem
                      key={role.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(role.id)}
                          onCheckedChange={(checked: boolean) => {
                            return checked
                              ? field.onChange([...field.value, role.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== role.id
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-medium leading-none">
                        {role.name}
                      </FormLabel>
                    </FormItem>
                  ))}
              </div>
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
