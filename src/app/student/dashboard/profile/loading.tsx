export default function StudentDashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse p-4 md:p-6">
      <div className="flex items-center justify-between pb-4 border-b border-surface-muted/60">
        <div>
          <div className="h-3 w-32 bg-gray-200 rounded mb-2" />
          <div className="h-7 w-64 bg-gray-200 rounded" />
        </div>
        <div className="h-9 w-28 bg-gray-200 rounded-xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 bg-gray-100 rounded-2xl border border-surface-muted/60 p-4" />
        ))}
      </div>

      <div className="h-64 bg-gray-100 rounded-2xl border border-surface-muted/60 p-6" />
    </div>
  );
}
