"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Skeleton } from "./skeleton";

type Value = Record<"key" | "label", string>;

type Props = {
  values: Value[];
  preselected: Value[];
  emitSelected: (selected: Value[]) => void;
  placeholder?: string;
  isLoading?: boolean;
};

export function MultiSelect({
  values,
  preselected,
  emitSelected,
  placeholder = "Выбери из списка...",
  isLoading = false,
}: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [selected, setSelected] = React.useState<
    Record<"key" | "label", string>[]
  >([]);

  React.useEffect(() => {
    if (selected.length === 0 && selected.length !== preselected.length) {
      setSelected(preselected);
    }
  }, [preselected, selected.length]);

  React.useEffect(() => {
    emitSelected(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const handleUnselect = React.useCallback(
    (selected: Value) => {
      setSelected((prev) => prev.filter((s) => s.label !== selected.label));
    },
    [setSelected]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [setSelected]
  );

  const selectables = values.filter(
    (v) => !selected.some((s) => s.key === v.key)
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-2">
          {isLoading ? (
            <>
              <Skeleton className="h-[22px] w-16 rounded-full" />
              <Skeleton className="h-[22px] w-16 rounded-full" />
              <Skeleton className="h-[22px] w-16 rounded-full" />
              <Skeleton className="h-[22px] w-16 rounded-full" />
            </>
          ) : (
            selected.map((value) => (
              <Badge key={value.key} variant="secondary">
                {value.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(value);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(value)}
                >
                  <X className="size-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            ))
          )}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandList>
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((value) => (
                  <CommandItem
                    key={value.key}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={(v) => {
                      setInputValue("");
                      setSelected((prev) => [...prev, value]);
                    }}
                    className={"cursor-pointer"}
                  >
                    {value.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </div>
        ) : null}
      </div>
    </Command>
  );
}
