"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";
import RegionPlansPage from "@/components/plans/RegionPlansPage";
import { getPlansForRegion } from "@/data/plans";

const countriesWithPlans = getPlansForRegion("pakistan");

const guaranteeNotice = (
  <div className="max-w-2xl mx-auto">
    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl px-6 py-4 flex gap-3 items-start">
      <ShieldCheck size={20} className="text-amber-600 shrink-0 mt-0.5" />
      <div>
        <p className="text-sm text-amber-900 dark:text-amber-300 font-medium mb-1">
          100% Money-Back Guarantee for Non-PTA Phones
        </p>
        <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
          We guarantee our eSIMs work on non-PTA phones. If it doesn't
          connect on your device, you get a full refund.
        </p>
      </div>
    </div>
  </div>
);

export default function PakistanPlansPage() {
  return (
    <RegionPlansPage
      title="Pakistan eSIM Plans"
      subtitle="Affordable international eSIM data plans for Pakistan. Powered by Jazz network."
      countriesWithPlans={countriesWithPlans}
      notice={guaranteeNotice}
      defaultCurrency="PKR"
      showCurrencyToggle={true}
    />
  );
}
