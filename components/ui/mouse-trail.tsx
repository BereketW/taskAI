"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function MouseTrail() {
  const [particles, setParticles] = useState<
    { x: number; y: number; id: number }[]
  >([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const newParticle = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      };

      setParticles((prevParticles) =>
        [...prevParticles, newParticle].slice(-20)
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        className="mouse-trail"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
        }}
        transition={{
          type: "spring",
          damping: 10,
          stiffness: 100,
          mass: 0.1,
        }}
      />
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: particle.x - 3,
              y: particle.y - 3,
              opacity: 1,
              scale: 1,
            }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="mouse-particle"
          />
        ))}
      </AnimatePresence>
    </>
  );
}
