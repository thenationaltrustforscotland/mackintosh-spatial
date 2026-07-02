import type { CollectionObject } from '../data/types'

interface HotspotProps {
  object: CollectionObject
  active: boolean
  onSelect: (id: string) => void
}

export function Hotspot({ object, active, onSelect }: HotspotProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(object.id)}
      aria-label={`View ${object.title}`}
      aria-pressed={active}
      title={object.title}
      // Button box is the same size as the dot and its centre sits on the
      // hotspot coordinate, so both dot and ping stay concentric.
      className="group absolute grid h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ice"
      style={{ left: `${object.hotspot.x}%`, top: `${object.hotspot.y}%` }}
    >
      {/* pulsing ring, centred on the dot via col-start/row-start stacking */}
      <span
        className={`col-start-1 row-start-1 h-8 w-8 animate-ping rounded-full ${
          active ? 'bg-berry/40' : 'bg-ice/50 group-hover:bg-berry/40'
        }`}
      />
      {/* dot */}
      <span
        className={`col-start-1 row-start-1 h-4 w-4 rounded-full border-2 border-ice shadow-md transition-colors ${
          active ? 'bg-berry' : 'bg-charcoal group-hover:bg-berry'
        }`}
      />
    </button>
  )
}
