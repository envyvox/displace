"use client";

import { useRoles } from "@/hooks/queries/use-roles";
import { MultiSelect } from "@/components/ui/multi-select";

type Props = {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
};

const RolePicker = ({ selected, setSelected }: Props) => {
  const { data: roles, isLoading } = useRoles();

  return (
    <MultiSelect
      values={roles?.map((role) => ({ key: role.id, label: role.name })) ?? []}
      preselected={selected.map((role) => ({
        key: role,
        label: roles?.find((r) => r.id === role)?.name ?? "",
      }))}
      emitSelected={(selected) => setSelected(selected.map((s) => s.key))}
      placeholder="Выбери роли..."
      isLoading={isLoading}
    />
  );
};

export default RolePicker;
