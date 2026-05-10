import { useState } from "react";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email!");
      return;
    }

    toast.success(`Thank you for subscribing with ${email}!`);
    setEmail(""); // Clear input
  };

  return (
    <section className="bg-gray-50 text-gray-900 py-16 relative">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          Stay Updated
        </h2>
        <p className="text-gray-600 mb-8">
          Subscribe to our newsletter for the latest travel guides and tips.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full sm:flex-1 px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-md text-white font-semibold transition-colors"
          >
            Subscribe
          </button>
        </form>

        <p className="text-gray-500 text-xs mt-4">
          No spam, we promise. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
