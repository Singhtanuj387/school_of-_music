export default function TeachersLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <div className="h-3 w-28 bg-gray-200 rounded mb-2" />
        <div className="h-7 w-56 bg-gray-200 rounded mb-1" />
        <div className="h-3 w-80 bg-gray-100 rounded" />
      </div>

      <div className="flex gap-3">
        <div className="h-10 flex-1 max-w-sm bg-gray-100 rounded-lg" />
        <div className="h-10 w-32 bg-gray-100 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-gray-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-3 w-40 bg-gray-100 rounded" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-5 w-16 bg-gray-100 rounded-full" />
              <div className="h-5 w-14 bg-gray-100 rounded-full" />
              <div className="h-5 w-18 bg-gray-100 rounded-full" />
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-50">
              <div className="h-3 w-24 bg-gray-100 rounded" />
              <div className="h-6 w-20 bg-gray-200 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
