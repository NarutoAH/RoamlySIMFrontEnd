"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import RegionPlanGrid from "./RegionPlanGrid";
import type { Plan, CountryInfo } from "@/data/plans";
import type { Currency } from "@/lib/currency";
import { fetchPlansForRegion } from "@/lib/plans-api";

interface RegionPlansPageProps {
  title: string;
  subtitle: string;
  countriesWithPlans: { country: CountryInfo; plans: Plan[] }[];
  regionSlug?: string;
  notice?: React.ReactNode;
  defaultCurrency?: Currency;
}

export default function RegionPlansPage({ title, subtitle, countriesWithPlans, regionSlug, notice, defaultCurrency = "USD" }: RegionPlansPageProps) {
  const [currency, setCurrency] = useState<Currency>(defaultCurrency);
  const [livePlans, setLivePlans] = useState(countriesWithPlans);

  useEffect(() => {
    if (!regionSlug) return;
    fetchPlansForRegion(regionSlug).then((result) => {
      if (result.length > 0 && result.some((r) => r.plans.length > 0)) {
        setLivePlans(result);
      }
    });
  }, [regionSlug]);

  return (
    <section className="py-12 bg-[#FAFAF7] dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            {title}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {notice && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-8"
          >
            {notice}
          </motion.div>
        )}

        <RegionPlanGrid
          countriesWithPlans={livePlans}
          currency={currency}
          onCurrencyChange={setCurrency}
        />
      </div>
    </section>
  );
}
