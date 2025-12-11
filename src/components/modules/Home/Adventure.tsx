import React from "react";
import { MapPin, CheckCircle, Camera, Users } from "lucide-react";

const Adventure = () => {
  return (
    <section
      className="relative w-full bg-black/70 py-20 text-white flex flex-col md:flex-row items-center justify-between px-6 md:px-20"
      style={{
        backgroundImage: "url(./adventure.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Left content */}
      <div className="md:w-1/2 mb-10 md:mb-0">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to travel with real adventure & enjoy nature
        </h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition">
          Check Availability
        </button>
      </div>

      {/* Right content - features */}
      <div className="md:w-1/2 grid grid-cols-2 gap-6">
        {/* Feature 1 */}
        <div className="p-6 bg-black/50 rounded-lg flex flex-col items-center justify-center hover:bg-black/70 transition">
          <MapPin size={48} className="text-blue-500" />
          <h3 className="mt-4 font-semibold text-lg text-white">
            Diverse Destinations
          </h3>
        </div>

        {/* Feature 2 */}
        <div className="p-6 bg-black/50 rounded-lg flex flex-col items-center justify-center hover:bg-black/70 transition">
          <CheckCircle size={48} className="text-green-400" />
          <h3 className="mt-4 font-semibold text-lg text-white">
            Easy Tour Confirmation
          </h3>
        </div>

        {/* Feature 3 */}
        <div className="p-6 bg-black/50 rounded-lg flex flex-col items-center justify-center hover:bg-black/70 transition">
          <Camera size={48} className="text-pink-400" />
          <h3 className="mt-4 font-semibold text-lg text-white">
            Beautiful Places
          </h3>
        </div>

        {/* Feature 4 */}
        <div className="p-6 bg-black/50 rounded-lg flex flex-col items-center justify-center hover:bg-black/70 transition">
          <Users size={48} className="text-yellow-400" />
          <h3 className="mt-4 font-semibold text-lg text-white">
            Experienced Team
          </h3>
        </div>
      </div>
    </section>
  );
};

export default Adventure;
