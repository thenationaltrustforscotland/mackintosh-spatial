import { decode } from 'blurhash'
import { useEffect, useRef, useState } from 'react'
import type { Room } from '../data/types'
import { Hotspot } from './Hotspot'

interface RoomViewProps {
  room: Room
  selectedId: string | null
  onSelect: (id: string) => void
}

export function RoomView({ room, selectedId, onSelect }: RoomViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loaded, setLoaded] = useState(false)

  // Reset the fade whenever the room (and its image) changes.
  // biome-ignore lint/correctness/useExhaustiveDependencies: reset on image swap
  useEffect(() => {
    setLoaded(false)
  }, [room.image])

  // Paint the blurhash into the backdrop canvas.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const { width, height } = canvas
    const pixels = decode(room.blurhash, width, height)
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const imageData = ctx.createImageData(width, height)
    imageData.data.set(pixels)
    ctx.putImageData(imageData, 0, 0)
  }, [room.blurhash])

  return (
    <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-lg shadow-xl">
      {/* Blurhash placeholder, stretched to fill until the photo fades in. */}
      <canvas ref={canvasRef} width={32} height={24} className="absolute inset-0 h-full w-full" />
      <img
        src={room.image}
        alt={`${room.name}, ${room.property}`}
        onLoad={() => setLoaded(true)}
        className={`relative block w-full transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
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
