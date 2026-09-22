export default function ProjectCardSkeleton() {
  return (
    <div className="card flex h-full flex-col overflow-hidden" aria-hidden="true">
      <div className="aspect-[16/9] w-full animate-pulse bg-paper-200" />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="h-3 w-24 animate-pulse rounded-full bg-paper-200" />
        <div className="h-5 w-3/4 animate-pulse rounded-full bg-paper-200" />
        <div className="h-4 w-full animate-pulse rounded-full bg-paper-200" />
        <div className="h-4 w-5/6 animate-pulse rounded-full bg-paper-200" />
        <div className="mt-auto flex gap-2 pt-2">
          <div className="h-6 w-16 animate-pulse rounded-full bg-paper-200" />
          <div className="h-6 w-16 animate-pulse rounded-full bg-paper-200" />
        </div>
      </div>
    </div>
  )
}
