import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  Users,
  Briefcase,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";
import AppointmentCalendar from "./AppointmentCalendar";
import ServiceManagement from "./ServiceManagement";

interface AdminDashboardProps {
  clinicName?: string;
  adminName?: string;
  metrics?: {
    totalAppointments: number;
    totalServices: number;
    totalClients: number;
  };
}

const AdminDashboard = ({
  clinicName = "Wellness Clinic",
  adminName = "Dr. Jane Smith",
  metrics = {
    totalAppointments: 124,
    totalServices: 15,
    totalClients: 87,
  },
}: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-primary">{clinicName}</h2>
          <div className="mt-6 flex items-center">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium">{adminName}</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          </div>
        </div>
        <nav className="mt-6">
          <Button
            variant={activeTab === "overview" ? "secondary" : "ghost"}
            className="w-full justify-start rounded-none py-3 px-6"
            onClick={() => setActiveTab("overview")}
          >
            <LayoutDashboard className="mr-2 h-5 w-5" />
            Overview
          </Button>
          <Button
            variant={activeTab === "appointments" ? "secondary" : "ghost"}
            className="w-full justify-start rounded-none py-3 px-6"
            onClick={() => setActiveTab("appointments")}
          >
            <CalendarIcon className="mr-2 h-5 w-5" />
            Appointments
          </Button>
          <Button
            variant={activeTab === "services" ? "secondary" : "ghost"}
            className="w-full justify-start rounded-none py-3 px-6"
            onClick={() => setActiveTab("services")}
          >
            <Briefcase className="mr-2 h-5 w-5" />
            Services
          </Button>
          <Button
            variant={activeTab === "clients" ? "secondary" : "ghost"}
            className="w-full justify-start rounded-none py-3 px-6"
            onClick={() => setActiveTab("clients")}
          >
            <Users className="mr-2 h-5 w-5" />
            Clients
          </Button>
          <Button
            variant={activeTab === "settings" ? "secondary" : "ghost"}
            className="w-full justify-start rounded-none py-3 px-6"
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <Button variant="outline" className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        {activeTab === "overview" && (
          <div>
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>
            <p className="text-muted-foreground mt-2">
              Welcome back to your clinic dashboard.
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Appointments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <CalendarIcon className="h-8 w-8 text-primary mr-3" />
                    <div>
                      <div className="text-3xl font-bold">
                        {metrics.totalAppointments}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        +5% from last month
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Active Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Briefcase className="h-8 w-8 text-primary mr-3" />
                    <div>
                      <div className="text-3xl font-bold">
                        {metrics.totalServices}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        +2 new this month
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Clients
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-primary mr-3" />
                    <div>
                      <div className="text-3xl font-bold">
                        {metrics.totalClients}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        +12 new this month
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <Card>
                <CardContent className="p-0">
                  <div className="p-4 border-b">
                    <p className="font-medium">New appointment booked</p>
                    <p className="text-sm text-muted-foreground">
                      Sarah Johnson - Facial Treatment - Today at 2:00 PM
                    </p>
                  </div>
                  <div className="p-4 border-b">
                    <p className="font-medium">Service updated</p>
                    <p className="text-sm text-muted-foreground">
                      Deep Tissue Massage - Price updated - Yesterday
                    </p>
                  </div>
                  <div className="p-4 border-b">
                    <p className="font-medium">New client registered</p>
                    <p className="text-sm text-muted-foreground">
                      Michael Brown - 2 days ago
                    </p>
                  </div>
                  <div className="p-4">
                    <p className="font-medium">Appointment completed</p>
                    <p className="text-sm text-muted-foreground">
                      Emma Wilson - Hair Styling - 3 days ago
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "appointments" && (
          <div>
            <h1 className="text-3xl font-bold">Appointments</h1>
            <p className="text-muted-foreground mt-2">
              Manage your clinic appointments.
            </p>
            <div className="mt-6">
              <AppointmentCalendar />
            </div>
          </div>
        )}

        {activeTab === "services" && (
          <div>
            <h1 className="text-3xl font-bold">Services</h1>
            <p className="text-muted-foreground mt-2">
              Manage your clinic services.
            </p>
            <div className="mt-6">
              <ServiceManagement />
            </div>
          </div>
        )}

        {activeTab === "clients" && (
          <div>
            <h1 className="text-3xl font-bold">Clients</h1>
            <p className="text-muted-foreground mt-2">
              Manage your client database.
            </p>
            <div className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground py-8">
                    Client management features coming soon.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your clinic settings.
            </p>
            <div className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground py-8">
                    Settings features coming soon.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
