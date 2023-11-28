import { CycleOptions } from "@/components/cycle/CycleOptions";

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <p className="text-xl mb-10">Select a cycle to view</p>
      <CycleOptions />
    </main>
  );
}
