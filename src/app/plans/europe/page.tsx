"use client";

import React from "react";
import RegionPlansPage from "@/components/plans/RegionPlansPage";
import { getPlansForRegion } from "@/data/plans";

const countriesWithPlans = getPlansForRegion("europe");

export default function EuropePlansPage() {
  return (
    <RegionPlansPage
      title="Europe eSIM Plans"
      subtitle="Stay connected in Germany and Spain with affordable international eSIM data plans."
      countriesWithPlans={countriesWithPlans}
      regionSlug="europe"
    />
  );
}
