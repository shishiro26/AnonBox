import { auth, signOut } from "@/auth";
import TopBar from "./_components/Topbar";
export default async function Home() {
  return (
    <section className="">
      <div className="hidden md:block">
        <TopBar />
      </div>
    </section>
  );
}
