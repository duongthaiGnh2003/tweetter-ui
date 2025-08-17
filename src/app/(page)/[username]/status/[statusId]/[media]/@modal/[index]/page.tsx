import ViewDetailMedia from "~/app/(page)/_components/ViewDetailMedia";

export default async function ParallelRoutePageD({
  params,
}: {
  params: Promise<{
    username: string;
    statusId: string;
    index: string;
    media: string;
  }>;
}) {
  const resoverParams = await params;
  return <ViewDetailMedia params={resoverParams} />;
}
