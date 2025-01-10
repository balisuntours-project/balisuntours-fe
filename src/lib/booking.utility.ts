export class BookingUtility {
  static handleIpay88Checkout(
    checkoutId: string,
    signature: string,
    checkoutUrl: string
  ): void {
    // Pastikan ini hanya dijalankan di browser
    if (typeof window === "undefined") {
      throw new Error(
        "handleIpay88Checkout can only be called in the browser."
      );
    }

    // Membuat elemen form secara dinamis
    const form = document.createElement("form");
    form.method = "POST";
    form.action = checkoutUrl;

    // Menambahkan input untuk CheckoutID
    const checkoutInput = document.createElement("input");
    checkoutInput.type = "hidden";
    checkoutInput.name = "CheckoutID";
    checkoutInput.value = checkoutId;
    form.appendChild(checkoutInput);

    // Menambahkan input untuk Signature
    const signatureInput = document.createElement("input");
    signatureInput.type = "hidden";
    signatureInput.name = "Signature";
    signatureInput.value = signature;
    form.appendChild(signatureInput);

    // Menambahkan form ke body
    document.body.appendChild(form);

    // Submit form secara otomatis
    form.submit();
  }
}
