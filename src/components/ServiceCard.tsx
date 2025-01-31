import { Link } from 'react-router-dom';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
}

const ServiceCard = ({ id, title, description, image, price }: ServiceCardProps) => {
  return (
    <Link 
      to={`/service/${id}`}
      className="group relative overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
    >
      <div className="aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-secondary font-bold text-lg">{price}</span>
          <span className="text-primary opacity-0 transform translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;