import { cn } from "@/lib/utils";
import React, { type ReactNode } from "react";

type AnimatedBorderCardProps = {
  children: ReactNode;
  active: boolean;
};

const AnimatedBorderCard = ({ children, active }: AnimatedBorderCardProps) => {
  return (
    <div className="p-0.5 bg-border h-full   rounded-xl relative overflow-hidden group">
      <span
        className={cn(
          "w-40 h-10 rounded-full bg-white  absolute bottom-full transition-all blur-lg opacity-0   group-hover:paused  hidden",
          active && "animate-border block "
        )}
      ></span>
      <div
        className={cn(
          "max-w-xs relative z-10 h-full space-y-4 bg-[radial-gradient(79.87%_66.06%_at_44.64%_34.16%,#07090A_0%,#101315_100%)] p-8   rounded-[calc(0.75rem-0.125rem)]"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default AnimatedBorderCard;
