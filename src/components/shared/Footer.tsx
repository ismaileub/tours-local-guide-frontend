import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden pt-16 pb-12 bg-gray-900 text-white">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #1e1e2f 0%, #0b0b1a 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 sm:px-8 md:px-12 lg:px-20 xl:px-28">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          {/* Left */}
          <div>
            <h2 className="text-2xl font-bold mb-1 text-indigo-500">
              GuideHub
            </h2>
            <p className="text-gray-400 text-sm">
              Explore, plan, and enjoy your trips with trusted local guides.
            </p>
          </div>

          {/* Center Navigation */}
          <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm mt-4 md:mt-0">
            <Link href="/" className="hover:text-indigo-400 transition-colors">
              Home
            </Link>
            <Link
              href="/tours"
              className="hover:text-indigo-400 transition-colors"
            >
              Tours
            </Link>
            <Link
              href="/guides"
              className="hover:text-indigo-400 transition-colors"
            >
              Guides
            </Link>
            <Link
              href="about"
              className="hover:text-indigo-400 transition-colors"
            >
              About
            </Link>
            <Link href="#" className="hover:text-indigo-400 transition-colors">
              Contact
            </Link>
          </div>

          {/* Right */}
          <div className="text-sm text-gray-500 mt-4 md:mt-0">
            © {currentYear} GuideHub. All rights reserved.
          </div>
        </div>

        {/* Optional Bottom Section */}
        <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-500 text-xs">
          Made with ❤️ for travelers worldwide.
        </div>
      </div>
    </footer>
  );
}
