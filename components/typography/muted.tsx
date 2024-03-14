import React from "react";

import { cn } from "@/lib/utils";

const TypographyMuted = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
TypographyMuted.displayName = "TypographyMuted";

export default TypographyMuted;
