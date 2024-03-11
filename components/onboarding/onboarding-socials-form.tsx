"use client";

import { useRouter } from "next/navigation";
import { OnboardingStep, useOnboardingStore } from "@/store/onboarding-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Social } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useAddUserRoles } from "@/hooks/mutations/use-add-user-roles";
import { useAddUserSocial } from "@/hooks/mutations/use-add-user-socials";
import { useSetUserHandle } from "@/hooks/mutations/use-set-user-handle";
import { useSetUserOnboarding } from "@/hooks/mutations/use-set-user-onboarding";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import TypographyLarge from "../typography/large";
import TypographyMuted from "../typography/muted";
import { Input } from "../ui/input";

const FormSchema = z.object({
  telegram: z
    .union([
      z.string().length(0, {
        message: "Ссылка должна быть в формате https://t.me/username.",
      }),
      z.string().min(14).startsWith("https://t.me/"),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  linkedIn: z
    .union([
      z.string().length(0, {
        message:
          "Ссылка должна быть в формате https://www.linkedin.com/in/username.",
      }),
      z.string().min(29).startsWith("https://www.linkedin.com/in/"),
    ])
    .optional(),
  discord: z
    .union([
      z.string().length(0, {
        message: "Имя должно содержать от 2 до 32 символов.",
      }),
      z.string().min(2).max(32),
    ])
    .optional(),
});

const OnboardingSocialsForm = () => {
  const setSocials = useOnboardingStore((state) => state.setSocials);
  const setStep = useOnboardingStore((state) => state.setStep);
  const onboardingForm = useOnboardingStore((state) => state.Form);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: onboardingForm.socials,
  });
  const router = useRouter();
  const { mutate: setUserHandle } = useSetUserHandle();
  const { mutate: addUserRoles } = useAddUserRoles();
  const { mutate: addUserSocial } = useAddUserSocial();
  const { mutateAsync: setUserOnboarding } = useSetUserOnboarding();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setSocials(data);

    setUserHandle({ handle: onboardingForm.handle });
    addUserRoles({ rolesId: onboardingForm.roles });

    if (data.telegram) {
      addUserSocial({
        social: Social.Telegram,
        link: data.telegram,
      });
    }
    if (data.discord) {
      addUserSocial({
        social: Social.Discord,
        link: data.discord,
      });
    }
    if (data.linkedIn) {
      addUserSocial({
        social: Social.LinkedIn,
        link: data.linkedIn,
      });
    }

    await setUserOnboarding({ onboardingCompleted: true });

    router.push("/dashboard");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <div className="mb-4 space-y-2">
          <TypographyLarge>Мессенджеры и социальные сети</TypographyLarge>
          <TypographyMuted>
            Введите одну или несколько ссылок на свои мессенджеры и социальные
            сети для того чтобы остальные пользователи смогли связаться с вами.
          </TypographyMuted>
          <TypographyMuted>
            Вы сможете изменить это в своем профиле в любой момент.
          </TypographyMuted>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="telegram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telegram</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="https://t.me/username"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discord"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discord</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="username" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedIn"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>LinkedIn</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="https://www.linkedin.com/in/username"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-8 space-x-4 self-end">
          <Button variant="ghost" onClick={() => setStep(OnboardingStep.Roles)}>
            Назад
          </Button>
          <Button type="submit">Готово</Button>
        </div>
      </form>
    </Form>
  );
};

export default OnboardingSocialsForm;
