import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ProjectCreateForm from "./project-create-form";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProjectCreateDialog = ({ open, setOpen }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Создать проект</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Создание проекта</DialogTitle>
          <DialogDescription>
            Опиши свой проект чтобы заинтересовать в нем других пользователей.
          </DialogDescription>
        </DialogHeader>
        <ProjectCreateForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default ProjectCreateDialog;
