import { useEffect, useRef } from 'react'
import { placeholderImage } from '../data/placeholder'
import type { CollectionObject } from '../data/types'

interface ObjectPanelProps {
  object: CollectionObject | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  /** 1-based position of the object within its room, 0 when none open. */
  position: number
  total: number
}

export function ObjectPanel({
  object,
  onClose,
  onPrev,
  onNext,
  position,
  total,
}: ObjectPanelProps) {
  const open = object !== null
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Move focus into the panel when it opens so keyboard users land here.
  useEffect(() => {
    if (open) closeRef.current?.focus()
  }, [open])

  // Left/Right arrows step through objects while the panel is open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onPrev()
      else if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onPrev, onNext])

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
      // Desktop: right-hand drawer. Mobile: bottom sheet (max 85vh).
      className={`fixed z-20 flex flex-col overflow-y-auto bg-air text-charcoal shadow-2xl transition-transform duration-300 max-sm:inset-x-0 max-sm:bottom-0 max-sm:max-h-[85vh] max-sm:rounded-t-2xl sm:top-0 sm:right-0 sm:h-full sm:w-full sm:max-w-md ${
        open
          ? 'translate-y-0 sm:translate-x-0'
          : 'pointer-events-none translate-y-full sm:translate-x-full sm:translate-y-0'
      }`}
    >
      {object && (
        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate">
              {position} of {total}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close object details"
              className="rounded-full px-3 py-1 text-2xl text-slate hover:text-berry focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-berry"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <img
            src={object.image ?? placeholderImage}
            alt={object.image ? object.title : `Placeholder for ${object.title}, image to follow`}
            className="mt-2 mb-6 aspect-[4/3] w-full rounded object-cover"
          />

          <p className="text-sm font-bold tracking-widest text-heather uppercase">{object.maker}</p>
          <h2 className="mt-1 text-2xl leading-tight font-bold text-charcoal sm:text-3xl">
            {object.title}
          </h2>
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

          {/* Step through objects in this room */}
          <div className="mt-6 flex justify-between gap-3">
            <button
              type="button"
              onClick={onPrev}
              className="inline-flex items-center gap-1 rounded-full border border-mist px-4 py-2 text-sm font-bold text-charcoal hover:border-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
            >
              <span aria-hidden="true">←</span> Previous
            </button>
            <button
              type="button"
              onClick={onNext}
              className="inline-flex items-center gap-1 rounded-full border border-mist px-4 py-2 text-sm font-bold text-charcoal hover:border-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
            >
              Next <span aria-hidden="true">→</span>
            </button>
          </div>

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
