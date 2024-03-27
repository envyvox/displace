import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import ProjectCreateForm from "./project-create-form";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProjectCreateSheet = ({ open, setOpen }: Props) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Создать проект</Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-3/4 w-3/4">
        <SheetHeader>
          <SheetTitle>Создание проекта</SheetTitle>
          <SheetDescription>
            Опиши свой проект чтобы заинтересовать в нем других пользователей.
          </SheetDescription>
        </SheetHeader>
        <ProjectCreateForm setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
};

export default ProjectCreateSheet;
