import Link from "next/link";
import { FaUtensils, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const CustomerFooter = () => {

  const themeColor = "#009966";

  return (
    <footer className="bg-gray-50 mt-12" style={{ borderTop: `2px solid ${themeColor}` }}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <FaUtensils
                className="text-2xl mr-2"
                style={{ color: themeColor }}
              />
              <span
                className="text-2xl font-bold"
                style={{ color: themeColor }}
              >
                RestoFinder
              </span>
            </div>
            <p className="text-gray-600">
              Discover the best restaurants in your area and enjoy delicious meals with just a few clicks.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-green-600">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold" style={{ color: themeColor }}>Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-green-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/restaurants" className="text-gray-600 hover:text-green-600 transition-colors">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-gray-600 hover:text-green-600 transition-colors">
                  Special Deals
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-green-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-green-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold" style={{ color: themeColor }}>Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3" style={{ color: themeColor }} />
                <span className="text-gray-600">123 Food Street, Restaurant City, FC 12345</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3" style={{ color: themeColor }} />
                <span className="text-gray-600">+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3" style={{ color: themeColor }} />
                <span className="text-gray-600">info@restofinder.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold" style={{ color: themeColor }}>Newsletter</h3>
            <p className="text-gray-600">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-1"
                style={{ focusBorderColor: themeColor }}
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-md font-medium text-white hover:bg-green-700 transition-colors"
                style={{ backgroundColor: themeColor }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-12 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} RestoFinder. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link href="/privacy" className="hover:text-green-600">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-green-600">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CustomerFooter;
