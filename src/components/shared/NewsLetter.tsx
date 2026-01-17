import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <section className="bg-gray-900 text-white py-16 relative">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-indigo-500">
          Stay Updated
        </h2>
        <p className="text-gray-400 mb-8">
          Subscribe to our newsletter for the latest travel guides and tips.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full sm:flex-1 px-4 py-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-md text-white font-semibold transition-colors"
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
