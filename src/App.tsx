import { useEffect, useState } from 'react'
import { ObjectPanel } from './components/ObjectPanel'
import { RoomView } from './components/RoomView'
import { rooms } from './data/rooms'

function App() {
  const [roomId, setRoomId] = useState(rooms[0].id)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const room = rooms.find((r) => r.id === roomId) ?? rooms[0]
  const selected = room.objects.find((o) => o.id === selectedId) ?? null

  // Escape closes the panel.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const selectRoom = (id: string) => {
    setRoomId(id)
    setSelectedId(null)
  }

  return (
    <div className="flex min-h-full flex-col bg-charcoal text-air">
      <a
        href="#room"
        className="sr-only rounded bg-ice px-4 py-2 font-bold text-charcoal focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-30"
      >
        Skip to room
      </a>

      <header className="px-6 pt-8 pb-4 text-center">
        <p className="text-sm font-bold tracking-[0.3em] text-gold uppercase">
          Mackintosh Illuminated
        </p>
        <h1 className="mt-2 text-4xl font-bold">{room.name}</h1>
        <p className="mt-1 text-mist">{room.property}</p>
        <p className="mt-4 text-sm text-mist">Select a marker to explore an object in its place.</p>
      </header>

      <nav aria-label="Rooms" className="flex flex-wrap justify-center gap-2 px-6 pb-6">
        {rooms.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => selectRoom(r.id)}
            aria-pressed={r.id === roomId}
            className={`rounded-full border px-4 py-1.5 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice ${
              r.id === roomId
                ? 'border-berry bg-berry text-ice'
                : 'border-mist/40 text-mist hover:border-ice hover:text-ice'
            }`}
          >
            {r.name}
          </button>
        ))}
      </nav>

      <main id="room" className="flex-1 px-6 pb-12">
        <RoomView room={room} selectedId={selectedId} onSelect={setSelectedId} />
      </main>

      <ObjectPanel object={selected} onClose={() => setSelectedId(null)} />

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

export default App
