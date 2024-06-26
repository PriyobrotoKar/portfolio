import { AnimatePresence, cubicBezier, motion } from "framer-motion";
import { useEffect, useState } from "react";

const variants = {
  enter: {
    y: -20,
  },
  center: {
    y: 0,
  },
  exit: {
    y: 20,
  },
};

const TextLoop = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);

  const startInterval = (duration: number) => {
    return setInterval(() => {
      console.log("interval called", index);

      setIndex((prev) => {
        let next = prev + 1;
        if (next === words.length) {
          return 0;
        }
        return next;
      });
    }, duration);
  };

  useEffect(() => {
    let timeout = startInterval(3000);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden && timeout) {
        clearInterval(timeout);
      } else {
        timeout = startInterval(3000);
      }
    });

    return () => {
      timeout && clearInterval(timeout);
    };
  }, []);

  return (
    <div className="h-4 w-28 overflow-hidden  relative">
      <AnimatePresence>
        <motion.span
          variants={variants}
          key={index}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute will-change-transform text-muted-foreground text-sm"
          transition={{
            y: { type: "tween", duration: 2 },
            ease: cubicBezier(0, 0.8, 0.61, 0.91),
          }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default TextLoop;
