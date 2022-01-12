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
  filters: {
    ...FILTERS,
  }
}

export const FILTERS = {
  region: '',
  tags: [
    'tag 1',
    'tag 2',
  ],
}

export const SEO = {
  title: 'seo title',
  description: 'seo description',
  keywords: 'seo keywords'
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
