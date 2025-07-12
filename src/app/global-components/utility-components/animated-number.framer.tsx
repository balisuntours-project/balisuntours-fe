"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedNumber({
  value,
  formatFn,
  className = "",
  duration = 2,
}: {
  value: number;
  formatFn?: (val: number) => string;
  className?: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(value);
  const motionValue = useMotionValue(value);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration,
      onUpdate(latest) {
        setDisplay(latest);
      },
    });

    return controls.stop;
  }, [value, motionValue, duration]);

  return (
    <motion.span className={className}>
      {formatFn ? formatFn(display) : display}
    </motion.span>
  );
}
