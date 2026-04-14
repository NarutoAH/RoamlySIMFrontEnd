"use client";

import React from "react";
import RegionPlansPage from "@/components/plans/RegionPlansPage";
import { getPlansForRegion } from "@/data/plans";

const countriesWithPlans = getPlansForRegion("middle-east");

export default function MiddleEastPlansPage() {
  return (
    <RegionPlansPage
      title="Middle East eSIM Plans"
      subtitle="Stay connected in Saudi Arabia and the UAE with affordable international eSIM data plans."
      countriesWithPlans={countriesWithPlans}
    />
  );
}
