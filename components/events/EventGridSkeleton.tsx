export function EventGridSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" aria-hidden>
      {[0, 1, 2].map((i) => (
        <div key={i} className="overflow-hidden rounded-[14px] bg-card shadow-sm">
          <div className="h-48 animate-pulse bg-secondary" />
          <div className="space-y-3 p-6">
            <div className="-mt-16 mb-6 h-[5.5rem] w-[4.5rem] animate-pulse rounded-[10px] bg-muted" />
            <div className="h-7 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
