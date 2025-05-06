import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-700">Clinix</h1>
          </div>
          <nav>
            <Button asChild variant="outline" className="mr-4">
              <Link to="/login">Admin Login</Link>
            </Button>
            <Button asChild>
              <Link to="/booking">Book Appointment</Link>
            </Button>
          </nav>
        </header>

        <main>
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Streamlined Clinic Management & Booking
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                A comprehensive solution for clinics and beauty centers to
                manage appointments, services, and clients with ease.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link to="/booking">Book an Appointment</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/services">View Services</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
                  alt="Clinic Management"
                  className="rounded-lg w-full h-auto"
                />
              </div>
            </div>
          </div>

          <div className="mt-24">
            <h3 className="text-2xl font-bold text-center mb-12">
              Our Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Medical Consultations",
                  description:
                    "Professional consultations with experienced healthcare providers.",
                  icon: "stethoscope",
                },
                {
                  title: "Beauty Treatments",
                  description:
                    "Comprehensive beauty services tailored to your needs.",
                  icon: "sparkles",
                },
                {
                  title: "Wellness Programs",
                  description:
                    "Holistic wellness programs designed for your overall health.",
                  icon: "heart",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-blue-700 text-xl">✦</span>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">
                    {service.title}
                  </h4>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </main>

        <footer className="mt-24 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Clinix. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default Home;
