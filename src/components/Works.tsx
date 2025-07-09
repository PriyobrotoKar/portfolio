import React, { useEffect } from 'react'
import TabsSwitch from './TabsSwitch'
import Card from './Card'
import Animate from './Animate'

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
    <div className="mt-20">
      <Animate
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <TabsSwitch setActiveTab={setActiveTab} />
      </Animate>
      <section className="grid sm:grid-cols-2 gap-4 md:gap-10 pb-12">
        {works.map(({ title, slug, metadata }: any, i: number) => {
          return (
            <Animate
              key={slug}
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * i }}
            >
              <Card
                href={`/projects/${slug}`}
                title={title}
                metadata={metadata}
              />
            </Animate>
          )
        })}
      </section>
    </div>
  )
}

export default Works
