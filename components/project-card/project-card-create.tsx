import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProjectCreateButton from "@/components/project-create/project-create-button";

const ProjectCardCreate = () => {
  return (
    <Card className="col-span-1 flex flex-col items-end justify-between">
      <CardHeader>
        <CardTitle>Есть идея?</CardTitle>
        <CardDescription>
          Создай собственный проект, опиши его и сможешь найти единомышленников
          для его воплощения!
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <ProjectCreateButton />
      </CardFooter>
    </Card>
  );
};

export default ProjectCardCreate;
