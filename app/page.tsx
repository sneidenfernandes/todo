import Title from "@/components/Title";
import List from "@/components/List";


export default function Home() {
  return (
    <div className="h-screen w-full bg-slate-200 flex flex-row justify-center">
      <div className="min-h-[80vh]flex flex-col justify-center">
        <Title/>
        <List/>
      </div>
    </div>
  );
}
