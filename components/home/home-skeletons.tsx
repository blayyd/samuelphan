import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function ProjectsPreviewSkeleton() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-10 space-y-4">
          <Skeleton className="h-10 w-64 mx-auto" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="flex flex-col h-full border-none bg-card/50">
              <Skeleton className="h-48 w-full rounded-t-lg" />
              <CardContent className="flex-grow p-6 space-y-4">
                <Skeleton className="h-7 w-3/4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-14" />
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Skeleton className="h-4 w-32" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutPreviewSkeleton() {
  return (
    <section className="bg-background pb-16 md:pb-24">
      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-6 w-full" />
            </div>
            <Skeleton className="h-20 w-full" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
          <Skeleton className="relative h-[500px] w-full rounded-lg" />
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-full border-none bg-card/50">
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-7 w-32" />
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
