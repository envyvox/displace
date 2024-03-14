import React from "react";

import { cn } from "@/lib/utils";

const TypographySmall = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <small
    ref={ref}
    className={cn("text-sm font-medium leading-none", className)}
    {...props}
  />
));
TypographySmall.displayName = "TypographySmall";

export default TypographySmall;
