const TourCardSkeleton = () => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm animate-pulse">
      {/* Image */}
      <div className="h-48 bg-gray-200" />

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />

        <div className="flex justify-between items-center mt-4">
          <div className="h-4 bg-gray-200 rounded w-20" />
          <div className="h-4 bg-gray-200 rounded w-12" />
        </div>
      </div>
    </div>
  );
};

export default TourCardSkeleton;
