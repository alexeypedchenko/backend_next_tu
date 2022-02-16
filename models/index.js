export const FILTERS = {
  region: '',
  tags: [],
}

export const SEO = {
  title: 'seo title',
  description: 'seo description',
  keywords: 'seo keywords'
}

export const PLACE = {
  type: 'place',
  // slug: 'place-name',
  isPublished: false,
  name: 'new place',
  description: 'description',
  image: 'https://via.placeholder.com/120x80?text=img-place',
  coordinates: { lat: 46.48, lng: 30.72 },
  ...FILTERS,
}

export const ROUTE = {
  type: 'route',
  // slug: 'route-name',
  isPublished: false,
  name: 'new route',
  description: 'description',
  image: 'https://via.placeholder.com/120x80?text=img-route',
  places: [],
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
