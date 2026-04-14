"use client";

import React from "react";
import { Info, ShieldCheck } from "lucide-react";
import RegionPlansPage from "@/components/plans/RegionPlansPage";
import { getPlansForRegion } from "@/data/plans";

const countriesWithPlans = getPlansForRegion("pakistan");

const nonPtaNotice = (
  <div className="space-y-3 max-w-2xl mx-auto">
    <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl px-6 py-4 flex gap-3 items-start">
      <Info size={20} className="text-emerald-600 shrink-0 mt-0.5" />
      <div>
        <p className="text-sm text-emerald-900 dark:text-emerald-300 font-medium mb-1">
          Works on non-PTA phones
        </p>
        <p className="text-sm text-emerald-700 dark:text-emerald-400 leading-relaxed">
          ESIMConnections provides international eSIMs that connect via international
          roaming networks. Since these are international SIMs, they are
          compatible with non-PTA registered devices - just like any other
          international SIM card would be when roaming in Pakistan.
        </p>
      </div>
    </div>

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
      notice={nonPtaNotice}
      defaultCurrency="PKR"
      showCurrencyToggle={true}
    />
  );
}
