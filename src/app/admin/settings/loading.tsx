export default function AdminSectionLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <div className="h-3 w-28 bg-gray-200 rounded mb-2" />
        <div className="h-7 w-52 bg-gray-200 rounded mb-1" />
        <div className="h-3 w-72 bg-gray-100 rounded" />
      </div>
      <div className="flex gap-3">
        <div className="h-10 flex-1 max-w-sm bg-gray-100 rounded-lg" />
        <div className="h-10 w-28 bg-gray-100 rounded-lg" />
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="h-11 bg-gray-50 border-b border-gray-100" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-gray-50">
            <div className="h-9 w-9 rounded-full bg-gray-200 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-36 bg-gray-200 rounded" />
              <div className="h-3 w-24 bg-gray-100 rounded" />
            </div>
            <div className="h-6 w-20 bg-gray-100 rounded-full" />
            <div className="h-3.5 w-20 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
