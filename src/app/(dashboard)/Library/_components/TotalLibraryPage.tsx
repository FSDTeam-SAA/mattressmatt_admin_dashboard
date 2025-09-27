import React from "react";
import LibraryCard from "./LibraryCard";
import { PerformanceAnalyticsChart } from "./PerformanceAnalyticsChart";
import CategoryOverview from "./CategoryOverview";
import MusicTracks from "./MusicTracks";

const TotalLibraryPage = () => {
  return (
    <div>
      <div>
        <LibraryCard />
      </div>

      <div className="mt-10">
        <PerformanceAnalyticsChart />
      </div>

      <div className="mt-10">
        <CategoryOverview />
      </div>
      <div className="mt-10">
        <MusicTracks />
      </div>
    </div>
  );
};

export default TotalLibraryPage;
