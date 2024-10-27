import { useState } from "react";
import TextLoop from "./TextLoop";
import { roles } from "@/constants";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

const navLinks = [
  {
    label: "Work",
    link: "/",
  },
  {
    label: "About",
    link: "/",
  },
  {
    label: "Contact",
    link: "/",
  },
];

const Header = () => {
  const [toggleHeader, setToggleHeader] = useState(false);

  const handleToggleHeader = () => {
    setToggleHeader(!toggleHeader);
  };

  return (
    <motion.header
      layout
      className={cn(
        "max-w-screen-lg  items-center space-y-8 px-6 py-8 mx-auto border-b border-transparent transition-[colors,backdrop-filter] duration-300 md:duration-0 fixed w-full inset-x-0 top-0 backdrop-blur-noner z-40",
        toggleHeader &&
          "bg-black/70 border-border md:bg-transparent backdrop-blur-lg"
      )}
    >
      <motion.div layout className="flex justify-between">
        <Logo />
        <nav className="space-x-2 hidden md:block">
          <a href="/projects">
            <Button variant={"secondary"}>Work</Button>
          </a>
          <Button variant={"secondary"}>About</Button>
          <Button>Contact</Button>
        </nav>
        {/* // TODO: Animate the hamberger icon */}
        <Button
          onClick={handleToggleHeader}
          className="md:hidden"
          variant={"secondary"}
          size={"icon"}
        >
          <Menu size={18} />
        </Button>
      </motion.div>
      {toggleHeader && (
        <div className="md:hidden">
          <nav>
            <ul className="space-y-2 text-lg ">
              {navLinks.map((link, i) => {
                return (
                  <motion.li
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * (i + 1) }}
                  >
                    {link.label}
                  </motion.li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </motion.header>
  );
};

export default Header;
