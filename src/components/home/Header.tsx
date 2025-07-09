import { useState, useEffect } from "react";
import { CiMenuFries } from "react-icons/ci";
import {  FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useNavigate();

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Customers", href: "#customers" },
    { name: "FAQ", href: "#faq" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg shadow-gray-100/50 border-b border-gray-100" : "bg-white/80 backdrop-blur-sm"}`}>
      <nav className=" mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center group cursor-pointer">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-200"></div>
            </div>
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-200">SaldaQ</span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <a key={index} href={item.href} className="relative px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-all duration-200 rounded-lg hover:bg-gray-50 group">
                {item.name}
                <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 group-hover:w-6 group-hover:left-1/2 group-hover:-translate-x-1/2 rounded-full"></span>
              </a>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button className="px-5 py-2 text-gray-700 hover:text-gray-900 font-medium transition-all duration-200 rounded-lg hover:bg-gray-50" onClick={() => router("/login")}>Login</button>
            <button className="group relative px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 overflow-hidden" onClick={() => router("/signup")}>
              <span className="relative z-10 flex items-center space-x-2">
                <span>Sign Up</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden relative p-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-all duration-200 hover:bg-gray-50"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 relative">
              <CiMenuFries className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${isMenuOpen ? "opacity-0 rotate-180" : "opacity-100 rotate-0"}`} />
              <FaTimes className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"}`} />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-96 opacity-100 visible" : "max-h-0 opacity-0 invisible overflow-hidden"}`}>
          <div className="px-2 pt-4 pb-6 space-y-2 bg-white/95 backdrop-blur-md border-t border-gray-100 rounded-b-2xl shadow-lg">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl font-medium transition-all duration-200 transform hover:translate-x-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}

            <div className="pt-4 space-y-3 border-t border-gray-100 mt-4">
              <button className="block w-full text-center px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl font-medium transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
                Login
              </button>
              <button
                className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-4 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
