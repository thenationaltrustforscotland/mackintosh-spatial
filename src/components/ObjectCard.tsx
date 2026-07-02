import { placeholderImage } from '../data/placeholder'
import type { BrowseObject } from '../data/types'

const makerLabels: Record<BrowseObject['makerKey'], string> = {
  mackintosh: 'C. R. Mackintosh',
  macdonald: 'Margaret Macdonald',
  joint: 'Mackintosh & Macdonald',
  blackie: 'Blackie family',
}

interface ObjectCardProps {
  object: BrowseObject
}

export function ObjectCard({ object }: ObjectCardProps) {
  return (
    <a
      href={object.detailUrl}
      className="group flex flex-col overflow-hidden rounded-lg bg-air text-charcoal shadow-md transition-shadow hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice"
    >
      <img
        src={object.image ?? placeholderImage}
        alt={object.image ? object.title : `Placeholder for ${object.title}, image to follow`}
        className="aspect-[4/3] w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-bold tracking-widest text-heather uppercase">
          {makerLabels[object.makerKey]}
        </p>
        <h3 className="mt-1 font-bold leading-tight group-hover:text-berry">{object.title}</h3>
        <p className="mt-1 text-sm text-slate">
          {object.date} · {object.roomName}
        </p>
      </div>
    </a>
  )
}
