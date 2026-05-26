"use client";

import { useState, useEffect, useRef } from "react";

export function useScrollThreshold() {
  const [hasReached, setHasReached] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          setHasReached(true);
        }
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "0px",
      }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, []);

  return { sentinelRef, hasReached };
}
