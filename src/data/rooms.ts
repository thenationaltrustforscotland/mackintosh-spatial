import bedroom from '../assets/rooms/bedroom.avif'
import drawingRoom from '../assets/rooms/drawing-room.avif'
import hall from '../assets/rooms/hall.avif'
import windowSeat from '../assets/rooms/window-seat.avif'
import type { BrowseObject, Room, TimelineEvent } from './types'

/** Object records without derived fields (detailUrl, year added below). */
type RawObject = Omit<Room['objects'][number], 'detailUrl' | 'year'>
type RawRoom = Omit<Room, 'objects'> & { objects: RawObject[] }

/** Approximate years per object, spread across the Hill House commission so the
 *  timeline has shape. Placeholder until real creation dates are available. */
const objectYears: Record<string, number> = {
  'hh-hall-bench': 1904,
  'hh-hall-table': 1904,
  'hh-hall-lantern': 1905,
  'hh-hall-panels': 1904,
  'hh-bed-panels': 1903,
  'hh-bed-wardrobe': 1904,
  'hh-bed-chair': 1904,
  'hh-dr-chairs': 1905,
  'hh-dr-table': 1906,
  'hh-dr-window': 1904,
  'hh-dr-books': 1900,
  'hh-ws-seat': 1904,
  'hh-ws-curtains': 1903,
  'hh-ws-stencil': 1904,
}

/** Mock fixtures over real Hill House interior photos. Hotspot coords are
 *  percentages of each image, eyeballed to sit on the object. Records are
 *  placeholder text pending real CIIM/Axiell data. */
