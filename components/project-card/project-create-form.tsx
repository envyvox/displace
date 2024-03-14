import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useCreateProject } from "@/hooks/mutations/use-create-project";
import { Button } from "@/components/ui/button";
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

const FormSchema = z.object({
  name: z.string().min(1, { message: "Название проекта обязательно." }),
  description: z.string().min(1, { message: "Описание проекта обязательно." }),
  readMoreLink: z.string(),
});

type FormProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function ProjectCreateForm({ setOpen }: FormProps) {
  const { mutate: createProject } = useCreateProject();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      readMoreLink: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    createProject({
      name: data.name,
      description: data.description,
      readMoreLink: data.readMoreLink,
    });
    setOpen(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid items-start gap-4 px-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input id="name" placeholder="Project X" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание</FormLabel>
              <FormControl>
                <Textarea
                  id="description"
                  placeholder="Это проект моей мечты, я очень хочу его воплощать!"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="readMoreLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ссылка где можно узнать больше о проекте</FormLabel>
              <FormControl>
                <Input
                  id="readMoreLink"
                  placeholder="https://www.example.com/your-project"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Создать</Button>
      </form>
    </Form>
  );
}

export default ProjectCreateForm;
