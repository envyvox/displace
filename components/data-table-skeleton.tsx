import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  cols: number;
};

const renderColumns = (cols: number) => {
  return Array.from({ length: 10 }, (_, rowIndex) => (
    <tr key={rowIndex}>
      {Array.from({ length: cols }, (_, colIndex) => (
        <td key={colIndex}>
          <Skeleton className="m-4 h-[22px]" />
        </td>
      ))}
    </tr>
  ));
};

const DataTableSkeleton = ({ cols }: Props) => renderColumns(cols);

export default DataTableSkeleton;
