export enum ActivityStatusEnum {
  unpublished = "Unpublished",
  published = "Published",
}

export enum ActivityPackageTypeEnum {
  basicItinerary = "1",
  pickupTimeByTeam = "2",
  pickupTimeByTraveller = "3",
  freeTour = "4",
}

export enum ActivityPackageSelfConfirmationStatus {
  self = "1",
  waiting = "0",
}

export enum ActivityItineraryTypeEnum {
  departure = "Departure",
  dropoff = "Dropoff",
  attraction = "Attractions",
  meal = "Meals"
}


export enum IncrementDecrementEnum {
  increment = "plus",
  decrement = "mines"
}