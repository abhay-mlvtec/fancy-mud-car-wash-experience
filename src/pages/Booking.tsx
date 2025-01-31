import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Booking = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [pincode, setPincode] = useState("");
  const [carType, setCarType] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [phone, setPhone] = useState("");

  const handleNext = () => {
    if (step === 1 && !pincode) {
      toast({
        title: "Error",
        description: "Please enter a valid pincode",
        variant: "destructive",
      });
      return;
    }

    if (step === 2 && (!carType || !serviceType)) {
      toast({
        title: "Error",
        description: "Please select both car type and service type",
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
      // Handle booking submission
      toast({
        title: "Success",
        description: "Your booking has been confirmed!",
      });
      navigate("/");
      return;
    }

    setStep(step + 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    s === step
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Enter Your Location</h2>
              <Input
                type="text"
                placeholder="Enter Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Select Car Type</h2>
                <RadioGroup value={carType} onValueChange={setCarType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sedan" id="sedan" />
                    <Label htmlFor="sedan">Sedan</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="suv" id="suv" />
                    <Label htmlFor="suv">SUV</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hatchback" id="hatchback" />
                    <Label htmlFor="hatchback">Hatchback</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Select Service Type</h2>
                <RadioGroup value={serviceType} onValueChange={setServiceType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="basic" id="basic" />
                    <Label htmlFor="basic">Basic Wash</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="premium" id="premium" />
                    <Label htmlFor="premium">Premium Wash</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="deluxe" id="deluxe" />
                    <Label htmlFor="deluxe">Deluxe Package</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Select Date & Time</h2>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                disabled={(date) => date < new Date()}
              />
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">9:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="12:00">12:00 PM</SelectItem>
                  <SelectItem value="13:00">1:00 PM</SelectItem>
                  <SelectItem value="14:00">2:00 PM</SelectItem>
                  <SelectItem value="15:00">3:00 PM</SelectItem>
                  <SelectItem value="16:00">4:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Contact Information</h2>
              <Input
                type="tel"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          )}

          <div className="mt-8 flex justify-end">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="mr-4"
              >
                Back
              </Button>
            )}
            <Button onClick={handleNext}>
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