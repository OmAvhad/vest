import { CustomNav } from "@/components/CustomNav";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <CustomNav />

      <main className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center mt-24 md:mt-32 space-y-8">
          {/* Hero Section */}
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight animate-fade-in">
              All things finance,
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                {" "}
                right here.
              </span>
            </h1>

            <h2 className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Explore our dashboard and features to invest in your future today.
              Take control of your financial journey.
            </h2>

            {/* CTA Button */}
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-full 
                        hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 
                        shadow-lg hover:shadow-xl group"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Dashboard Preview */}
          <div className="w-full max-w-5xl mt-12 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent z-10 pointer-events-none" />
            <img
              src="dash.png"
              alt="Dashboard Preview"
              className="w-full rounded-xl shadow-2xl border border-gray-200 transform hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
