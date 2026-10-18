export default function AdminRootLoading() {
  return (
    <div className="w-full space-y-6 animate-pulse">
      {/* Top Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded-md" />
          <div className="h-8 w-64 bg-gray-200 rounded-lg" />
          <div className="h-3.5 w-80 bg-gray-100 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-9 w-28 bg-gray-200 rounded-xl" />
          <div className="h-9 w-32 bg-gray-200 rounded-xl" />
        </div>
      </div>

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-4 bg-white rounded-2xl border border-gray-100 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="h-3 w-20 bg-gray-200 rounded" />
              <div className="w-8 h-8 rounded-xl bg-gray-100" />
            </div>
            <div className="h-7 w-24 bg-gray-200 rounded-md" />
            <div className="h-3 w-32 bg-gray-100 rounded" />
          </div>
        ))}
      </div>

      {/* Content Area Skeleton */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-5 w-40 bg-gray-200 rounded-md" />
          <div className="h-8 w-48 bg-gray-100 rounded-xl" />
        </div>
        <div className="space-y-3 pt-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3.5 rounded-xl border border-gray-50 bg-gray-50/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
                <div className="space-y-1.5">
                  <div className="h-3.5 w-44 bg-gray-200 rounded" />
                  <div className="h-3 w-28 bg-gray-100 rounded" />
                </div>
              </div>
              <div className="h-6 w-24 bg-gray-200 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
