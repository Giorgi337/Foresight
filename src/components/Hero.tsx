import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useRef, useMemo, useState, useEffect } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 24 frames
  const frameCount = 24;
  const frames = useMemo(() => {
    return Array.from({ length: frameCount }, (_, i) =>
      `/assets/logo-animation/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`
    );
  }, []);

  // Preload images to avoid flickering
  useEffect(() => {
    frames.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [frames]);

  const [currentFrame, setCurrentFrame] = useState(frames[0]);

  // Map scroll progress (0 to 0.8) to frame index
  // We leave 0.8 to 1.0 for the hero to fade out/scale down before moving to next content
  const frameIndex = useTransform(scrollYProgress, [0, 0.8], [0, frameCount - 1]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const index = Math.round(latest);
    if (frames[index]) {
      setCurrentFrame(frames[index]);
    }
  });

  // Fade out and scale down the whole sticky content as we reach the end of the scroll container
  const containerOpacity = useTransform(scrollYProgress, [0.8, 0.9], [1, 0]);
  const containerScale = useTransform(scrollYProgress, [0.8, 0.9], [1, 0.8]);
  const containerY = useTransform(scrollYProgress, [0.8, 1], [0, -100]);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-white">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: containerOpacity, scale: containerScale, y: containerY }}
          className="flex flex-col items-center justify-center z-10 w-full px-6"
        >
          {/* Logo container with Navy Border - Further reduced size for perfect fit */}
          <div className="relative p-1 md:p-2 border-2 md:border-[3px] border-foresight-navy bg-white shadow-lg overflow-hidden">
            <div className="w-[280px] sm:w-[450px] md:w-[650px] aspect-[16/7] flex items-center justify-center overflow-hidden relative">
              <img
                src={currentFrame}
                alt="Foresight Logo Animation"
                className="absolute w-[92%] h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-[52%] max-w-none"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
          className="absolute bottom-12 flex flex-col items-center gap-2 text-foresight-navy font-medium tracking-widest uppercase"
        >
          <span>Scroll Down</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 text-foresight-orange" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
