import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Navigation, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Service {
  price: number;
  features: string[];
  oldPrice?: number; // Make oldPrice optional
}

interface Services {
  [key: string]: Service;
}

const Booking = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [pincode, setPincode] = useState("");
  const [carType, setCarType] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [serviceLevel, setServiceLevel] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");

  const services: Services = {
    "Express Wash": { 
      price: 30, 
      features: ["High-pressure rinse", "Exterior wash", "Tyre shine"] 
    },
    "Platinum Wash": { 
      price: 69, 
      features: ["Express wash features", "Interior vacuum", "Window cleaning"] 
    },
    "Star Polish": { 
      price: 79, 
      oldPrice: 89, 
      features: ["Platinum features", "Polish", "Wax protection"] 
    },
  };

  const handleNext = () => {
    if (step === 1 && !pincode) {
      toast({
        title: "Error",
        description: "Please enter a valid pincode",
        variant: "destructive",
      });
      return;
    }

    if (step === 2 && (!carType || !serviceType || !serviceLevel)) {
      toast({
        title: "Error",
        description: "Please select all required options",
        variant: "destructive",
      });
      return;
    }

    if (step === 3 && (!date || !time)) {
      toast({
        title: "Error",
        description: "Please select both date and time",
        variant: "destructive",
      });
      return;
    }

    if (step === 4) {
      if (!phone) {
        toast({
          title: "Error",
          description: "Please enter your phone number",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Success",
        description: "Your booking has been confirmed!",
      });
      navigate("/");
      return;
    }

    setStep(step + 1);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-4 mb-12">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors
              ${s === step ? "bg-red-600 text-white" : s < step ? "bg-gray-200 text-gray-600" : "bg-gray-100 text-gray-400"}`}
          >
            {s}
          </div>
          {s < 4 && (
            <div className={`w-12 h-0.5 mx-1 ${s < step ? "bg-red-600" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {renderStepIndicator()}

          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <h1 className="text-4xl font-bold text-center mb-8">Find A Fancy Mud Car Wash Near You</h1>
              <div className="relative max-w-xl mx-auto">
                <Input
                  type="text"
                  placeholder="Enter suburb or postcode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="h-14 pl-12 text-lg"
                />
                <MapPin className="absolute left-4 top-4 text-gray-400" />
                <Button 
                  onClick={() => setStep(2)}
                  className="absolute right-2 top-2 bg-red-600 hover:bg-red-700"
                >
                  Search
                </Button>
              </div>
              <button className="flex items-center gap-2 mx-auto text-gray-600 hover:text-red-600 transition-colors">
                <Navigation className="w-4 h-4" />
                Or use your current location
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-fadeIn">
              <h2 className="text-3xl font-bold text-center mb-8">Select Vehicle & Service</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["SEDAN", "SW/SUV", "4WD/7 SEATER", "X-LARGE"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setCarType(type)}
                    className={`p-6 border rounded-lg flex flex-col items-center gap-4 transition-colors
                      ${carType === type ? "border-red-600 bg-red-50" : "border-gray-200 hover:border-red-600"}`}
                  >
                    <div className="w-16 h-16 flex items-center justify-center">
                      {/* Car icon placeholder - replace with actual icons */}
                      🚗
                    </div>
                    <span className="text-sm font-medium">{type}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Select Service:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Wash Service", "Detailing Service"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setServiceType(type)}
                      className={`p-4 border rounded-lg text-center transition-colors
                        ${serviceType === type ? "border-red-600 bg-red-50" : "border-gray-200 hover:border-red-600"}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(services).map(([name, service]) => (
                  <button
                    key={name}
                    onClick={() => setServiceLevel(name)}
                    className={`p-6 border rounded-lg transition-colors
                      ${serviceLevel === name ? "border-red-600 bg-red-50" : "border-gray-200 hover:border-red-600"}`}
                  >
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-red-600">${service.price}</div>
                      {service.oldPrice && (
                        <div className="text-sm text-gray-500 line-through">${service.oldPrice}</div>
                      )}
                      <div className="font-medium mt-2">{name}</div>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-red-600 flex items-center justify-center text-white">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-fadeIn">
              <h2 className="text-3xl font-bold text-center mb-8">Pick a Date & Time</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-lg font-medium flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Select a Date
                  </label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    disabled={(date) => date < new Date()}
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-lg font-medium flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Select a Time
                  </label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger className="w-full h-14">
                      <SelectValue placeholder="Choose time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"].map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500 mt-2">
                    Express Wash approx 25 mins/45 mins peak
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-3xl font-bold text-center mb-8">Contact Information</h2>
              <div className="max-w-md mx-auto">
                <Input
                  type="tel"
                  placeholder="Enter Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-14 text-lg"
                />
              </div>
            </div>
          )}

          <div className="mt-12 flex justify-between">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="px-8"
              >
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="px-8 ml-auto bg-red-600 hover:bg-red-700"
            >
              {step === 4 ? "Confirm Booking" : "Next"}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Booking;
