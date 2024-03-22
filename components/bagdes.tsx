import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  values: { key: string; value: string }[];
  displayCount?: number;
};

const Bagdes = ({ values, displayCount = 3 }: Props) => {
  return (
    <div className="flex flex-wrap gap-2">
      {values.slice(0, displayCount).map(({ key, value }) => (
        <Badge key={key} variant="secondary">
          {value}
        </Badge>
      ))}
      {values.length > displayCount && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge variant="secondary">
                +{values.slice(displayCount).length}
              </Badge>
            </TooltipTrigger>
            <TooltipContent className="flex max-w-64 flex-wrap gap-2 p-2">
              {values.slice(displayCount).map(({ key, value }) => (
                <Badge key={key} variant="secondary">
                  {value}
                </Badge>
              ))}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default Bagdes;
