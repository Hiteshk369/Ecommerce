import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Hi</p>
      <Button variant="destructive" size="lg">
        Button component
      </Button>
    </main>
  );
}
