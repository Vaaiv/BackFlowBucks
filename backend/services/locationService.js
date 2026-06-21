const { Client } = require('@googlemaps/google-maps-services-js')

const client = new Client({})

// identify store from GPS coordinates
const getStoreFromLocation = async (latitude, longitude) => {
  try {
    const response = await client.placesNearby({
      params: {
        location: { lat: latitude, lng: longitude },
        radius: 100, // 100 meters radius
        key: process.env.GOOGLE_PLACES_API_KEY
      }
    })

    const places = response.data.results

    if (places.length === 0) {
      return null
    }

    // return closest store
    const store = places[0]

    return {
      name: store.name,
      type: store.types[0],
      address: store.vicinity,
      placeId: store.place_id
    }

  } catch (error) {
    throw new Error(`Google Places error: ${error.message}`)
  }
}

// map store type to card category
const getStoreCategory = (storeTypes) => {
  if (storeTypes.includes('grocery_or_supermarket')) return 'groceries'
  if (storeTypes.includes('gas_station')) return 'gas'
  if (storeTypes.includes('restaurant')) return 'dining'
  if (storeTypes.includes('pharmacy')) return 'drugstores'
  if (storeTypes.includes('department_store')) return 'shopping'
  return 'everything' // default category
}

module.exports = { getStoreFromLocation, getStoreCategory }