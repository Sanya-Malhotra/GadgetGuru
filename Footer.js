import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Company Information */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h5 className="text-xl font-bold mb-4">Gadget Guru</h5>
            <p className="text-sm">
              Your one-stop shop for the latest gadgets and electronics.
              Discover innovative products and unbeatable deals.
            </p>
          </div>

          {/* Customer Service */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h5 className="text-xl font-bold mb-4">Customer Service</h5>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  FAQ
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Returns
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">
                  Shipping
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h5 className="text-xl font-bold mb-4">Follow Us</h5>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-400">
                <FaFacebook size="1.5em" />
              </a>
              <a href="#" className="hover:text-gray-400">
                <FaTwitter size="1.5em" />
              </a>
              <a href="#" className="hover:text-gray-400">
                <FaInstagram size="1.5em" />
              </a>
            </div>
          </div>

          {/* Newsletter Subscription */}
          {/* <div className="w-full md:w-1/4">
            <h5 className="text-xl font-bold mb-4">Newsletter</h5>
            <form>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 mb-2 text-gray-800"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-2"
              >
                Subscribe
              </button>
            </form>
          </div> */}
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2024 Gadget Guru. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
