import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const ContactForm = () => {
  return (
    <form className="space-y-6">
      <div className="space-y-4">
        <div className="flex gap-4">
          <Input type="text" placeholder="Name" />
          <Input type="email" placeholder="Email" />
        </div>
        <Textarea placeholder="Message..." />
      </div>
      <Button className="w-full">Submit</Button>
    </form>
  );
};

export default ContactForm;
