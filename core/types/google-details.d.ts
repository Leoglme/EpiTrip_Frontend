interface GooglePlaceDetails {
  name: string
  formatted_phone_number?: string
  current_opening_hours?: RegularOpeningHours
}

interface RegularOpeningHours {
  open_now: boolean
  periods: {
    close?: GooglePeriod
    open?: GooglePeriod
  }[]
  weekday_text?: string[]
}

type GooglePeriod = {
  date: string
  day: number
  time: string
  truncated?: boolean
}

export type { GooglePlaceDetails, RegularOpeningHours, GooglePeriod }
