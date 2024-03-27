import { Card, CardDescription, CardHeader } from "@/components/ui/card";

const ProjectDetailNotFound = () => {
  return (
    <div className="-mt-24 flex min-h-screen items-center justify-center">
      <Card className="max-w-3xl ">
        <CardHeader>
          <CardDescription>
            Проект с таким идентификатором не найден.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ProjectDetailNotFound;
