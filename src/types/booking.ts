export interface Person {
  name: string;
  email: string;
  phone: string;
}

export interface Tour {
  title: string;
}

export interface Booking {
  _id: string;
  bookingType: "GUIDE_HIRE" | "TOUR_PACKAGE";
  tourDate: string;
  totalPrice: number;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  paymentStatus: "PAID" | "UNPAID";
  createdAt: string;

  tourist: Person;
  guide: Person;
  tour?: Tour;
}
