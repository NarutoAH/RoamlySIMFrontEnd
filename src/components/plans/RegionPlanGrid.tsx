"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice, convertToLocal, type Currency } from "@/lib/currency";
import type { Plan, CountryInfo } from "@/data/plans";
import { WHATSAPP_BUSINESS_NUMBER } from "@/lib/config";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const CHEAPEST_COUNT = 2;

const typeTabs = [
  { label: "All", value: "all" },
  { label: "Limited Data", value: "limited" },
  { label: "Unlimited", value: "unlimited" },
  { label: "Unlimited Plus", value: "unlimited_plus" },
];

function getDurationTabs(plans: Plan[]) {
  const durations = [...new Set(plans.map((p) => p.duration_days))].sort((a, b) => a - b);
  return [{ label: "All", value: 0 }, ...durations.map((d) => ({ label: d === 1 ? "1 Day" : `${d} Days`, value: d }))];
}

function getPlanTypeLabel(plan: Plan): string {
  switch (plan.type) {
    case "unlimited":
      return "Unlimited Data (No Voice/SMS)";
    case "unlimited_plus":
      return "Unlimited Plus Data (No Voice/SMS)";
    default:
      return "Limited Data (No Voice/SMS)";
  }
}

function buildWhatsAppUrl(plan: Plan, country: CountryInfo, currency: Currency): string {
  const isUnlimited = plan.data_gb < 0;
  const dataLabel = isUnlimited ? "Unlimited" : `${plan.data_gb} GB`;
  const durationLabel = `${plan.duration_days} ${plan.duration_days === 1 ? "Day" : "Days"}`;
  const priceUsd = `$${plan.price_usd.toFixed(2)}`;
  const priceDisplay = currency === "PKR"
    ? `${priceUsd} (PKR ${convertToLocal(plan.price_usd, "PKR").toLocaleString()})`
    : priceUsd;

  const message = `Hi! I'd like to order an eSIM plan from ESIMConnections.

*Plan Details:*
Plan: ${plan.name}
Country: ${country.name}
Data: ${dataLabel}
Duration: ${durationLabel}
Type: ${getPlanTypeLabel(plan)}
Network: ${plan.network}
Price: ${priceDisplay}

Please share payment details. Thank you!`;

  return `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(message)}`;
}

interface RegionPlanGridProps {
  countriesWithPlans: { country: CountryInfo; plans: Plan[] }[];
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  showCurrencyToggle?: boolean;
}

