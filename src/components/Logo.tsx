import React from "react";
import TextLoop from "./TextLoop";
import { roles } from "@/constants";

const Logo = () => {
  return (
    <div>
      <h1>Priyobroto.</h1>
      <TextLoop words={roles} />
    </div>
  );
};

export default Logo;
