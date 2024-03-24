"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/user-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Social } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useAddUserRoles } from "@/hooks/mutations/use-add-user-roles";
import { useAddUserSocial } from "@/hooks/mutations/use-add-user-socials";
import { useRemoveUserRoles } from "@/hooks/mutations/use-remove-user-roles";
import { useRemoveUserSocial } from "@/hooks/mutations/use-remove-user-social";
import { useRoles } from "@/hooks/queries/use-roles";
import { useUserRoles } from "@/hooks/queries/use-user-roles";
import { useUserSocials } from "@/hooks/queries/use-user-socials";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import TypographyLarge from "@/components/typography/large";

const formSchema = z.object({
  roles: z.array(z.string()).refine((value) => value.some((role) => role), {
    message: "Необходимо выбрать как минимум 1 направление.",
  }),
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

const SettingsPage = () => {
  const user = useUserStore((state) => state.user);
  const { data: userRoles } = useUserRoles(user?.id);
  const { data: userSocials } = useUserSocials(user?.id);
  const { data: roles } = useRoles();

  const { mutate: removeUserRoles } = useRemoveUserRoles();
  const { mutate: addUserRoles } = useAddUserRoles();
  const { mutate: addUserSocial } = useAddUserSocial();
  const { mutate: removeUserSocial } = useRemoveUserSocial();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roles: [],
      telegram: "",
      linkedIn: "",
      discord: "",
    },
  });

  useEffect(() => {
    form.setValue("roles", userRoles?.map(({ role }) => role.id) ?? []);
  }, [userRoles, form]);

  useEffect(() => {
    // TODO: something more elegant
    form.setValue(
      "telegram",
      userSocials?.find(({ social }) => social === Social.Telegram)?.link ?? ""
    );
    form.setValue(
      "discord",
      userSocials?.find(({ social }) => social === Social.Discord)?.link ?? ""
    );
    form.setValue(
      "linkedIn",
      userSocials?.find(({ social }) => social === Social.LinkedIn)?.link ?? ""
    );
  }, [userSocials, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const rolesToRemove = userRoles!
      .filter(
        ({ role }) =>
          userRoles!.some(({ role: r }) => r.id === role.id) &&
          !values.roles.includes(role.id)
      )
      .map(({ role }) => role.id);

    if (rolesToRemove.length > 0) {
      removeUserRoles({ rolesId: rolesToRemove });
    }
    addUserRoles({ rolesId: values.roles });

    // TODO: that's ai generated, don't do it like that
    const existingSocials = userSocials?.reduce(
      (prev, cur) => {
        prev[cur.social] = cur.link;
        return prev;
      },
      {} as Record<Social, string>
    );
    const toAdd = {
      [Social.Telegram]: values.telegram,
      [Social.Discord]: values.discord,
      [Social.LinkedIn]: values.linkedIn,
    };
    const toRemove = Object.entries(existingSocials ?? {})
      .filter(([k, v]) => toAdd[k as Social] !== v)
      .map(([k]) => k);
    const toUpdate = Object.entries(toAdd)
      .filter(([k, v]) => existingSocials?.[k as Social] !== v)
      .map(([k, v]) => ({
        social: k as Social,
        link: v,
      }));
    toRemove.forEach((social) =>
      removeUserSocial({ social: social as Social })
    );
    toUpdate.forEach(({ social, link }) =>
      addUserSocial({ social: social, link: link as string })
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-w-3xl flex-col space-y-8"
      >
        <FormField
          control={form.control}
          name="roles"
          render={({ field }) => (
            <FormItem>
              <TypographyLarge>Направления</TypographyLarge>
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
        <div className="flex flex-col gap-2">
          <TypographyLarge>Мессенджеры и социальные сети</TypographyLarge>
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
        <Button className="self-end" type="submit">
          Сохранить
        </Button>
      </form>
    </Form>
  );
};

export default SettingsPage;
