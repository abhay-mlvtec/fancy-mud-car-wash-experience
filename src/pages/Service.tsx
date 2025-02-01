import { useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';


const services = {
  '1': {
    title: 'Premium Wash',
    description: 'Our premium wash service includes a thorough exterior cleaning, premium wax protection, and attention to every detail.',
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f',
    price: 'Rs 299.99',
    features: [
      'Hand wash and dry',
      'Wheel and tire cleaning',
      'Premium wax application',
      'Window cleaning',
      'Tire dressing'
    ]
  },
  '2': {
    title: 'Interior Detail',
    description: 'A comprehensive interior cleaning service that leaves your car\'s cabin fresh and spotless.',
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785',
    price: 'Rs. 499.99',
    features: [
      'Vacuum all surfaces',
      'Steam clean upholstery',
      'Dashboard and console cleaning',
      'Window cleaning',
      'Air freshener'
    ]
  },
  '3': {
    title: 'Full Detail',
    description: 'The ultimate car care package combining our premium wash and interior detail services.',
    image: 'https://images.unsplash.com/photo-1605618313023-d3640b8c121f',
    price: 'Rs. 899.99',
    features: [
      'Premium wash service',
      'Interior detail service',
      'Paint correction',
      'Ceramic coating',
      'Engine bay cleaning'
    ]
  }
};

const Service = () => {
  const navigate = useNavigate();  // ✅ useNavigate inside component

  const handleBooking = () => {
    console.log("booking clicked")
    navigate(`/booking`);
  };

  const { id } = useParams();
  const service = services[id as keyof typeof services];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <div className="relative h-[60vh]">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">{service.title}</h1>
              <p className="text-2xl">{service.price}</p>
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6">Service Details</h2>
              <p className="text-gray-600 mb-8">{service.description}</p>

              <h3 className="text-2xl font-bold mb-4">What's Included</h3>
              <ul className="space-y-4 mb-8">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                className="w-full bg-secondary text-primary py-4 rounded-lg font-bold hover:bg-secondary/90 transition-colors"
                onClick={handleBooking}>
                Book Now - {service.price}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Service;