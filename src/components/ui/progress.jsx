import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "../../lib/utils";

function Progress({ className, value = 0, theme = "#4caf50", ...props }) {
  // value: 0–100 oraliqda bo‘lishi kerak
  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-[#F8F4F0] relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full flex-1 transition-all duration-500 ease-in-out"
        style={{
          transform: `translateX(-${100 - clampedValue}%)`,
          backgroundColor: theme,
        }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
