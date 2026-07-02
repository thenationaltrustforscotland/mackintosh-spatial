import bedroom from '../assets/rooms/bedroom.avif'
import drawingRoom from '../assets/rooms/drawing-room.avif'
import hall from '../assets/rooms/hall.avif'
import windowSeat from '../assets/rooms/window-seat.avif'
import type { Room } from './types'

/** Object records without detailUrl (derived below from id). */
type RawObject = Omit<Room['objects'][number], 'detailUrl'>
type RawRoom = Omit<Room, 'objects'> & { objects: RawObject[] }

/** Mock fixtures over real Hill House interior photos. Hotspot coords are
 *  percentages of each image, eyeballed to sit on the object. Records are
 *  placeholder text pending real CIIM/Axiell data. */
const rawRooms: RawRoom[] = [
  {
    id: 'hh-hall',
    name: 'The Hall',
    property: 'The Hill House',
    image: hall,
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
      },
    ],
  },
  {
    id: 'hh-bedroom',
    name: 'The Main Bedroom',
    property: 'The Hill House',
    image: bedroom,
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
      },
    ],
  },
  {
    id: 'hh-drawing-room',
    name: 'The Drawing Room',
    property: 'The Hill House',
    image: drawingRoom,
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
      },
    ],
  },
  {
    id: 'hh-window-seat',
    name: 'Window Seat Alcove',
    property: 'The Hill House',
    image: windowSeat,
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
  })),
}))
