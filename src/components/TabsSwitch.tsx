import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import React from 'react'

const TabsSwitch = ({
  setActiveTab
}: {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}) => {
  return (
    <Tabs
      className="text-center mb-16"
      onValueChange={(value) => setActiveTab(value)}
      defaultValue="Personal"
    >
      <TabsList className="p-1.5 h-fit border border-border">
        <TabsTrigger value="Personal" className="text-base">
          Personal
        </TabsTrigger>
        <TabsTrigger value="Client" className="text-base">
          Clients
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  )
}

export default TabsSwitch
