"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0 grid-pattern opacity-20"
        style={{
          x: mousePosition.x,
          y: y1,
        }}
      />
      <motion.div
        className="absolute inset-0 dot-pattern opacity-10"
        style={{
          x: mousePosition.x * -0.5,
          y: y2,
        }}
      />
      <motion.div
        className="absolute inset-0 hexagon-pattern opacity-5"
        style={{
          x: mousePosition.x * 0.2,
          y: y3,
        }}
      />
    </div>
  );
}
