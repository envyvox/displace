import { useState } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";

import ProjectCreateDialog from "./project-create-dialog";
import ProjectCreateDrawer from "./project-create-drawer";

const ProjectCreateButton = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return isDesktop ? (
    <ProjectCreateDialog open={open} setOpen={setOpen} />
  ) : (
    <ProjectCreateDrawer open={open} setOpen={setOpen} />
  );
};

export default ProjectCreateButton;
