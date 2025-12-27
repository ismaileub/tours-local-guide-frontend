/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

interface GuideCardProps {
  guide: {
    _id: string;
    name: string;
    address?: string;
    picture?: string;
    pricePerHour: number;
    bio?: string;
    avgRating: number;
    totalReviews: number;
  };
}

const GuideCard = ({ guide }: GuideCardProps) => {
  return (
    <>
      <Link
        key={guide._id}
        href={`/guides/${guide._id}`}
        className="flex bg-white rounded-lg shadow hover:shadow-xl overflow-hidden cursor-pointer h-48"
      >
        {/* Left Image */}
        <div className="relative w-1/3 h-full">
          <Image
            src={guide?.picture || "/avatar.JPG"}
            alt={guide?.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                {guide.name}
              </h3>
              <p className="text-gray-500 text-sm">{guide.address}</p>
            </div>
            <span className="text-blue-500 font-bold text-lg">
              ${guide.pricePerHour}/Hour
            </span>
          </div>

          <p className="text-gray-700 italic font-sans text-sm mt-2 line-clamp-3">
            {guide.bio}
          </p>
          <hr className="border-t-2 border-gray-800" />

          <div className="flex justify-between items-center mt-4">
            {/* Reviews */}
            <div className="text-center">
              <p className="text-gray-500 text-sm">Reviews</p>
              <p className="font-semibold">{guide.totalReviews}</p>
            </div>

            {/* Rating */}
            <div className="text-center">
              <p className="text-gray-500 text-sm mb-1">Rating</p>

              <div className="flex justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(guide.avgRating)
                        ? "text-orange-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default GuideCard;
