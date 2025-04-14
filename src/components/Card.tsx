import { cn } from '@/lib/utils'
import React from 'react'
import Icon from './Icon'

interface Props {
  href: string
  title: string
  size?: 'small' | 'large'
  metadata: {
    overview: string
    thumbnail: {
      url: string
    }
    primary_color: string
  }
}

const Card = ({ href, metadata, title, size = 'small' }: Props) => {
  return (
    <a href={href}>
      <article
        className={cn(
          'bg-card/80 border-border rounded-xl border px-6 py-8 md:p-10 h-[20rem] group md:h-[23rem] lg:h-[25rem] relative overflow-hidden',
          size === 'large' && 'sm:h-[35rem] lg:h-[45rem]'
        )}
      >
        <div className="flex gap-2">
          <div className="space-y-2">
            <h2 className="text-2xl font-medium">{title}</h2>
            <p className="text-muted-foreground line-clamp-2">
              {metadata.overview}
            </p>
          </div>
          <Icon size={28} iconName="RiArrowRightLine" />
        </div>
        <img
          className="absolute w-full translate-y-8 group-hover:translate-y-6 transition-all duration-300"
          src={metadata.thumbnail.url}
          alt=""
          width="300"
          height="300"
        />
        <div
          style={{
            backgroundColor: metadata.primary_color
          }}
          className="absolute w-full h-full translate-y-8 group-hover:translate-y-6 transition-all -z-10 blur-3xl opacity-0 group-hover:opacity-100 duration-300"
        ></div>
      </article>
    </a>
  )
}

export default Card
