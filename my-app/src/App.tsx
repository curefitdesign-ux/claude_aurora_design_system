import { useState } from "react";
import { ActivityCard } from "./components/ui/ActivityCard";
import { NinjaJourney } from "./components/NinjaJourney";

function App() {
  const [page, setPage] = useState<"activity" | "ninja">("ninja");

  return (
    <div className="flex flex-col items-center">
      {/* Page toggle */}
      <nav className="fixed top-4 z-50 flex gap-2 rounded-full bg-white/10 p-1 backdrop-blur-sm">
        <button
          onClick={() => setPage("activity")}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
            page === "activity"
              ? "bg-white text-black"
              : "text-white/70 hover:text-white"
          }`}
        >
          Activity Card
        </button>
        <button
          onClick={() => setPage("ninja")}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
            page === "ninja"
              ? "bg-white text-black"
              : "text-white/70 hover:text-white"
          }`}
        >
          Ninja Journey
        </button>
      </nav>

      {/* Page content */}
      <div className="pt-12">
        {page === "activity" ? <ActivityCard /> : <NinjaJourney />}
      </div>
    </div>
  );
}

export default App;
