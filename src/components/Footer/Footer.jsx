import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-base-200 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-0">
          {/* About Section */}
          <div className="md:w-1/4">
            <h3 className="text-xl font-bold mb-4 text-primary">PharmaCare</h3>
            <p className="text-sm">
              Your trusted online pharmacy for authentic medicines and
              healthcare products.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:w-1/4">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-primary">
                  Home
                </a>
              </li>
              <li>
                <a href="/shop" className="hover:text-primary">
                  Shop
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-primary">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-primary">
                  Contact
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-primary">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:w-1/4">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-sm">
              123 Health St.
              <br />
              Medical City, Pharma State
              <br />
              Phone: +1 (555) 123-4567
              <br />
              Email: support@pharmacare.com
            </p>
          </div>

          {/* Social Media */}
          <div className="md:w-1/4">
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4 text-xl">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="hover:text-primary"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="hover:text-primary"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="hover:text-primary"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="hover:text-primary"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-300 dark:border-gray-700 pt-6 text-center text-xs">
          &copy; {new Date().getFullYear()} MediCart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
