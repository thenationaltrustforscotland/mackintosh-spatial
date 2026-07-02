interface Prototype {
  href: string
  title: string
  blurb: string
  brief: string
}

const prototypes: Prototype[] = [
  {
    href: '#/spatial',
    title: 'Spatial: objects in place',
    blurb:
      'Explore Hill House interiors as photographs with clickable hotspots. Each object opens in place, showing how it sits within the whole room.',
    brief: 'Presenting interiors and objects spatially, in relation to one another.',
  },
  {
    href: '#/browse',
    title: 'Discover: browse without searching',
    blurb:
      'A random “surprise me” object and a set of themed trails (Margaret Macdonald, the rose motif, geometry) to invite serendipitous browsing.',
    brief: 'Encouraging browsing and repeat visits, so content doesn’t go stale.',
  },
  {
    href: '#/timeline',
    title: 'Timeline explorer',
    blurb:
      'Objects and the events around them on one shared timeline, with relationship views (by maker, room, motif). Mixes the collection with life and world events.',
    brief: 'A richer timeline of events and collections (evolving the Relationship Explorer).',
  },
]

export function IndexPage() {
  return (
    <div className="flex min-h-full flex-col bg-air text-charcoal">
      <header className="px-6 pt-12 pb-6 text-center">
        <p className="text-sm font-bold tracking-[0.3em] text-berry uppercase">
          Mackintosh Illuminated
        </p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Collection prototypes</h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate">
          Early, throwaway prototypes exploring ways to present the Hill House and Mackintosh
          Tearooms collections online. Mock data, real interiors.
        </p>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-6 pb-12">
        <ul className="grid gap-6 sm:grid-cols-2">
          {prototypes.map((p) => (
            <li key={p.href}>
              <a
                href={p.href}
                className="group flex h-full flex-col rounded-xl border border-mist bg-ice p-6 shadow-sm transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-berry"
              >
                <h2 className="text-xl font-bold group-hover:text-berry">{p.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{p.blurb}</p>
                <p className="mt-4 border-t border-mist pt-4 text-xs text-slate">
                  <span className="font-bold text-forest">Brief:</span> {p.brief}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-berry">
                  Open prototype <span aria-hidden="true">→</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
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
