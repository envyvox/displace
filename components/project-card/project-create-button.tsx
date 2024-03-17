"use client";

import { useState } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";

import ProjectCreateDrawer from "./project-create-drawer";
import ProjectCreateSheet from "./project-create-sheet";

const ProjectCreateButton = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return isDesktop ? (
    <ProjectCreateSheet open={open} setOpen={setOpen} />
  ) : (
    <ProjectCreateDrawer open={open} setOpen={setOpen} />
  );
};

export default ProjectCreateButton;
