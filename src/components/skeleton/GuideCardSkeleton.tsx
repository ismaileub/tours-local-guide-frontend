// components/Guides/GuideCardSkeleton.tsx
const GuideCardSkeleton = () => {
  return (
    <div className="relative flex bg-white rounded-lg shadow overflow-hidden h-48 animate-pulse">
      {/* Image */}
      <div className="w-1/3 bg-gray-300" />

      {/* Right Content */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-2 w-full">
            <div className="h-5 bg-gray-300 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            {/* Languages */}
            <div className="h-3 bg-gray-200 rounded w-2/3" />
          </div>

          <div className="h-5 bg-gray-300 rounded w-16" />
        </div>

        {/* Bio */}
        <div className="space-y-2 mt-2">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-5/6" />
          <div className="h-3 bg-gray-200 rounded w-4/6" />
        </div>

        <hr className="border-t border-gray-200" />

        {/* Footer */}
        <div className="flex justify-between items-center mt-3">
          <div className="space-y-1">
            <div className="h-3 bg-gray-200 rounded w-16" />
            <div className="h-4 bg-gray-300 rounded w-10" />
          </div>

          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-300 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideCardSkeleton;
