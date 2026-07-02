import { useCallback, useEffect, useState } from 'react'
import { BackToIndex } from '../components/BackToIndex'
import { ObjectPanel } from '../components/ObjectPanel'
import { RoomView } from '../components/RoomView'
import { rooms } from '../data/rooms'

/** Parse `#/spatial/roomId/objectId` from the URL hash. */
function parseHash(): { roomId: string; objectId: string | null } {
  const parts = window.location.hash.replace(/^#\/?/, '').split('/').filter(Boolean)
  // parts[0] === 'spatial'
  const roomId = rooms.some((r) => r.id === parts[1]) ? parts[1] : rooms[0].id
  const objectId = parts[2] ?? null
  return { roomId, objectId }
}

export function SpatialView() {
  const [{ roomId, objectId }, setState] = useState(parseHash)

  const room = rooms.find((r) => r.id === roomId) ?? rooms[0]
  const objectIndex = room.objects.findIndex((o) => o.id === objectId)
  const selected = objectIndex >= 0 ? room.objects[objectIndex] : null

  useEffect(() => {
    const onHashChange = () => setState(parseHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = useCallback((nextRoom: string, nextObject: string | null) => {
    window.location.hash = nextObject
      ? `#/spatial/${nextRoom}/${nextObject}`
      : `#/spatial/${nextRoom}`
  }, [])

  const selectRoom = (id: string) => navigate(id, null)
  const selectObject = (id: string) => navigate(roomId, id)
  const closePanel = useCallback(() => navigate(roomId, null), [navigate, roomId])

  const stepObject = useCallback(
    (delta: number) => {
      if (objectIndex < 0) return
      const next = (objectIndex + delta + room.objects.length) % room.objects.length
      navigate(roomId, room.objects[next].id)
    },
    [objectIndex, room.objects, navigate, roomId],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePanel()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closePanel])

  return (
    <div className="flex min-h-full flex-col bg-charcoal text-air">
      <a
        href="#room"
        className="sr-only rounded bg-ice px-4 py-2 font-bold text-charcoal focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-30 focus:h-auto focus:w-auto focus:overflow-visible focus:whitespace-normal"
      >
        Skip to room
      </a>

      <div className="contents" inert={selected !== null ? true : undefined}>
        <header className="px-4 pt-6 pb-3 text-center sm:px-6 sm:pt-8 sm:pb-4">
          <BackToIndex />
          <p className="mt-4 text-sm font-bold tracking-[0.3em] text-gold uppercase">
            Mackintosh Illuminated
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{room.name}</h1>
          <p className="mt-1 text-mist">{room.property}</p>
          <p className="mt-4 text-sm text-mist">
            Select a marker to explore an object in its place.
          </p>
        </header>

        <nav
          aria-label="Rooms"
          className="flex snap-x gap-2 overflow-x-auto px-4 pb-5 sm:flex-wrap sm:justify-center sm:px-6 sm:pb-6"
        >
          {rooms.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => selectRoom(r.id)}
              aria-pressed={r.id === roomId}
              className={`shrink-0 snap-start rounded-full border px-4 py-1.5 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice ${
                r.id === roomId
                  ? 'border-berry bg-berry text-ice'
                  : 'border-mist/40 text-mist hover:border-ice hover:text-ice'
              }`}
            >
              {r.name}
            </button>
          ))}
        </nav>

        <main id="room" className="flex-1 px-4 pb-12 sm:px-6">
          <RoomView room={room} selectedId={selected?.id ?? null} onSelect={selectObject} />
        </main>

        <footer className="border-t border-slate px-6 py-6 text-center text-xs text-mist">
          <p>
            Object images and records: National Trust for Scotland. Licensed under CC BY unless
            stated.
          </p>
          <p className="mt-2">
            Made possible with The National Lottery Heritage Fund. Thanks to National Lottery
            players.
          </p>
        </footer>
      </div>

      <ObjectPanel
        object={selected}
        onClose={closePanel}
        onPrev={() => stepObject(-1)}
        onNext={() => stepObject(1)}
        position={objectIndex >= 0 ? objectIndex + 1 : 0}
        total={room.objects.length}
      />
    </div>
  )
}
