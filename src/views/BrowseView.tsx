import { useMemo, useState } from 'react'
import { BackToIndex } from '../components/BackToIndex'
import { ObjectCard } from '../components/ObjectCard'
import { browseObjects, trails } from '../data/rooms'

function pickRandom<T>(items: T[], not?: T): T {
  if (items.length === 1) return items[0]
  let choice = items[Math.floor(Math.random() * items.length)]
  while (choice === not) choice = items[Math.floor(Math.random() * items.length)]
  return choice
}

export function BrowseView() {
  const [surprise, setSurprise] = useState(() => pickRandom(browseObjects))
  const [activeTrail, setActiveTrail] = useState<string | null>(null)

  const trail = trails.find((t) => t.id === activeTrail) ?? null
  const shown = useMemo(() => (trail ? browseObjects.filter(trail.match) : browseObjects), [trail])

  return (
    <div className="flex min-h-full flex-col bg-charcoal text-air">
      <header className="px-4 pt-6 pb-4 text-center sm:px-6 sm:pt-8">
        <BackToIndex />
        <p className="mt-4 text-sm font-bold tracking-[0.3em] text-gold uppercase">
          Mackintosh Illuminated
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Discover the collection</h1>
        <p className="mt-2 text-mist">A way in for the curious. No search box required.</p>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-12 sm:px-6">
        {/* Surprise me */}
        <section className="rounded-xl bg-slate/30 p-4 sm:p-6" aria-label="A random object">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-bold">Start somewhere unexpected</h2>
            <button
              type="button"
              onClick={() => setSurprise((cur) => pickRandom(browseObjects, cur))}
              className="shrink-0 rounded-full bg-berry px-5 py-2 text-sm font-bold text-ice transition-colors hover:bg-heather focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice"
            >
              Surprise me ↻
            </button>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-[240px_1fr] sm:items-stretch">
            <ObjectCard object={surprise} />
            <p className="self-center leading-relaxed text-mist">{surprise.description}</p>
          </div>
        </section>

        {/* Trails */}
        <section className="mt-10" aria-label="Themed trails">
          <h2 className="text-lg font-bold">Follow a trail</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTrail(null)}
              aria-pressed={activeTrail === null}
              className={`rounded-full border px-4 py-1.5 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice ${
                activeTrail === null
                  ? 'border-berry bg-berry text-ice'
                  : 'border-mist/40 text-mist hover:border-ice hover:text-ice'
              }`}
            >
              Everything
            </button>
            {trails.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTrail(t.id)}
                aria-pressed={activeTrail === t.id}
                className={`rounded-full border px-4 py-1.5 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice ${
                  activeTrail === t.id
                    ? 'border-berry bg-berry text-ice'
                    : 'border-mist/40 text-mist hover:border-ice hover:text-ice'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          {trail && <p className="mt-3 text-sm text-mist">{trail.blurb}</p>}

          <p className="mt-4 text-sm text-mist" aria-live="polite">
            {shown.length} object{shown.length === 1 ? '' : 's'}
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {shown.map((object) => (
              <li key={object.id}>
                <ObjectCard object={object} />
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="border-t border-slate px-6 py-6 text-center text-xs text-mist">
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
