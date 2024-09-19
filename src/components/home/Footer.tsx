import { FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-wrap justify-between items-center">
          {/* Logo dan Deskripsi */}
          <div className="w-full md:w-[25%] mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">SaldaQ</h2>
            <p className="mt-2 text-gray-400">
              A simple and intuitive expense tracker app for personal use.
            </p>
          </div>

          {/* Navigasi */}
          <div className="w-full md:w-[25%] mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-3">Resources</h3>
            <ul>
              <li>
                <a href="/about" className="hover:text-gray-300">About</a>
              </li>
              <li>
                <a href="/features" className="hover:text-gray-300">Features</a>
              </li>
              <li>
                <a href="/faq" className="hover:text-gray-300">FAQ</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-300">Contact</a>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-[25%] mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-3">Support</h3>
            <ul>
              <li>
                <a href="/about" className="hover:text-gray-300">Help Center</a>
              </li>
              <li>
                <a href="/features" className="hover:text-gray-300">Documentation</a>
              </li>
              <li>
                <a href="/faq" className="hover:text-gray-300">Privacy Policy</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-300">Terms Of Service</a>
              </li>
            </ul>
          </div>

          {/* Ikon Sosial Media */}
          <div className="w-full md:w-[25%]">
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/nur-arini/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <FaLinkedinIn size={24} />
              </a>
              <a href="https://github.com/nrrarnn" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <FaGithub size={24} />
              </a>
              <a href="https://instagram.com/ryn_eclffe" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Hak Cipta */}
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; 2024 SaldaQ. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
