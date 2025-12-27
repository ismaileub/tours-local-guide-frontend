"use client";

import { Elements } from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";
import { stripePromise } from "@/helpers/stripe";
import CheckoutForm from "@/components/modules/payment/CheckoutForm";
import { useSession } from "next-auth/react";

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg font-medium">Loading payment info...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <p className="text-red-500 text-center">
        Please login to continue payment
      </p>
    );
  }

  if (!bookingId) {
    return <p className="text-red-500 text-center">Invalid payment request</p>;
  }

  const token = session?.user?.accessToken as string;

  return (
    <div className="max-w-xl mx-auto p-10">
      <h2 className="text-2xl font-bold mb-6">Payment</h2>

      <Elements stripe={stripePromise}>
        <CheckoutForm bookingId={bookingId} token={token} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
