import Link from "next/link";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaFacebookF,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden pt-16 pb-12 bg-gray-900 text-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-linear-to-t from-gray-900 via-gray-800 to-gray-900 opacity-80" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 sm:px-8 md:px-12 lg:px-20 xl:px-28">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          {/* Brand */}
          <div>
            <h2 className="text-lg md:text-4xl font-bold mb-1 text-indigo-500">
              GuideHub
            </h2>
            <p className="text-gray-400 text-sm">
              Explore, plan, and enjoy your trips with trusted local guides.
            </p>
          </div>

          {/* Navigation */}
          <nav
            aria-label="Footer Navigation"
            className="flex flex-col md:flex-row flex-wrap justify-center md:justify-start space-y-2 md:space-y-0 md:space-x-6 text-sm mt-4 md:mt-0"
          >
            <Link
              href="/"
              className="hover:text-indigo-400 transition-colors"
              aria-label="Home"
            >
              Home
            </Link>
            <Link
              href="/tours"
              className="hover:text-indigo-400 transition-colors"
              aria-label="Tours"
            >
              Tours
            </Link>
            <Link
              href="/guides"
              className="hover:text-indigo-400 transition-colors"
              aria-label="Guides"
            >
              Guides
            </Link>
            <Link
              href="/about"
              className="hover:text-indigo-400 transition-colors"
              aria-label="About"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-indigo-400 transition-colors"
              aria-label="Contact"
            >
              Contact
            </Link>
          </nav>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-400 transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter size={20} />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 transition-colors"
              aria-label="Facebook"
            >
              <FaFacebookF size={20} />
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-500 mt-4 md:mt-0">
            © {currentYear} GuideHub. All rights reserved.
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-500 text-xs">
          Made with{" "}
          <span role="img" aria-label="love">
            ❤️
          </span>{" "}
          for travelers worldwide.
        </div>
      </div>
    </footer>
  );
}