const rawRooms: RawRoom[] = [
  {
    id: 'hh-hall',
    name: 'The Hall',
    property: 'The Hill House',
    image: hall,
    blurhash: 'LFFYS;xBIp%L9EjE~WIBnOxvD*j]',
    objects: [
      {
        id: 'hh-hall-bench',
        accession: 'NTS.HH.10',
        title: 'Hall settle',
        maker: 'Charles Rennie Mackintosh',
        date: 'c. 1904',
        description:
          'Oak settle with a rush seat and square cut-outs, set against the stencilled panelling of the entrance hall.',
        credit: 'National Trust for Scotland, The Hill House',
        licence: 'CC BY',
        hotspot: { x: 21, y: 74 },
        makerKey: 'mackintosh',
        tags: ['furniture', 'oak', 'geometry'],
      },
      {
        id: 'hh-hall-table',
        accession: 'NTS.HH.11',
        title: 'Demi-lune hall table',
        maker: 'Charles Rennie Mackintosh',
        date: 'c. 1904',
        description:
          'Dark-stained half-moon table with an open lattice base, echoing the grid geometry used throughout the house.',
        credit: 'National Trust for Scotland, The Hill House',
        licence: 'CC BY',
        hotspot: { x: 88, y: 66 },
        makerKey: 'mackintosh',
        tags: ['furniture', 'geometry', 'lattice'],
      },
      {
        id: 'hh-hall-lantern',
        accession: 'NTS.HH.12',
        title: 'Ceiling lantern',
        maker: 'Charles Rennie Mackintosh',
        date: 'c. 1904',
        description:
          'Suspended metal-and-glass lantern with pierced squares, one of the coordinated light fittings for the hall.',
        credit: 'National Trust for Scotland, The Hill House',
        licence: 'CC BY',
        hotspot: { x: 53, y: 15 },
        makerKey: 'mackintosh',
        tags: ['lighting', 'metalwork', 'geometry'],
      },
      {
        id: 'hh-hall-panels',
        accession: 'NTS.HH.13',
        title: 'Stencilled wall panels',
        maker: 'Charles Rennie Mackintosh & Margaret Macdonald Mackintosh',
        date: 'c. 1904',
        description:
          'Painted and stencilled panels lining the hall, part of the integrated decorative scheme developed by Mackintosh and Macdonald.',
        credit: 'National Trust for Scotland, The Hill House',
        licence: 'CC BY',
        hotspot: { x: 6, y: 30 },
        makerKey: 'joint',
        tags: ['stencil', 'rose', 'decorative-scheme'],
      },
    ],
  },
  {
    id: 'hh-bedroom',
    name: 'The Main Bedroom',
    property: 'The Hill House',
    image: bedroom,
    blurhash: 'L8KKQSRO00V@~VMy-:afNGkCS1oe',
    objects: [
      {
        id: 'hh-bed-panels',
        accession: 'NTS.HH.20',
        title: 'Gesso figure panels',
        maker: 'Margaret Macdonald Mackintosh',
        date: 'c. 1904',
        description:
          'Pair of stylised female figure panels flanking the bed. Among the clearest examples of Margaret Macdonald’s contribution to the Hill House interiors, long overshadowed by her husband’s.',
        credit: 'National Trust for Scotland, The Hill House',
        licence: 'CC BY',
        hotspot: { x: 26, y: 40 },
        makerKey: 'macdonald',
        tags: ['gesso', 'figures', 'rose', 'decorative-scheme'],
      },
      {
        id: 'hh-bed-wardrobe',
        accession: 'NTS.HH.21',
        title: 'Fitted wardrobe',
        maker: 'Charles Rennie Mackintosh',
        date: '1904',
        description:
          'White fitted wardrobe with a pierced square-grid motif, integral to the built-in scheme of the barrel-vaulted bedroom.',
        credit: 'National Trust for Scotland, The Hill House',
        licence: 'CC BY',
        hotspot: { x: 10, y: 33 },
        makerKey: 'mackintosh',
        tags: ['furniture', 'built-in', 'geometry'],
      },
      {
        id: 'hh-bed-chair',
        accession: 'NTS.HH.22',
        title: 'Pink ladderback chair',
        maker: 'Charles Rennie Mackintosh',
        date: 'c. 1904',
        description:
          'Slatted ladderback chair with a coloured lattice panel, one of a pair positioned within the fitted bed recess.',
        credit: 'National Trust for Scotland, The Hill House',
        licence: 'CC BY',
        hotspot: { x: 15, y: 62 },
        makerKey: 'mackintosh',
        tags: ['furniture', 'ladderback', 'lattice'],
      },
    ],
  },
  {
    id: 'hh-drawing-room',
    name: 'The Drawing Room',
    property: 'The Hill House',
    image: drawingRoom,
    blurhash: 'LMF=Ej%LIVxt~An%E2RjIAaeozWV',
    objects: [
      {
        id: 'hh-dr-chairs',
        accession: 'NTS.HH.30',
        title: 'High-back armchairs',
        maker: 'Charles Rennie Mackintosh',
        date: 'c. 1904',
        description:
          'Pair of tall ebonised armchairs with upholstered backs bearing an inlaid emblem, framing the drawing-room bay.',
        credit: 'National Trust for Scotland, The Hill House',
        licence: 'CC BY',
        hotspot: { x: 16, y: 45 },
        makerKey: 'mackintosh',
        tags: ['furniture', 'ladderback', 'upholstery'],
      },
      {
        id: 'hh-dr-table',
        accession: 'NTS.HH.31',
        title: 'Cube lattice table',
        maker: 'Charles Rennie Mackintosh',
        date: 'c. 1904',
        description:
          'Open cube table built from an interlocking grid of squares, a defining expression of Mackintosh’s geometric vocabulary.',
        credit: 'National Trust for Scotland, The Hill House',
        licence: 'CC BY',
        hotspot: { x: 50, y: 66 },
        makerKey: 'mackintosh',
        tags: ['furniture', 'geometry', 'lattice'],
      },
      {
        id: 'hh-dr-window',
        accession: 'NTS.HH.32',
        title: 'Bay window seat',
        maker: 'Charles Rennie Mackintosh',
        date: '1904',
        description:
          'Built-in window seat set within the leaded bay, with fitted bookshelves and stencilled rose curtains.',
        credit: 'National Trust for Scotland, The Hill House',
        licence: 'CC BY',
        hotspot: { x: 50, y: 42 },
        makerKey: 'mackintosh',
        tags: ['built-in', 'window', 'rose'],
      },
      {
        id: 'hh-dr-books',
        accession: 'NTS.HH.33',
        title: 'Blackie & Son bound volumes',
        maker: 'Blackie and Son (publishers)',
        date: 'c. 1900',
        description:
          'Cloth-bound books published by Walter Blackie’s firm and kept in the drawing-room shelves. They belonged to the Blackie family rather than being designed for the house, a reminder that the interiors held the family’s own possessions too.',
        credit: 'National Trust for Scotland, The Hill House',
        licence: 'CC BY',
        hotspot: { x: 78, y: 55 },
        makerKey: 'blackie',
        tags: ['books', 'blackie-family'],
      },
    ],
  },
  {
    id: 'hh-window-seat',
    name: 'Window Seat Alcove',
    property: 'The Hill House',
    image: windowSeat,
    blurhash: 'LTOMd0-:tS-p?^tljFWWDNa_R%jF',
    objects: [
      {
        id: 'hh-ws-seat',
        accession: 'NTS.HH.40',
        title: 'Upholstered window seat',
        maker: 'Charles Rennie Mackintosh',
        date: 'c. 1904',
        description:
          'Long built-in seat with a stencilled rose-motif back, tucked beneath the tall net-curtained window.',
        credit: 'National Trust for Scotland, The Hill House',
        licence: 'CC BY',
        hotspot: { x: 30, y: 68 },
        makerKey: 'mackintosh',
        tags: ['built-in', 'upholstery', 'rose'],
      },
      {
        id: 'hh-ws-curtains',
        accession: 'NTS.HH.41',
        title: 'Stencilled net curtains',
        maker: 'Margaret Macdonald Mackintosh',
        date: 'c. 1904',
        description:
          'Fine net curtains with a repeated linear motif and coloured squares, filtering daylight into the alcove.',
        credit: 'National Trust for Scotland, The Hill House',
        licence: 'CC BY',
        hotspot: { x: 22, y: 28 },
        makerKey: 'macdonald',
        tags: ['textile', 'stencil', 'geometry'],
      },
      {
        id: 'hh-ws-stencil',
        accession: 'NTS.HH.42',
        title: 'Rose wall stencil',
        maker: 'Charles Rennie Mackintosh & Margaret Macdonald Mackintosh',
        date: 'c. 1904',
        description:
          'Stylised rose-and-stem stencil applied to the alcove wall, part of the room’s pale decorative scheme.',
        credit: 'National Trust for Scotland, The Hill House',
        licence: 'CC BY',
        hotspot: { x: 84, y: 40 },
        makerKey: 'joint',
        tags: ['stencil', 'rose', 'decorative-scheme'],
      },
    ],
  },
]

