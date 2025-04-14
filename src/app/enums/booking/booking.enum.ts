export enum BookingPaymentStatusEnum {
  choosePaymentMethod = "waiting for payment",
  pending = "pending",
  expired = "expired",
  cancel = "cancel",
  paid = "berhasil",
  unconfirmed = "admin confirmation",
  confirmed = "confirmed",
  failed = "failed",
  notFound = "not found",
  awaitingPaymentVerification = "payment verification"
}

export enum ReviewValidPayloadEnum {
  minCharacterName = 3,
  minCharacterComment = 25,
}

