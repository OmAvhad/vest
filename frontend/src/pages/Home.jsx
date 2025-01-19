import { CustomNav } from "@/components/CustomNav";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <CustomNav />
      <div className="flex flex-col items-center justify-center text-center mt-48">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Welcome to Vest
        </h1>
        <h2 className="text-2xl text-gray-600 mb-8">
          Explore our dashboard and features to invest in your future today.
        </h2>
        <Link
        to="/register"
          className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
