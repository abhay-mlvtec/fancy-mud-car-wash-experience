import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold text-primary">
            Fancy Mud Car Wash
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-primary hover:text-secondary transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-primary hover:text-secondary transition-colors">
              Services
            </Link>
            <Link to="/about" className="text-primary hover:text-secondary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-primary hover:text-secondary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 animate-slideIn">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-primary hover:text-secondary transition-colors">
                Home
              </Link>
              <Link to="/services" className="text-primary hover:text-secondary transition-colors">
                Services
              </Link>
              <Link to="/about" className="text-primary hover:text-secondary transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-primary hover:text-secondary transition-colors">
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;