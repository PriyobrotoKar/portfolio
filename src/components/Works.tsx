import React, { useEffect } from 'react'
import TabsSwitch from './TabsSwitch'
import Card from './Card'

type Work = {
  title: string
  slug: string
  metadata: {
    description: string
    image: string
    type: 'Personal' | 'Client'
  }
}

interface WorksProps {
  objects: Work[]
}

const Works = ({ objects }: WorksProps) => {
  const [activeTab, setActiveTab] = React.useState('Personal')
  const [works, setWorks] = React.useState(() => {
    return objects.filter((work) => work.metadata.type === 'Personal')
  })

  useEffect(() => {
    setWorks(objects.filter((work) => work.metadata.type === activeTab))
  }, [activeTab])

  return (
    <div>
      <TabsSwitch setActiveTab={setActiveTab} />
      <section className="grid sm:grid-cols-2 gap-10 px-6 pb-12">
        {works.map(({ title, slug, metadata }: any) => {
          return (
            <Card
              href={`/projects/${slug}`}
              title={title}
              metadata={metadata}
            />
          )
        })}
      </section>
    </div>
  )
}

export default Works