export default function RegionPlanGrid({ countriesWithPlans, currency, onCurrencyChange, showCurrencyToggle = true }: RegionPlanGridProps) {
  const [activeCountry, setActiveCountry] = useState(countriesWithPlans[0]?.country.code || "");
  const [activeType, setActiveType] = useState("all");
  const [activeDuration, setActiveDuration] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const currentCountryData = countriesWithPlans.find((c) => c.country.code === activeCountry);
  const currentPlans = currentCountryData?.plans || [];
  const currentCountry = currentCountryData?.country;
  const durationTabs = getDurationTabs(currentPlans);

  // Curated initial view: 2 cheapest overall + cheapest per duration bucket
  const featuredPlans = useMemo(() => {
    if (currentPlans.length === 0) return [];
    const sorted = [...currentPlans].sort((a, b) => a.price_usd - b.price_usd);
    const picked = new Set<string>();
    const result: Plan[] = [];

    // Add the 2 cheapest plans
    for (const plan of sorted) {
      if (result.length >= CHEAPEST_COUNT) break;
      picked.add(plan.id);
      result.push(plan);
    }

    // Add cheapest plan per duration bucket (skip if already picked)
    const durations = [...new Set(currentPlans.map((p) => p.duration_days))].sort((a, b) => a - b);
    for (const dur of durations) {
      const cheapest = sorted.find((p) => p.duration_days === dur && !picked.has(p.id));
      if (cheapest) {
        picked.add(cheapest.id);
        result.push(cheapest);
      }
    }

    return result.sort((a, b) => a.price_usd - b.price_usd);
  }, [currentPlans]);

  // Filtered plans for the expanded "all plans" view
  const filteredPlans = useMemo(() => {
    return currentPlans.filter((p) => {
      const typeMatch = activeType === "all" || p.type === activeType;
      const durationMatch = activeDuration === 0 || p.duration_days === activeDuration;
      return typeMatch && durationMatch;
    });
  }, [currentPlans, activeType, activeDuration]);

  const displayedPlans = showAll ? filteredPlans : featuredPlans;

  const handleBuy = (plan: Plan) => {
    if (!currentCountry) return;
    const url = buildWhatsAppUrl(plan, currentCountry, currency);
    const win = window.open(url, "_blank");
    if (!win) window.location.href = url;
  };

  return (
    <div>
      {/* Currency Toggle */}
      {showCurrencyToggle && (
      <div className="flex justify-center mb-6">
        <div className="inline-flex bg-white dark:bg-slate-800 rounded-full p-1 border border-slate-200 dark:border-slate-700">
          {(["PKR", "USD"] as Currency[]).map((c) => (
            <button
              key={c}
              onClick={() => onCurrencyChange(c)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer",
                currency === c
                  ? "bg-slate-800 text-white"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      )}

      {/* Country Tabs (if multiple countries in region) */}
      {countriesWithPlans.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {countriesWithPlans.map(({ country }) => (
            <button
              key={country.code}
              onClick={() => { setActiveCountry(country.code); setActiveType("all"); setActiveDuration(0); setShowAll(false); }}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer flex items-center gap-2",
                activeCountry === country.code
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/25"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              )}
            >
              <Image src={country.flagImg} alt={country.name} width={24} height={16} className="rounded-sm object-cover" />
              {country.name}
            </button>
          ))}
        </div>
      )}

      {/* WhatsApp ordering info */}
      <div className="flex items-center justify-center gap-2 mb-6 text-sm text-slate-500 dark:text-slate-400">
        <MessageCircle size={14} className="text-[#25D366]" />
        <span>Tapping <strong>Buy Now</strong> opens WhatsApp for quick ordering and eSIM delivery</span>
      </div>

      {/* Filters - only shown in expanded "all plans" view */}
      <AnimatePresence>
        {showAll && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Type Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {typeTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveType(tab.value)}
                  className={cn(
                    "px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer",
                    activeType === tab.value
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/25"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Duration Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {durationTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveDuration(tab.value)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer",
                    activeDuration === tab.value
                      ? "bg-slate-800 text-white shadow-md"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Plans Grid */}
      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedPlans.map((plan) => {
          const isUnlimited = plan.data_gb < 0;
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Card
                hover
                className={`relative text-center ${
                  plan.popular ? "border-2 border-emerald-400 scale-[1.03] animate-card-glow" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    Best Deal
                  </div>
                )}

                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 overflow-hidden">
                  {currentCountry && <Image src={currentCountry.flagImg} alt={currentCountry.name} width={48} height={48} className="object-cover w-full h-full rounded-xl" />}
                </div>

                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">{plan.name}</h3>
                <p className="text-xs text-slate-400 mb-4">
                  {currentCountry?.name} &middot; Data Only eSIM &middot; {plan.network}
                </p>

                <div className="mb-1">
                  {isUnlimited ? (
                    <span className="text-3xl font-bold text-slate-900 dark:text-white">Unlimited</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-slate-900 dark:text-white">{plan.data_gb}</span>
                      <span className="text-lg text-slate-500 ml-1">GB</span>
                    </>
                  )}
                </div>

                {plan.throttle && (
                  <div className="mb-1">
                    <p className="text-xs text-amber-600 font-medium">{plan.throttle}/day</p>
                    <p className="text-[10px] text-slate-400">Resets daily</p>
                  </div>
                )}

                <p className="text-sm text-slate-400 mb-4">
                  {plan.duration_days} {plan.duration_days === 1 ? "Day" : "Days"} validity
                </p>

                <div className="mb-5 py-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  {plan.popular && plan.original_price_usd > plan.price_usd && (
                    <div className="text-sm text-slate-400 line-through mb-0.5">
                      {formatPrice(plan.original_price_usd, currency)}
                    </div>
                  )}
                  <span className="text-2xl font-bold text-emerald-600">
                    {formatPrice(plan.price_usd, currency)}
                  </span>
                </div>

                <Button
                  variant="primary"
                  size={plan.popular ? "md" : "sm"}
                  className={`w-full ${plan.popular ? "animate-emerald-glow" : ""}`}
                  onClick={() => handleBuy(plan)}
                >
                  Buy Now
                </Button>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {displayedPlans.length === 0 && (
        <div className="text-center py-12 text-slate-400 dark:text-slate-500">
          No plans found for this combination.
        </div>
      )}

      {/* View All Plans / Show Less toggle */}
      {currentPlans.length > featuredPlans.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => { setShowAll(!showAll); setActiveType("all"); setActiveDuration(0); }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all cursor-pointer shadow-sm"
          >
            {showAll ? "Show Less" : `View All ${currentPlans.length} Plans`}
            <ChevronDown size={16} className={cn("transition-transform duration-200", showAll && "rotate-180")} />
          </button>
        </div>
      )}
    </div>
  );
}
