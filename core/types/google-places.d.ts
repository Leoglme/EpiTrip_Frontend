import type { RegularOpeningHours } from '~/core/types/google-details'
import type { Coordinates } from '~/core/types/geo'

type GooglePlace = {
  image?: string | null
  name: string
  numberOfRatings?: number
  rating?: number
  telephone?: string
  location: Coordinates
  openingHours?: RegularOpeningHours
}

type GoogleRestaurant = GooglePlace

type GoogleHotel = GooglePlace

type GoogleBar = GooglePlace

type GoogleEvent = GooglePlace

interface GooglePlacesResponse {
  places: Place[]
}

interface Place {
  name: string
  id: string
  types: string[]
  formattedAddress: string
  addressComponents: AddressComponent[]
  location: Coordinates
  viewport: Viewport
  rating?: number
  utcOffsetMinutes: number
  businessStatus: string
  userRatingCount?: number
  iconMaskBaseUri: string
  iconBackgroundColor: string
  shortFormattedAddress: string
  reviews?: Review[]
  photos?: Photo[]
  primaryType?: string
  primaryTypeDisplayName?: LocalizedText
}

interface AddressComponent {
  longText: string
  shortText: string
  types: string[]
  languageCode: string
}

interface Viewport {
  low: Coordinates
  high: Coordinates
}

interface Review {
  name: string
  relativePublishTimeDescription: string
  rating: number
  text: LocalizedText
  originalText: LocalizedText
  authorAttribution: AuthorAttribution
  publishTime: string
}

interface Photo {
  name: string
  widthPx: number
  heightPx: number
  authorAttributions: AuthorAttribution[]
}

interface AuthorAttribution {
  displayName: string
  uri: string
  photoUri: string
}

interface LocalizedText {
  text: string
  languageCode: string
}

interface SearchNearbyPayload {
  includedTypes: string[]
  maxResultCount: number
  rankPreference: 'DISTANCE' | 'PROMINENCE' // Add other rank preferences if available
  locationRestriction: LocationRestriction
}

interface LocationRestriction {
  circle: Circle
}

interface Circle {
  center: Coordinates
  radius: number
}

export type {
  Coordinates,
  GooglePlace,
  GoogleRestaurant,
  GoogleHotel,
  GoogleBar,
  GoogleEvent,
  GooglePlacesResponse,
  Place,
  AddressComponent,
  Viewport,
  Review,
  Photo,
  AuthorAttribution,
  LocalizedText,
  SearchNearbyPayload,
  LocationRestriction,
  Circle,
}
