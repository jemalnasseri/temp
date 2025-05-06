import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Clock, Filter, Search, User, X } from "lucide-react";

interface Appointment {
  id: string;
  clientName: string;
  serviceName: string;
  date: Date;
  time: string;
  duration: number;
  status: "confirmed" | "cancelled" | "completed" | "pending";
  notes?: string;
  clientPhone?: string;
  clientEmail?: string;
}

const AppointmentCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Mock data for appointments
  const mockAppointments: Appointment[] = [
    {
      id: "1",
      clientName: "Jane Smith",
      serviceName: "Haircut",
      date: new Date(),
      time: "10:00 AM",
      duration: 30,
      status: "confirmed",
      clientPhone: "555-123-4567",
      clientEmail: "jane@example.com",
      notes: "First time client",
    },
    {
      id: "2",
      clientName: "John Doe",
      serviceName: "Massage",
      date: new Date(),
      time: "2:00 PM",
      duration: 60,
      status: "pending",
      clientPhone: "555-987-6543",
      clientEmail: "john@example.com",
    },
    {
      id: "3",
      clientName: "Alice Johnson",
      serviceName: "Facial",
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      time: "11:30 AM",
      duration: 45,
      status: "confirmed",
      clientPhone: "555-555-5555",
      clientEmail: "alice@example.com",
    },
    {
      id: "4",
      clientName: "Bob Williams",
      serviceName: "Manicure",
      date: new Date(new Date().setDate(new Date().getDate() - 1)),
      time: "3:15 PM",
      duration: 45,
      status: "completed",
      clientPhone: "555-222-3333",
      clientEmail: "bob@example.com",
    },
    {
      id: "5",
      clientName: "Carol Taylor",
      serviceName: "Haircut",
      date: new Date(),
      time: "4:30 PM",
      duration: 30,
      status: "cancelled",
      clientPhone: "555-444-7777",
      clientEmail: "carol@example.com",
      notes: "Reschedule needed",
    },
  ];

  // Mock services for filter
  const services = ["Haircut", "Massage", "Facial", "Manicure", "Pedicure"];

  // Filter appointments based on selected date and filters
  const filteredAppointments = mockAppointments.filter((appointment) => {
    const sameDate =
      date &&
      appointment.date.getDate() === date.getDate() &&
      appointment.date.getMonth() === date.getMonth() &&
      appointment.date.getFullYear() === date.getFullYear();

    const matchesStatus =
      statusFilter === "all" || appointment.status === statusFilter;
    const matchesService =
      serviceFilter === "all" || appointment.serviceName === serviceFilter;

    return sameDate && matchesStatus && matchesService;
  });

  // Function to get status badge color
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "confirmed":
        return "secondary";
      case "completed":
        return "default";
      case "cancelled":
        return "destructive";
      case "pending":
        return "outline";
      default:
        return "secondary";
    }
  };

  // Handle appointment selection
  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailsOpen(true);
  };

  // Function to update appointment status
  const updateAppointmentStatus = (
    status: "confirmed" | "cancelled" | "completed" | "pending",
  ) => {
    // In a real app, this would update the appointment in the database
    console.log(
      `Updating appointment ${selectedAppointment?.id} to status: ${status}`,
    );
    setIsDetailsOpen(false);
  };

  return (
    <div className="bg-background w-full h-full p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Appointment Calendar</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Today
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Filter Appointments</DialogTitle>
                  <DialogDescription>
                    Apply filters to view specific appointments.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="service" className="text-right">
                      Service
                    </Label>
                    <Select
                      value={serviceFilter}
                      onValueChange={setServiceFilter}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Services</SelectItem>
                        {services.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setStatusFilter("all");
                      setServiceFilter("all");
                    }}
                  >
                    Reset
                  </Button>
                  <Button type="submit">Apply Filters</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search appointments..."
                className="pl-8 w-[200px] sm:w-[300px]"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>
                Select a date to view appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>
                {date ? (
                  <span>
                    Appointments for{" "}
                    {date.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                ) : (
                  <span>Select a date to view appointments</span>
                )}
              </CardTitle>
              <CardDescription>
                {filteredAppointments.length} appointments scheduled
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredAppointments.length > 0 ? (
                <div className="space-y-4">
                  {filteredAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent cursor-pointer"
                      onClick={() => handleAppointmentClick(appointment)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{appointment.time}</p>
                          <p className="text-sm text-muted-foreground">
                            {appointment.duration} minutes
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">{appointment.serviceName}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <User className="h-3 w-3 mr-1" />
                          <span>{appointment.clientName}</span>
                        </div>
                      </div>
                      <Badge
                        variant={getStatusBadgeVariant(appointment.status)}
                      >
                        {appointment.status.charAt(0).toUpperCase() +
                          appointment.status.slice(1)}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-center">
                  <CalendarIcon className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">
                    No appointments scheduled for this date
                  </p>
                  <Button variant="outline" className="mt-4">
                    Create Appointment
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Appointment Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Appointment Details</DialogTitle>
              <DialogDescription>
                View and manage appointment information.
              </DialogDescription>
            </DialogHeader>
            {selectedAppointment && (
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="client">Client Info</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-4 pt-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Service</Label>
                    <div className="col-span-3">
                      <p>{selectedAppointment.serviceName}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Date</Label>
                    <div className="col-span-3">
                      <p>{selectedAppointment.date.toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Time</Label>
                    <div className="col-span-3">
                      <p>{selectedAppointment.time}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Duration</Label>
                    <div className="col-span-3">
                      <p>{selectedAppointment.duration} minutes</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Status</Label>
                    <div className="col-span-3">
                      <Badge
                        variant={getStatusBadgeVariant(
                          selectedAppointment.status,
                        )}
                      >
                        {selectedAppointment.status.charAt(0).toUpperCase() +
                          selectedAppointment.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label className="text-right pt-2">Notes</Label>
                    <Textarea
                      className="col-span-3"
                      placeholder="No notes"
                      defaultValue={selectedAppointment.notes || ""}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="client" className="space-y-4 pt-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Name</Label>
                    <div className="col-span-3">
                      <p>{selectedAppointment.clientName}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Phone</Label>
                    <div className="col-span-3">
                      <p>{selectedAppointment.clientPhone || "Not provided"}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Email</Label>
                    <div className="col-span-3">
                      <p>{selectedAppointment.clientEmail || "Not provided"}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}
            <DialogFooter className="flex justify-between">
              <div className="flex space-x-2">
                <Button
                  variant="destructive"
                  onClick={() => updateAppointmentStatus("cancelled")}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDetailsOpen(false)}
                >
                  Close
                </Button>
                <Button onClick={() => updateAppointmentStatus("confirmed")}>
                  Update
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AppointmentCalendar;
