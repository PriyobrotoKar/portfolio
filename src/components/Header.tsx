import React, { useState } from "react";
import TextLoop from "./TextLoop";
import { roles } from "@/constants";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { HamIcon, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

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
        "max-w-screen-md  items-center space-y-6 p-6 mx-auto transition-colors duration-300 md:duration-0",
        toggleHeader && "bg-black/50 md:bg-transparent"
      )}
    >
      <motion.div layout className="flex justify-between">
        <div>
          <h1 className="text-white text-lg">Priyobroto.</h1>
          <TextLoop words={roles} />
        </div>
        <nav className="space-x-2 hidden md:block">
          <Button variant={"secondary"}>Work</Button>
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
