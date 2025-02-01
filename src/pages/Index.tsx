import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';

const services = [
  {
    id: '1',
    title: 'Premium Wash',
    description: 'Complete exterior wash with premium wax protection',
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f',
    price: 'Rs. 299.99'
  },
  {
    id: '2',
    title: 'Interior Detail',
    description: 'Deep cleaning of all interior surfaces',
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785',
    price: 'Rs. 499.99'
  },
  {
    id: '3',
    title: 'Full Detail',
    description: 'Comprehensive interior and exterior detailing',
    image: 'https://images.unsplash.com/photo-1605618313023-d3640b8c121f',
    price: 'Rs. 899.99'
  }
];

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fadeIn">
            Premium Car Wash Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            Experience the finest car care services in town
          </p>
          <a
            href="#services"
            className="inline-block bg-secondary text-primary px-8 py-3 rounded-full font-bold hover:bg-secondary/90 transition-colors animate-fadeIn"
            style={{ animationDelay: '0.4s' }}
          >
            Explore Services
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9"
                alt="About Us"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">Why Choose Fancy Mud?</h2>
              <p className="text-gray-600 mb-6">
                At Fancy Mud Car Wash, we believe in delivering exceptional quality and service. 
                Our team of experienced professionals uses the latest techniques and premium products 
                to ensure your vehicle receives the care it deserves.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                  Professional Equipment & Products
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                  Experienced Staff
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                  Satisfaction Guaranteed
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;