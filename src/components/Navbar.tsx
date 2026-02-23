import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > window.innerHeight * 2);
    });
  }, [scrollY]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300 pointer-events-auto"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-foresight-navy rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">F</span>
          </div>
          <span className="text-foresight-navy font-bold tracking-tight text-lg">
            FORESIGHT
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#dashboard" className="hover:text-foresight-orange transition-colors">Dashboard</a>
        </div>
      </div>
    </motion.nav>
  );
}
