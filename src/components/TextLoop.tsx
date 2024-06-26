import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const variants = {
  enter: {
    y: -20,
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
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
            y: { type: "spring", stiffness: 300, damping: 200 },
            opacity: { duration: 0.5 },
            ease: "easeInOut",
          }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default TextLoop;
