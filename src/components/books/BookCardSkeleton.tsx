export default function BookCardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden animate-pulse">
      <div className="h-44 bg-gray-200" />
      <div className="p-4 flex flex-col gap-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
        <div className="h-9 bg-gray-200 rounded mt-2" />
      </div>
    </div>
  );
}