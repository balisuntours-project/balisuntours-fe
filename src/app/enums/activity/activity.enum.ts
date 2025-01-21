export enum ActivityStatusEnum {
  unpublished = "Unpublished",
  published = "Published",
}

export enum ActivityPackageTypeEnum {
  basicItinerary = "1",
  pickupTimeByTeam = "3",
  pickupTimeByTraveller = "2",
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

export enum ActivityLocalStorageEnum {
  recentlyViewed = "recently-viewed"
}