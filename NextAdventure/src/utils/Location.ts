import { GeoPoint } from "firebase/firestore"

const MAPS_URL = 'https://maps.googleapis.com/maps/api/geocode/json'
const MAPS_API_KEY = 'AIzaSyAMhnhZQLlOUOY4oQfxxWmc5ITs08eVWMI'

type AddressComponent = {
  long_name: string
  short_name: string
  types: string[]
}

type Location = {
  address_components: AddressComponent[]
}

type LocationsResponse = {
  results: Location[]
}

export const getLocation = async (geopoint: GeoPoint) => {
  try {
    const url = `${MAPS_URL}?latlng=${geopoint.latitude},${geopoint.longitude}&key=${MAPS_API_KEY}`
    console.log({ url })
    let res = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    })
    res = await res.json()

    const locationsResponse = res as unknown as LocationsResponse

    const city = locationsResponse.results
      .flatMap(location => location.address_components)
      .find((component) => component.types.includes('locality'))?.long_name
    const state = locationsResponse.results
      .flatMap(location => location.address_components)
      .find((component) => component.types.includes('administrative_area_level_1'))?.long_name

    return `${city}, ${state}`
  } catch (e) {
    console.log(e)
  }
}
