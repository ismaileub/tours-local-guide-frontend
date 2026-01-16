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
    languages?: string[];
  };
}

const GuideCard = ({ guide }: GuideCardProps) => {
  return (
    <Link
      href={`/guides/${guide._id}`}
      className="
        group flex bg-white rounded-lg shadow
        hover:shadow-xl hover:-translate-y-1
        transition-all duration-300
        overflow-hidden h-48
      "
    >
      {/* Image Section */}
      <div className="relative w-1/3 h-full">
        <Image
          src={guide.picture || "/avatar.JPG"}
          alt={guide.name}
          fill
          sizes="20"
          loading="eager"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Top Rated Badge */}
        {guide.avgRating >= 4.5 && (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-[10px] px-2 py-1 rounded-full">
            Top Rated
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        {/* Header */}
        <div className="flex justify-between items-start gap-4">
          {/* Left info */}
          <div className="flex flex-col space-y-1 min-h-14">
            <h3 className="font-semibold text-lg text-gray-800 leading-tight">
              {guide.name}
            </h3>

            <p className="text-gray-500 text-sm leading-tight">
              {guide.address || " "}
            </p>

            {/* Languages */}
            <div className="flex items-center gap-1 text-xs text-gray-600 uppercase">
              {guide.languages && guide.languages.length > 0 && (
                <>
                  <span>
                    {guide.languages.slice(0, 2).join(", ")}
                    {guide.languages.length > 2 && (
                      <span className="text-gray-400">
                        {" "}
                        +{guide.languages.length - 2}
                      </span>
                    )}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="text-right whitespace-nowrap">
            <p className="text-blue-600 font-bold text-lg">
              ${guide.pricePerHour}
              <span className="text-xs font-normal text-gray-500"> / Hr</span>
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-gray-700 italic text-sm mt-2 line-clamp-3">
          {guide.bio}
        </p>

        <hr className="border-t border-gray-200" />

        {/* Footer */}
        <div className="flex justify-between items-center mt-3">
          <div className="text-center">
            <p className="text-gray-500 text-sm">Reviews</p>
            <p className="font-semibold">{guide.totalReviews}</p>
          </div>

          <div className="flex gap-1">
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
    </Link>
  );
};

export default GuideCard;
