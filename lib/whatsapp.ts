type BookingPayload = {
  pickup: string;
  destination: string;
  date: string;
  time: string;
  carType: string;
};

export function buildWhatsAppBookingUrl({
  pickup,
  destination,
  date,
  time,
  carType,
}: BookingPayload): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "521234567890";
  const text = encodeURIComponent(
    `Hola, quiero reservar un viaje con Taccxi.\n\nTipo de vehículo: ${carType}\nRecogida: ${pickup}\nDestino: ${destination}\nFecha: ${date}\nHora: ${time}`
  );
  return `https://wa.me/${phone}?text=${text}`;
}

export function buildWhatsAppContactUrl(): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "521234567890";
  const text = encodeURIComponent("Hola, necesito soporte con mi reserva Taccxi.");
  return `https://wa.me/${phone}?text=${text}`;
}
