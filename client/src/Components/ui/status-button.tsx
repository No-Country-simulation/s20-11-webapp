import { cn } from "@/lib/utils";
import { Check, LoaderCircle, X } from "lucide-react";
import React from "react";
import { useSpinDelay } from "spin-delay";
import { Button, ButtonProps } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

export const StatusButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & {
    status: "pending" | "success" | "error" | "idle";
    message?: string | null;
    spinDelay?: Parameters<typeof useSpinDelay>[1];
    icon?: React.ElementType;
  }
>(
  (
    { message, status, className, children, icon, spinDelay, ...props },
    ref
  ) => {
    const delayedPending = useSpinDelay(status === "pending", {
      delay: 400,
      minDuration: 300,
      ...spinDelay,
    });
    const companion = {
      pending: delayedPending ? (
        <div
          role="status"
          className="inline-flex h-6 w-6 items-center justify-center"
        >
          <LoaderCircle className="animate-spin" />
        </div>
      ) : null,
      success: (
        <div
          role="status"
          className="inline-flex h-6 w-6 items-center justify-center"
        >
          <Check name="check" />
        </div>
      ),
      error: (
        <div
          role="status"
          className="inline-flex h-6 w-6 items-center justify-center  "
        >
          <X className="text-destructive" />
        </div>
      ),
      idle: icon ? (
        <div
          role="status"
          className="inline-flex h-6 w-6 items-center justify-center  "
        >
          {React.createElement(icon)}
        </div>
      ) : null,
    }[status];

    return (
      <Button
        ref={ref}
        className={cn("flex justify-center gap-2", className)}
        {...props}
      >
        <div>{children}</div>
        {message ? (
          <Tooltip>
            <TooltipTrigger>{companion}</TooltipTrigger>
            <TooltipContent>{message}</TooltipContent>
          </Tooltip>
        ) : (
          companion
        )}
      </Button>
    );
  }
);
StatusButton.displayName = "Button";
