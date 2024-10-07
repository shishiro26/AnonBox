import TopBar from "./_components/Topbar";
import Complaints from "./_components/Complaints";
export default async function Home({
  searchParams,
}: {
  searchParams: { query: string; page: string };
}) {
  return (
    <section className="">
      <Complaints searchParams={searchParams} />
    </section>
  );
}
