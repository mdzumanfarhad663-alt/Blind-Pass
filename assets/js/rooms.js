/* Single source of truth for every room. rooms.html renders from this array.
   Sleeps = Cloudbeds max occupancy.
   pets: true, false, or null when unconfirmed.
   [CONFIRM] Queen Studio Suite pet policy (pets: null).
   [CONFIRM PHOTOS] Queen Studio Suite only has low-resolution Cloudbeds photos. */
window.BP_ROOMS = [
  {
    slug: 'queen-studio',
    rid: '492334',
    name: 'Queen Studio',
    beds: '1 Queen',
    bedDetails: [{ type: 'Queen', count: 1 }],
    sleeps: 2,
    bathroom: '',
    location: 'Poolside · Ground level',
    pets: true,
    kitchenette: false,
    accessible: false,
    jacuzzi: false,
    pullout: false,
    secondFloor: false,
    description: 'A simple studio with one Queen bed, a mini-fridge and a microwave. It sits on the ground level, right by the pool.',
    photos: [
      { src: 'queen-studio-01.webp', alt: 'Queen Studio with a Queen bed, flat-screen TV and microwave shelf' },
      { src: 'queen-studio-02.webp', alt: 'Queen Studio bed with a coastal-print bedspread beside a small dining table' },
      { src: 'queen-studio-03.webp', alt: 'Queen Studio table by the window with the pool visible through the open door' },
      { src: 'queen-studio-04.webp', alt: 'Queen Studio bathroom with a tropical fish shower curtain' }
    ]
  },
  {
    slug: 'queen-studio-suite',
    rid: '664456',
    name: 'Queen Studio Suite',
    beds: 'Queen + pullout sofa',
    bedDetails: [{ type: 'Queen', count: 1 }, { type: 'Pullout sofa', count: 1 }],
    sleeps: 3,
    bathroom: 'One bathroom',
    location: 'Between the two buildings',
    pets: null,
    kitchenette: false,
    accessible: false,
    jacuzzi: false,
    pullout: true,
    secondFloor: false,
    description: 'A separate bedroom with a Queen and a TV, plus a living area with a pullout sofa. You also get a mini-fridge, microwave and sink. The suite is tucked between the two buildings for more privacy.',
    photos: [
      { src: 'queen-studio-suite-01.webp', alt: 'Queen Studio Suite living area with pullout sofa and a view into the bedroom' },
      { src: 'queen-studio-suite-02.webp', alt: 'Queen Studio Suite bedroom with a Queen bed' },
      { src: 'queen-studio-suite-03.webp', alt: 'Queen Studio Suite living area with sofa, small table and mini-fridge' }
    ]
  },
  {
    slug: 'king-room',
    rid: '492336',
    name: 'King Room',
    beds: '1 King',
    bedDetails: [{ type: 'King', count: 1 }],
    sleeps: 2,
    bathroom: '',
    location: 'Courtyard & poolside · Ground & second floor options',
    pets: true,
    kitchenette: true,
    accessible: false,
    jacuzzi: false,
    pullout: false,
    secondFloor: false,
    description: 'One King bed and a kitchenette with a mini-fridge, microwave, stovetop and sink. Choose from courtyard and poolside rooms, with ground and second floor options.',
    photos: [
      { src: 'king-room-01.webp', alt: 'King Room bed with a coastal-print bedspread and shutter-style headboard' },
      { src: 'king-room-02.webp', alt: 'King Room dining table by the window' },
      { src: 'king-room-03.webp', alt: 'King Room kitchenette with mini-fridge, microwave and gray cabinets' },
      { src: 'king-room-04.webp', alt: 'King Room bed against a turquoise accent wall' }
    ]
  },
  {
    slug: 'ada-king-room',
    rid: '492335',
    name: 'ADA King Room',
    beds: '1 King',
    bedDetails: [{ type: 'King', count: 1 }],
    sleeps: 2,
    bathroom: 'Roll-in shower & grab bars',
    location: 'Courtyard · Ground floor',
    pets: true,
    kitchenette: true,
    accessible: true,
    jacuzzi: false,
    pullout: false,
    secondFloor: false,
    description: 'One King bed and an accessible bathroom with a roll-in shower and grab bars. The kitchenette has a mini-fridge, microwave, stovetop and sink. It is on the ground floor, in the courtyard.',
    photos: [
      { src: 'ada-king-room-01.webp', alt: 'ADA King Room with a King bed, flat-screen TV and dresser' },
      { src: 'ada-king-room-02.webp', alt: 'ADA King Room kitchenette with stovetop, sink and microwave' },
      { src: 'ada-king-room-03.webp', alt: 'ADA King Room accessible bathroom with a sea turtle shower curtain' },
      { src: 'ada-king-room-04.webp', alt: 'ADA King Room dining table by the window' }
    ]
  },
  {
    slug: 'king-suite',
    rid: '492337',
    name: 'King Suite',
    beds: '1 King',
    bedDetails: [{ type: 'King', count: 1 }],
    sleeps: 2,
    bathroom: 'Shower (no tub)',
    location: 'Courtyard · Ground level',
    pets: true,
    kitchenette: true,
    accessible: false,
    jacuzzi: false,
    pullout: false,
    secondFloor: false,
    description: 'A spacious room with one King bed and a kitchenette with a stovetop, mini-fridge, microwave and sink. It has one bathroom with a shower (no tub). You will find it on the ground level, in the courtyard.',
    photos: [
      { src: 'king-suite-01.webp', alt: 'King Suite bedroom with a King bed and dresser' },
      { src: 'king-suite-02.webp', alt: 'King Suite seating nook with an arched opening into the bedroom' },
      { src: 'king-suite-03.webp', alt: 'King Suite kitchenette with stovetop, mini-fridge, microwave and sink' },
      { src: 'king-suite-04.webp', alt: 'King Suite bathroom with a shower' }
    ]
  },
  {
    slug: 'double-queen',
    rid: '492341',
    name: 'Double Queen',
    beds: '2 Queens',
    bedDetails: [{ type: 'Queen', count: 2 }],
    sleeps: 4,
    bathroom: 'Shower/tub combo',
    location: 'Courtyard & poolside options · Ground level',
    pets: true,
    kitchenette: true,
    accessible: false,
    jacuzzi: false,
    pullout: false,
    secondFloor: false,
    description: 'Two Queen beds and a kitchenette with a mini-fridge, microwave, stovetop and sink. The bathroom has a shower/tub combo. It is on the ground level, with courtyard and poolside options.',
    photos: [
      { src: 'double-queen-01.webp', alt: 'Double Queen room with two Queen beds and a flat-screen TV' },
      { src: 'double-queen-02.webp', alt: 'Double Queen kitchenette with mini-fridge, microwave and gray cabinets' },
      { src: 'double-queen-03.webp', alt: 'Double Queen bathroom with a shower and tub combo' }
    ]
  },
  {
    slug: 'one-bedroom',
    rid: '492338',
    name: 'One Bedroom',
    beds: 'Queen + pullout sofa',
    bedDetails: [{ type: 'Queen', count: 1 }, { type: 'Pullout sofa', count: 1 }],
    sleeps: 3,
    bathroom: 'One bathroom, shower/tub combo',
    location: 'Courtyard & poolside · Ground & second floor options',
    pets: false,
    kitchenette: true,
    accessible: false,
    jacuzzi: false,
    pullout: true,
    secondFloor: false,
    description: 'A Queen in a separate bedroom and a pullout sofa in the living room. The kitchenette has a mini-fridge, microwave, stovetop and sink, and the bathroom has a shower/tub combo. Choose ground or second floor, in the courtyard or poolside.',
    photos: [
      { src: 'one-bedroom-01.webp', alt: 'One Bedroom living area with pullout sofa and kitchenette counter' },
      { src: 'one-bedroom-02.webp', alt: 'One Bedroom bedroom with a Queen bed' },
      { src: 'one-bedroom-03.webp', alt: 'One Bedroom kitchenette with mini-fridge, microwave and gray cabinets' },
      { src: 'one-bedroom-04.webp', alt: 'One Bedroom dining table by the window' },
      { src: 'one-bedroom-05.webp', alt: 'One Bedroom bathroom with a sea turtle shower curtain' }
    ]
  },
  {
    slug: 'king-suite-with-spa-tub',
    rid: '492339',
    name: 'King Suite with Spa Tub',
    beds: 'King + pullout sofa',
    bedDetails: [{ type: 'King', count: 1 }, { type: 'Pullout sofa', count: 1 }],
    sleeps: 4,
    bathroom: 'Two bathrooms',
    location: 'Second floor · No elevator',
    pets: false,
    kitchenette: true,
    accessible: false,
    jacuzzi: true,
    pullout: true,
    secondFloor: true,
    description: 'A King in a separate bedroom with a TV, plus a pullout sofa in a living room with its own TV. You get two bathrooms, a jacuzzi tub and a kitchenette with a mini-fridge, microwave, stovetop and sink. It is on the second floor, and there is no elevator.',
    photos: [
      { src: 'king-suite-with-spa-tub-01.webp', alt: 'King Suite with Spa Tub bedroom with a King bed' },
      { src: 'king-suite-with-spa-tub-02.webp', alt: 'King Suite with Spa Tub living area with pullout sofa' },
      { src: 'king-suite-with-spa-tub-03.webp', alt: 'King Suite with Spa Tub living area with sofa and dining chairs' },
      { src: 'king-suite-with-spa-tub-04.webp', alt: 'King Suite with Spa Tub jacuzzi tub framed by columns' },
      { src: 'king-suite-with-spa-tub-05.webp', alt: 'King Suite with Spa Tub bathroom with two pedestal sinks' }
    ]
  },
  {
    slug: 'two-bedroom',
    rid: '492340',
    name: 'Two Bedroom',
    beds: '2 Queens + pullout sofa',
    bedDetails: [{ type: 'Queen', count: 2 }, { type: 'Pullout sofa', count: 1 }],
    sleeps: 5,
    bathroom: 'One bathroom',
    location: 'Poolside · Ground level',
    pets: false,
    kitchenette: true,
    accessible: false,
    jacuzzi: false,
    pullout: true,
    secondFloor: false,
    description: 'Two separate bedrooms with a Queen in each, a pullout sofa and a kitchenette make this our roomiest layout for families and friends. It sits on the ground level, right by the pool.',
    photos: [
      { src: 'two-bedroom-01.webp', alt: 'Two Bedroom living area with pullout sofa and a view toward a bedroom' },
      { src: 'two-bedroom-02.webp', alt: 'Two Bedroom seating area with an open doorway to a bedroom' },
      { src: 'two-bedroom-03.webp', alt: 'Two Bedroom bedroom with a Queen bed and wall-mounted TV' },
      { src: 'two-bedroom-04.webp', alt: 'Two Bedroom bathroom with an anchor-print shower curtain' }
    ]
  }
];
