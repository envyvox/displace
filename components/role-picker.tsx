"use client";

import { useEffect, useState } from "react";

import { useRoles } from "@/hooks/queries/use-roles";
import { MultiSelect } from "@/components/ui/multi-select";

type Props = {
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
};

const RolePicker = ({ setSelected }: Props) => {
  const { data: roles } = useRoles();
  const [selectedRoles, setSelectedRoles] = useState<
    Record<"key" | "label", string>[]
  >([]);

  useEffect(() => {
    setSelected(selectedRoles.map((role) => role.key));
  }, [selectedRoles, setSelected]);

  return (
    <MultiSelect
      values={roles?.map((role) => ({ key: role.id, label: role.name })) ?? []}
      selected={selectedRoles}
      setSelected={setSelectedRoles}
      placeholder="Выбери роли..."
    />
  );
};

export default RolePicker;
