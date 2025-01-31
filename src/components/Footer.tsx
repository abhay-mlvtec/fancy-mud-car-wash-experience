import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Fancy Mud Car Wash</h3>
            <p className="text-gray-300">
              Premium car washing services that deliver exceptional results every time.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-secondary transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
              <Link to="/services" className="hover:text-secondary transition-colors">Services</Link>
              <Link to="/about" className="hover:text-secondary transition-colors">About</Link>
              <Link to="/contact" className="hover:text-secondary transition-colors">Contact</Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <div className="space-y-2">
              <p className="flex items-center">
                <MapPin className="mr-2" size={20} />
                123 Wash Street, City, State
              </p>
              <p className="flex items-center">
                <Phone className="mr-2" size={20} />
                (555) 123-4567
              </p>
              <p className="flex items-center">
                <Mail className="mr-2" size={20} />
                info@fancymud.com
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Fancy Mud Car Wash. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;