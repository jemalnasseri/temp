import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Calendar, Clock, User, Check } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  notes: string;
}

const PublicBookingPage = () => {
  // Mock data for services
  const defaultServices: Service[] = [
    {
      id: "1",
      name: "Haircut",
      price: 30,
      duration: 30,
      description: "Professional haircut with styling",
    },
    {
      id: "2",
      name: "Manicure",
      price: 25,
      duration: 45,
      description: "Complete nail care and polish",
    },
    {
      id: "3",
      name: "Facial Treatment",
      price: 50,
      duration: 60,
      description: "Deep cleansing facial with massage",
    },
    {
      id: "4",
      name: "Hair Coloring",
      price: 75,
      duration: 90,
      description: "Full hair coloring service",
    },
  ];

  // Mock data for time slots
  const defaultTimeSlots: TimeSlot[] = [
    { id: "t1", time: "9:00 AM", available: true },
    { id: "t2", time: "10:00 AM", available: true },
    { id: "t3", time: "11:00 AM", available: false },
    { id: "t4", time: "12:00 PM", available: true },
    { id: "t5", time: "1:00 PM", available: true },
    { id: "t6", time: "2:00 PM", available: false },
    { id: "t7", time: "3:00 PM", available: true },
    { id: "t8", time: "4:00 PM", available: true },
  ];

  // State management
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(defaultTimeSlots);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null,
  );
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  // Handle service selection
  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setCurrentStep(2);
  };

  // Handle date selection
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    // In a real app, you would fetch available time slots for this date
    setCurrentStep(3);
  };

  // Handle time slot selection
  const handleTimeSelect = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setCurrentStep(4);
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit the booking data to your backend
    setCurrentStep(5); // Move to confirmation step
  };

  // Generate dates for the next 7 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split("T")[0],
        display: date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
      });
    }

    return dates;
  };

  const dates = generateDates();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-6 px-4 md:px-6">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold">Clinix Booking</h1>
          <p className="text-sm md:text-base opacity-90">
            Schedule your appointment in just a few clicks
          </p>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between mb-8">
          <div className="flex items-center">
            <div
              className={`rounded-full h-8 w-8 flex items-center justify-center ${currentStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              1
            </div>
            <span className="ml-2 text-sm hidden md:inline">
              Select Service
            </span>
          </div>
          <div className="h-0.5 flex-1 mx-2 bg-muted self-center">
            <div
              className={`h-full bg-primary transition-all ${currentStep >= 2 ? "w-full" : "w-0"}`}
            ></div>
          </div>
          <div className="flex items-center">
            <div
              className={`rounded-full h-8 w-8 flex items-center justify-center ${currentStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              2
            </div>
            <span className="ml-2 text-sm hidden md:inline">Choose Date</span>
          </div>
          <div className="h-0.5 flex-1 mx-2 bg-muted self-center">
            <div
              className={`h-full bg-primary transition-all ${currentStep >= 3 ? "w-full" : "w-0"}`}
            ></div>
          </div>
          <div className="flex items-center">
            <div
              className={`rounded-full h-8 w-8 flex items-center justify-center ${currentStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              3
            </div>
            <span className="ml-2 text-sm hidden md:inline">Select Time</span>
          </div>
          <div className="h-0.5 flex-1 mx-2 bg-muted self-center">
            <div
              className={`h-full bg-primary transition-all ${currentStep >= 4 ? "w-full" : "w-0"}`}
            ></div>
          </div>
          <div className="flex items-center">
            <div
              className={`rounded-full h-8 w-8 flex items-center justify-center ${currentStep >= 4 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              4
            </div>
            <span className="ml-2 text-sm hidden md:inline">Your Details</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Step 1: Service Selection */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6">Select a Service</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <Card
                    key={service.id}
                    className={`cursor-pointer transition-all hover:border-primary ${selectedService?.id === service.id ? "border-primary" : ""}`}
                    onClick={() => handleServiceSelect(service)}
                  >
                    <CardHeader>
                      <CardTitle>{service.name}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                      <div>
                        <span className="font-bold">${service.price}</span>
                        <span className="text-muted-foreground ml-2">
                          {service.duration} min
                        </span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Date Selection */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentStep(1)}
                >
                  <ChevronRight className="h-4 w-4 rotate-180 mr-2" /> Back
                </Button>
                <h2 className="text-2xl font-bold ml-2">Select a Date</h2>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>
                    Selected Service: {selectedService?.name}
                  </CardTitle>
                  <CardDescription>
                    ${selectedService?.price} · {selectedService?.duration}{" "}
                    minutes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2">
                    {dates.map((date) => (
                      <Button
                        key={date.value}
                        variant={
                          selectedDate === date.value ? "default" : "outline"
                        }
                        className="flex flex-col h-auto py-3"
                        onClick={() => handleDateSelect(date.value)}
                      >
                        <Calendar className="h-4 w-4 mb-1" />
                        <span>{date.display}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Time Selection */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentStep(2)}
                >
                  <ChevronRight className="h-4 w-4 rotate-180 mr-2" /> Back
                </Button>
                <h2 className="text-2xl font-bold ml-2">Select a Time</h2>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Available Time Slots</CardTitle>
                  <CardDescription>
                    {selectedService?.name} ·{" "}
                    {new Date(selectedDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot.id}
                        variant={
                          selectedTimeSlot?.id === slot.id
                            ? "default"
                            : "outline"
                        }
                        disabled={!slot.available}
                        onClick={() => slot.available && handleTimeSelect(slot)}
                        className="flex items-center justify-center"
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Client Information */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentStep(3)}
                >
                  <ChevronRight className="h-4 w-4 rotate-180 mr-2" /> Back
                </Button>
                <h2 className="text-2xl font-bold ml-2">Your Information</h2>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                  <CardDescription>
                    {selectedService?.name} ·{" "}
                    {new Date(selectedDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    · {selectedTimeSlot?.time}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="notes">
                          Additional Notes (Optional)
                        </Label>
                        <Input
                          id="notes"
                          name="notes"
                          placeholder="Any special requests or information"
                          value={formData.notes}
                          onChange={handleInputChange}
                        />
                      </div>
                      <Button type="submit" className="w-full mt-4">
                        Confirm Booking
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 5: Confirmation */}
          {currentStep === 5 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="flex flex-col items-center justify-center py-10">
                <div className="rounded-full bg-primary/10 p-6 mb-6">
                  <Check className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
                <p className="text-muted-foreground mb-6">
                  Your appointment has been successfully scheduled.
                </p>

                <Card className="w-full max-w-md">
                  <CardHeader>
                    <CardTitle>Appointment Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Service:</span>
                        <span className="font-medium">
                          {selectedService?.name}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-medium">
                          {new Date(selectedDate).toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time:</span>
                        <span className="font-medium">
                          {selectedTimeSlot?.time}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">
                          {selectedService?.duration} minutes
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price:</span>
                        <span className="font-medium">
                          ${selectedService?.price}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setCurrentStep(1)}
                    >
                      Book Another Appointment
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicBookingPage;
