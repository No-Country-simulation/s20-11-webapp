import { forwardRef } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import { Button } from "./ui/button";

export const MobileButton = forwardRef(({ Icon, label, ...props }, ref) => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <div className="fixed bottom-4 right-4 bg-gradient-to-br from-tertiary via-primary shadow-lg to-tertiary  p-[2px] rounded-full active:scale-125 transition-all duration-300 rotate">
          <Button
            ref={ref}
            size="icon"
            className="!rounded-full !p-6 shadow-2xl"
            {...props}
          >
            <span className="sr-only">{label}</span>
            {Icon && <Icon size={24} />}
          </Button>
        </div>
      ) : (
        <Button
          ref={ref}
          variant="outline"
          className="w-full sm:w-auto"
          {...props}
        >
          {Icon && <Icon />}
          {label}
        </Button>
      )}
    </>
  );
});

MobileButton.displayName = "MobileButton";
