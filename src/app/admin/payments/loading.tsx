export default function PaymentsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <div className="h-3 w-24 bg-gray-200 rounded mb-2" />
        <div className="h-7 w-48 bg-gray-200 rounded mb-1" />
        <div className="h-3 w-72 bg-gray-100 rounded" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 space-y-2">
            <div className="h-3 w-20 bg-gray-100 rounded" />
            <div className="h-6 w-24 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="h-11 bg-gray-50 border-b border-gray-100" />
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-gray-50">
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-28 bg-gray-200 rounded" />
              <div className="h-3 w-20 bg-gray-100 rounded" />
            </div>
            <div className="h-3.5 w-16 bg-gray-200 rounded" />
            <div className="h-6 w-20 bg-gray-100 rounded-full" />
            <div className="h-3.5 w-20 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
