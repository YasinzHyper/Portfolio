"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const RippleGrid = React.memo(
  ({ className }: { className?: string }) => {
    return (
      <div
        className={cn(
          "absolute inset-0 overflow-hidden",
          className
        )}
      >
        {/* Grid pattern only */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>
    );
  }
);

RippleGrid.displayName = "RippleGrid";
