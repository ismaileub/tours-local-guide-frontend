"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PayNowButtonProps {
  bookingId: string;
}

export default function PayNowButton({ bookingId }: PayNowButtonProps) {
  const handlePay = (id: string) => {
    console.log("Pay booking:", id);
    // payment logic here
    toast.success("Payment is coming");
  };

  return (
    <Button onClick={() => handlePay(bookingId)} className="bg-primary">
      Pay Now
    </Button>
  );
}

// const handlePay = async (bookingId: string) => {
//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_API}/payment/init/${bookingId}`,
//         {
//           method: "POST",
//           headers: {
//             authorization: localStorage.getItem("token") || "",
//           },
//         }
//       );

//       const data = await res.json();

//       // Redirect to payment gateway (SSLCommerz / Stripe)
//       //window.location.href = data.paymentUrl;
//     } catch (error) {
//       console.error(error);
//     }
//   };
