import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import React from "react";

const TabsSwitch = () => {
  return (
    <Tabs defaultValue="personal" className="text-center mb-16">
      <TabsList className="p-1.5 h-fit border border-border">
        <TabsTrigger value="personal" className="text-base">
          Personal
        </TabsTrigger>
        <TabsTrigger value="client" className="text-base">
          Clients
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
};

export default TabsSwitch;
