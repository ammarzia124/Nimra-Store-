"use client";

import React from "react";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";
import LeadMagnet from "./LeadMagnet";

const LeadMagnetManager: React.FC = () => {
  const { sentinelRef, hasReached } = useScrollThreshold();

  return (
    <>
      {/* Sentinel placed at 40% of the viewport height down the page 
          We'll use a fixed position sentinel or a calculated one.
          Actually, we want 40% of the TOTAL PAGE height.
      */}
      <div 
        ref={sentinelRef} 
        className="absolute w-full pointer-events-none" 
        style={{ top: "40%" }}
        aria-hidden="true"
      />
      
      <LeadMagnet isVisible={hasReached} />
    </>
  );
};

export default LeadMagnetManager;
