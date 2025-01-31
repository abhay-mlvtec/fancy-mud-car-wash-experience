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
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-8">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${
                    s === step
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-muted-foreground border-muted"
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-3xl font-bold text-center mb-8">Enter Your Location</h2>
              <Input
                type="text"
                placeholder="Enter Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="text-lg p-6"
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-fadeIn">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-center mb-8">Select Your Preferences</h2>
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Car Type</Label>
                  <RadioGroup value={carType} onValueChange={setCarType} className="grid grid-cols-1 gap-4">
                    {["sedan", "suv", "hatchback"].map((type) => (
                      <div key={type} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted">
                        <RadioGroupItem value={type} id={type} />
                        <Label htmlFor={type} className="capitalize">{type}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Service Type</Label>
                  <RadioGroup value={serviceType} onValueChange={setServiceType} className="grid grid-cols-1 gap-4">
                    {["basic", "premium", "deluxe"].map((type) => (
                      <div key={type} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted">
                        <RadioGroupItem value={type} id={type} />
                        <Label htmlFor={type} className="capitalize">{type}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-fadeIn">
              <h2 className="text-3xl font-bold text-center mb-8">Choose Date & Time</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Select Date</Label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    disabled={(date) => date < new Date()}
                  />
                </div>
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Select Time</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Time" />
                    </SelectTrigger>
                    <SelectContent>
                      {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"].map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-3xl font-bold text-center mb-8">Contact Information</h2>
              <Input
                type="tel"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-lg p-6"
              />
            </div>
          )}

          <div className="mt-8 flex justify-between">
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
              className="px-8 ml-auto"
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