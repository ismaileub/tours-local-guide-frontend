/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  bookingId: string;
  token: string;
}

const CheckoutForm = ({ bookingId, token }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [booking, setBooking] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  // 🔹 1. Load booking
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_API}/booking/${bookingId}`, {
        headers: { authorization: token },
      })
      .then((res) => setBooking(res.data.data))
      .catch(() => setError("Failed to load booking"));
  }, [bookingId]);

  // 🔹 2. Create Stripe payment intent
  useEffect(() => {
    if (!booking || !token) return;

    const createPaymentIntent = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/payment/create-payment-intent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: token,
            },
            body: JSON.stringify({ bookingId: booking._id }),
          }
        );

        if (!res.ok) throw new Error("Failed to create payment intent");

        const data = await res.json();
        //console.log("Payment intent response:", data);
        const secret = data.data.clientSecret as string;
        setClientSecret(secret);
      } catch (err: any) {
        console.error(err);
        setError("Failed to initialize payment");
      }
    };

    createPaymentIntent();
  }, [booking, token]);

  //console.log({ clientSecret });

  // 🔹 3. Handle payment
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) return;

    setProcessing(true);
    setError("");

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            name: booking.touristId.name,
            email: booking.touristId.email,
            phone: booking.phone,
          },
        },
      }
    );

    if (error) {
      console.log(error);
      setError(error.message || "Payment failed");
      setProcessing(false);
      return;
    }

    // 🔹 4. Mark booking as PAID in backend
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/payment/save-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          body: JSON.stringify({
            bookingId: booking._id,
            transactionId: paymentIntent.id,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to confirm payment");
      }

      const data = await res.json();
      console.log("Payment confirmed response:", data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to confirm payment");
    }

    Swal.fire({
      icon: "success",
      title: "Payment Successful",
      text: "Your booking has been paid.",
    }).then(() => {
      // Redirect after user clicks "OK"
      router.push("/dashboard/tourist/tourist-payment");
    });

    setProcessing(false);
  };

  // UI Guards
  if (!booking) return <p>Loading booking...</p>;

  if (booking.status !== "COMPLETED") {
    return <p className="text-red-600">Booking is not confirmed yet.</p>;
  }

  if (booking.paymentStatus === "PAID") {
    return <p className="text-green-600">This booking is already paid.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-bold">Pay for Booking</h3>

      <p>
        <b>Booking Type:</b> {booking.bookingType}
      </p>
      <p>
        <b>Tour Date: </b> {booking.tourDate}
      </p>
      <p>
        <b>Total:</b> ${booking.totalPrice}
      </p>

      <CardElement />

      <Button
        className=" bg-blue-700 cursor-pointer w-full"
        type="submit"
        disabled={!stripe || !clientSecret || processing}
      >
        {processing ? "Processing..." : `Pay`}
      </Button>
      {/* <p>Stripe loaded: {stripe ? "Yes" : "No"}</p>
      <p>Client Secret: {clientSecret ? "Yes" : "No"}</p>
      <p>Booking loaded: {booking ? "Yes" : "No"}</p> */}

      {error && <p className="text-red-500">Hello {error}</p>}
    </form>
  );
};

export default CheckoutForm;
