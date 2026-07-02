import { useMemo, useState } from 'react'
import { BackToIndex } from '../components/BackToIndex'
import { placeholderImage } from '../data/placeholder'
import { browseObjects, timelineEvents, trails } from '../data/rooms'
import type { BrowseObject, TimelineEvent } from '../data/types'

const makerLabels: Record<BrowseObject['makerKey'], string> = {
  mackintosh: 'C. R. Mackintosh',
  macdonald: 'Margaret Macdonald',
  joint: 'Mackintosh & Macdonald',
  blackie: 'Blackie family',
}

type Row =
  | { type: 'object'; year: number; object: BrowseObject }
  | { type: 'event'; year: number; event: TimelineEvent }

export function TimelineView() {
  // A trail id filters which objects show; events always stay for context.
  const [filter, setFilter] = useState<string | null>(null)

  const activeTrail = trails.find((t) => t.id === filter) ?? null

  const rows = useMemo<Row[]>(() => {
    const objects = activeTrail ? browseObjects.filter(activeTrail.match) : browseObjects
    const merged: Row[] = [
      ...objects.map((object) => ({ type: 'object' as const, year: object.year, object })),
      ...timelineEvents.map((event) => ({ type: 'event' as const, year: event.year, event })),
    ]
    return merged.sort((a, b) => a.year - b.year)
  }, [activeTrail])

  const objectCount = rows.filter((r) => r.type === 'object').length

  return (
    <div className="flex min-h-full flex-col bg-air text-charcoal">
      <header className="px-4 pt-6 pb-4 text-center sm:px-6 sm:pt-8">
        <BackToIndex />
        <p className="mt-4 text-sm font-bold tracking-[0.3em] text-berry uppercase">
          Mackintosh Illuminated
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Timeline explorer</h1>
        <p className="mx-auto mt-2 max-w-2xl text-slate">
          The collection set against life and world events. Filter the objects; the context stays.
        </p>
      </header>

      {/* Filters: narrow which objects appear on the timeline. */}
      <nav
        aria-label="Filter objects"
        className="flex flex-wrap justify-center gap-2 px-4 pb-4 sm:px-6"
      >
        <button
          type="button"
          onClick={() => setFilter(null)}
          aria-pressed={filter === null}
          className={`rounded-full border px-4 py-1.5 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-berry ${
            filter === null
              ? 'border-forest bg-forest text-ice'
              : 'border-mist text-slate hover:border-charcoal hover:text-charcoal'
          }`}
        >
          All objects
        </button>
        {trails.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setFilter(t.id)}
            aria-pressed={filter === t.id}
            className={`rounded-full border px-4 py-1.5 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-berry ${
              filter === t.id
                ? 'border-forest bg-forest text-ice'
                : 'border-mist text-slate hover:border-charcoal hover:text-charcoal'
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <p className="px-4 pb-6 text-center text-sm text-slate sm:px-6" aria-live="polite">
        {activeTrail ? activeTrail.blurb : 'Every object, plus the events around it.'}{' '}
        <span className="font-bold text-charcoal">
          {objectCount} object{objectCount === 1 ? '' : 's'}
        </span>
      </p>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-12 sm:px-6">
        <ol className="relative border-l-2 border-mist pl-6">
          {rows.map((row) => (
            <li
              key={row.type === 'object' ? row.object.id : row.event.id}
              className="relative mb-8"
            >
              <span
                aria-hidden="true"
                className={`absolute top-1 -left-[31px] h-4 w-4 rounded-full border-2 border-air ${
                  row.type === 'object' ? 'bg-forest' : 'bg-granite'
                }`}
              />
              <p className="text-xs font-bold tracking-widest text-berry uppercase">
                {row.type === 'object' ? row.object.date : row.event.date}
              </p>

              {row.type === 'object' ? (
                <a
                  href={row.object.detailUrl}
                  className="group mt-2 flex gap-4 rounded-lg border border-mist bg-ice p-3 text-charcoal shadow-md transition-shadow hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-berry"
                >
                  <img
                    src={row.object.image ?? placeholderImage}
                    alt={
                      row.object.image
                        ? row.object.title
                        : `Placeholder for ${row.object.title}, image to follow`
                    }
                    className="h-20 w-24 shrink-0 rounded object-cover"
                  />
                  <div>
                    <h2 className="font-bold leading-tight group-hover:text-berry">
                      {row.object.title}
                    </h2>
                    {/* All the facts, always shown — no relabelling gimmick. */}
                    <p className="mt-1 text-sm text-slate">{makerLabels[row.object.makerKey]}</p>
                    <p className="mt-1 flex flex-wrap gap-x-2 text-xs text-slate">
                      <span>{row.object.roomName}</span>
                      <span aria-hidden="true">·</span>
                      <span>{row.object.tags.slice(0, 2).join(', ')}</span>
                    </p>
                  </div>
                </a>
              ) : (
                <div className="mt-2 rounded-lg border border-mist bg-ice p-3">
                  <p className="text-xs font-bold text-slate uppercase">
                    {row.event.kind === 'life' ? 'Mackintosh & Macdonald' : 'World'}
                  </p>
                  <p className="mt-1 text-charcoal">{row.event.title}</p>
                </div>
              )}
            </li>
          ))}
        </ol>
      </main>

      <footer className="border-t border-mist px-6 py-6 text-center text-xs text-slate">
        <p>
          Object images and records: National Trust for Scotland. Licensed under CC BY unless
          stated.
        </p>
        <p className="mt-2">
          Made possible with The National Lottery Heritage Fund. Thanks to National Lottery players.
        </p>
      </footer>
    </div>
  )
}