/** Decorate each object with a detail-page URL derived from its id.
 *  In production this maps to the collections object route. */
export const rooms: Room[] = rawRooms.map((room) => ({
  ...room,
  objects: room.objects.map((object) => ({
    ...object,
    detailUrl: `/collections/object/${object.id}`,
    year: objectYears[object.id] ?? 1904,
  })),
}))

/** Every object flattened out of its room, for cross-room browsing. */
export const browseObjects: BrowseObject[] = rooms.flatMap((room) =>
  room.objects.map((object) => ({ ...object, roomId: room.id, roomName: room.name })),
)

/** Curated discovery trails. `match` decides membership from an object. */
export const trails: {
  id: string
  label: string
  blurb: string
  match: (o: BrowseObject) => boolean
}[] = [
  {
    id: 'macdonald',
    label: 'Margaret Macdonald',
    blurb: 'Work by Margaret Macdonald, and the schemes she shaped with Mackintosh.',
    match: (o) => o.makerKey === 'macdonald' || o.makerKey === 'joint',
  },
  {
    id: 'blackie',
    label: 'The Blackie family',
    blurb: 'Objects that belonged to the Blackie family, rather than being designed for the house.',
    match: (o) => o.makerKey === 'blackie',
  },
  {
    id: 'geometry',
    label: 'Geometry & the grid',
    blurb: 'The square, the lattice, the cube: Mackintosh’s geometric vocabulary.',
    match: (o) => o.tags.includes('geometry') || o.tags.includes('lattice'),
  },
  {
    id: 'rose',
    label: 'The rose motif',
    blurb: 'The stylised rose that recurs across the Hill House interiors.',
    match: (o) => o.tags.includes('rose'),
  },
  {
    id: 'built-in',
    label: 'Built for the house',
    blurb: 'Fitted furniture and built-in pieces made for these rooms.',
    match: (o) => o.tags.includes('built-in'),
  },
]

/** Contextual life and world events for the timeline. Dates are drawn from
 *  published sources (Wikipedia, NTS, CRM Society); wording is placeholder
 *  pending the project's interpretation strategy. Mixing collection with
 *  real-world context mirrors the existing Relationship Explorer. */
export const timelineEvents: TimelineEvent[] = [
  {
    id: 'ev-marriage',
    year: 1900,
    date: '22 August 1900',
    kind: 'life',
    title: 'Charles Rennie Mackintosh and Margaret Macdonald marry in Dumbarton.',
  },
  {
    id: 'ev-artlover',
    year: 1901,
    date: '1901',
    kind: 'life',
    title: 'The couple design “House for an Art Lover” for a German competition.',
  },
  {
    id: 'ev-victoria',
    year: 1901,
    date: '22 January 1901',
    kind: 'world',
    title: 'Queen Victoria dies; Edward VII accedes to the throne.',
  },
  {
    id: 'ev-commission',
    year: 1902,
    date: '1902',
    kind: 'life',
    title: 'Publisher Walter Blackie commissions Mackintosh to design The Hill House.',
  },
  {
    id: 'ev-turin',
    year: 1903,
    date: '1903',
    kind: 'life',
    title: 'Mackintosh and Macdonald show the Rose Boudoir at the Turin International Exhibition.',
  },
  {
    id: 'ev-flight',
    year: 1903,
    date: '17 December 1903',
    kind: 'world',
    title: 'The Wright brothers make the first powered flight at Kitty Hawk.',
  },
  {
    id: 'ev-moved-in',
    year: 1904,
    date: '1904',
    kind: 'life',
    title: 'The Blackie family moves into the completed Hill House.',
  },
  {
    id: 'ev-relativity',
    year: 1905,
    date: '1905',
    kind: 'world',
    title: 'Einstein publishes his theory of special relativity.',
  },
]
