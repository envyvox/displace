import { Card, CardHeader } from "@/components/ui/card";
import Bagdes from "@/components/bagdes";
import TypographyLarge from "@/components/typography/large";

type Props = {
  stack: string[];
  isLoading: boolean;
};

const ProjectDetailStack = ({ stack, isLoading }: Props) => {
  // TODO: add skeleton on loading
  return (
    <Card className="h-fit md:max-w-md">
      <CardHeader>
        <TypographyLarge>Используемые технологии</TypographyLarge>
        <Bagdes
          values={stack.map((s, index) => ({ key: s + index, value: s }))}
          displayCount={Infinity}
        />
      </CardHeader>
    </Card>
  );
};

export default ProjectDetailStack;
