import { Suspense } from "react";
import { DraftMainPage } from "./components";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DraftMainPage />
    </Suspense>
  );
}
