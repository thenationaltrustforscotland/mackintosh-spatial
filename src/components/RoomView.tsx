import type { Room } from '../data/types'
import { Hotspot } from './Hotspot'

interface RoomViewProps {
  room: Room
  selectedId: string | null
  onSelect: (id: string) => void
}

export function RoomView({ room, selectedId, onSelect }: RoomViewProps) {
  return (
    <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-lg shadow-xl">
      <img src={room.image} alt={`${room.name}, ${room.property}`} className="block w-full" />
      {room.objects.map((object) => (
        <Hotspot
          key={object.id}
          object={object}
          active={object.id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
