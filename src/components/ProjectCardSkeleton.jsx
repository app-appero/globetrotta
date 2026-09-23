export default function ProjectCardSkeleton() {
  return (
    <div className="card flex h-full flex-col overflow-hidden" aria-hidden="true">
      <div className="aspect-[16/9] w-full animate-pulse bg-paper-200" />
      <div className="flex flex-1 flex-col p-6">
        <div className="h-3 w-24 animate-pulse rounded-full bg-paper-200" />
        <div className="mt-2 h-6 w-5/6 animate-pulse rounded-full bg-paper-200" />
        <div className="mt-2 flex-1 space-y-2">
          <div className="h-4 w-full animate-pulse rounded-full bg-paper-200" />
          <div className="h-4 w-full animate-pulse rounded-full bg-paper-200" />
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-paper-200" />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <div className="h-6 w-20 animate-pulse rounded-full bg-paper-200" />
          <div className="h-6 w-16 animate-pulse rounded-full bg-paper-200" />
          <div className="h-6 w-16 animate-pulse rounded-full bg-paper-200" />
        </div>
        <div className="mt-6 h-5 w-32 animate-pulse rounded-full bg-paper-200" />
      </div>
    </div>
  )
}
