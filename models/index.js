export const FILTERS = {
  region: 'odessa',
  tags: [
    'tag1',
    'tag2',
  ],
}

export const SEO = {
  title: 'seo title',
  description: 'seo description',
  keywords: 'seo keywords'
}


export const PLACE = {
  type: 'place',
  isPublished: false,
  name: 'name',
  description: 'description',
  image: 'https://via.placeholder.com/120x80?text=img-place',
  coordinates: { lat: 46.48, lng: 30.72 },
  // link: 'place-name',
  // slug: 'place-name',
  // dbObjectId: '0001',
  ...FILTERS,
}

export const PAGE = {
  type: 'page',
  blocks: [],
}

// export const getRouteScheme = () => ({
//   type: 'route',
//   public: false,
//   name: 'Route name',
//   description: 'Route description',
//   image: 'https://via.placeholder.com/120x80?text=img-place',
//   markers: [],

//   // ?? TODO transfer to another entity ??
//   pageBlocks: [],
//   seo: getSeoScheme(),
//   ...getFiltersScheme(),
// })
