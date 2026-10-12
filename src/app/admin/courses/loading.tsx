export default function CoursesLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <div className="h-3 w-32 bg-gray-200 rounded mb-2" />
        <div className="h-7 w-64 bg-gray-200 rounded mb-1" />
        <div className="h-3 w-96 bg-gray-100 rounded" />
      </div>

      <div className="flex gap-3">
        <div className="h-10 flex-1 max-w-sm bg-gray-100 rounded-lg" />
        <div className="h-10 w-36 bg-accent/20 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="h-4 w-36 bg-gray-200 rounded" />
                <div className="h-3 w-24 bg-gray-100 rounded" />
              </div>
              <div className="h-6 w-16 bg-gray-100 rounded-full" />
            </div>
            <div className="flex gap-2">
              <div className="h-5 w-20 bg-gray-100 rounded-full" />
              <div className="h-5 w-16 bg-gray-100 rounded-full" />
            </div>
            <div className="pt-2 border-t border-gray-50 flex justify-between">
              <div className="h-3 w-20 bg-gray-100 rounded" />
              <div className="h-3 w-16 bg-gray-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
