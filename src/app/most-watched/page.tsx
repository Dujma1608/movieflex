// app/most-watched/page.tsx (Server Component)
import { Suspense } from "react";
import MostWatchedClient from "./MostWatchedClient";

export default function MostWatchedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MostWatchedClient />
    </Suspense>
  );
}
