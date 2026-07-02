import { useEffect, useRef } from 'react'
import { placeholderImage } from '../data/placeholder'
import type { CollectionObject } from '../data/types'

interface ObjectPanelProps {
  object: CollectionObject | null
  onClose: () => void
}

export function ObjectPanel({ object, onClose }: ObjectPanelProps) {
  const open = object !== null
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Move focus into the panel when it opens so keyboard users land here.
  useEffect(() => {
    if (open) closeRef.current?.focus()
  }, [open])

  // Simple focus trap: keep Tab cycling within the open panel.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !panelRef.current) return
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    )
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  return (
    <aside
      role="dialog"
      aria-modal={open}
      aria-hidden={!open}
      aria-label={object ? `${object.title} details` : undefined}
      ref={panelRef}
      onKeyDown={onKeyDown}
      className={`fixed top-0 right-0 z-20 flex h-full w-full max-w-md flex-col overflow-y-auto bg-air text-charcoal shadow-2xl transition-transform duration-300 ${
        open ? 'translate-x-0' : 'pointer-events-none translate-x-full'
      }`}
    >
      {object && (
        <div className="flex flex-1 flex-col p-8">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close object details"
            className="self-end rounded-full px-3 py-1 text-2xl text-slate hover:text-berry focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-berry"
          >
            <span aria-hidden="true">×</span>
          </button>

          <img
            src={object.image ?? placeholderImage}
            alt={object.image ? object.title : `Placeholder for ${object.title}, image to follow`}
            className="mb-6 aspect-[4/3] w-full rounded object-cover"
          />

          <p className="text-sm font-bold tracking-widest text-heather uppercase">{object.maker}</p>
          <h2 className="mt-1 text-3xl leading-tight font-bold text-charcoal">{object.title}</h2>
          <p className="mt-1 text-sm text-slate">{object.date}</p>

          <p className="mt-6 leading-relaxed text-charcoal">{object.description}</p>

          {/* Prominent CTA to the full object detail page */}
          <a
            href={object.detailUrl}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-berry px-6 py-3 font-bold text-ice transition-colors hover:bg-heather focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
          >
            View full object record
            <span aria-hidden="true">→</span>
          </a>

          <dl className="mt-8 space-y-3 border-t border-mist pt-6 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-slate">Accession</dt>
              <dd className="text-charcoal">{object.accession}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate">Credit</dt>
              <dd className="text-right text-charcoal">{object.credit}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate">Licence</dt>
              <dd className="text-charcoal">{object.licence}</dd>
            </div>
          </dl>
        </div>
      )}
    </aside>
  )
}
