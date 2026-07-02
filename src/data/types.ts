/** Minimal record shapes for the spatial spike. Mirror the fields a CIIM
 *  export would surface (accession, maker, credit, licence) so the mock data
 *  ports cleanly to real data later. */

export interface CollectionObject {
  id: string
  accession: string
  title: string
  maker: string
  date: string
  description: string
  credit: string
  licence: string
  /** Object image URL. Optional in the spike; falls back to a placeholder. */
  image?: string
  /** Link to the full object detail page (collections route in production). */
  detailUrl: string
  /** Hotspot position as a percentage of the room image (0-100). */
  hotspot: { x: number; y: number }
}

export interface Room {
  id: string
  name: string
  property: string
  /** Room image URL. Data URI in the spike; a real asset URL later. */
  image: string
  /** Blurhash of the room image, shown while the full image loads. */
  blurhash: string
  objects: CollectionObject[]
}
