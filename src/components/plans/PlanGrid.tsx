"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import PlanCard from "./PlanCard";
import { cn } from "@/lib/utils";

// Real Pakistan packages from esimcard.com with 10% markup on cost price
// Prices in PKR (1 USD = 285 PKR)
const allPlans = [
  // Limited Data Packages
  { id: "019c9954-9696-708a-b6bd-faa720306616", name: "1 GB — 3 Days", data_gb: 1, duration_days: 3, price_pkr: 419, popular: false, type: "limited" as const },
  { id: "019c9954-96bc-73ee-af9d-dec91da100fd", name: "3 GB — 3 Days", data_gb: 3, duration_days: 3, price_pkr: 1052, popular: false, type: "limited" as const },
  { id: "019c9954-9758-729c-a1b3-a1bab6e0cbb6", name: "3 GB — 7 Days", data_gb: 3, duration_days: 7, price_pkr: 1077, popular: false, type: "limited" as const },
  { id: "019c9954-9792-73af-8d52-e92842c21c5e", name: "3 GB — 30 Days", data_gb: 3, duration_days: 30, price_pkr: 1114, popular: false, type: "limited" as const },
  { id: "019c9954-97e4-7360-95fa-bdf3fe9a4bf1", name: "5 GB — 7 Days", data_gb: 5, duration_days: 7, price_pkr: 1630, popular: true, type: "limited" as const },
  { id: "019c9954-9819-73b3-a9a4-051e5765887c", name: "5 GB — 15 Days", data_gb: 5, duration_days: 15, price_pkr: 1673, popular: false, type: "limited" as const },
  { id: "019c9954-984d-72e7-a83a-86414834d35b", name: "5 GB — 30 Days", data_gb: 5, duration_days: 30, price_pkr: 1753, popular: false, type: "limited" as const },
  { id: "019c9954-987f-71fc-9322-34adf377ca49", name: "10 GB — 7 Days", data_gb: 10, duration_days: 7, price_pkr: 2881, popular: false, type: "limited" as const },
  { id: "019c9954-98a8-711d-9387-24b64b9b2dee", name: "10 GB — 15 Days", data_gb: 10, duration_days: 15, price_pkr: 3038, popular: true, type: "limited" as const },
  { id: "019c9954-98d0-7363-88cd-445412144077", name: "10 GB — 30 Days", data_gb: 10, duration_days: 30, price_pkr: 3195, popular: false, type: "limited" as const },
  { id: "019c9954-9905-73dc-9f84-8426ec8b6849", name: "20 GB — 15 Days", data_gb: 20, duration_days: 15, price_pkr: 5198, popular: false, type: "limited" as const },
  { id: "019c9954-9942-7053-a7ad-53ee257b4cd9", name: "20 GB — 30 Days", data_gb: 20, duration_days: 30, price_pkr: 5575, popular: true, type: "limited" as const },
  { id: "019c9954-9970-7301-aaba-c2a7f1a2664e", name: "50 GB — 30 Days", data_gb: 50, duration_days: 30, price_pkr: 12121, popular: false, type: "limited" as const },
  { id: "019c9954-99a5-73e8-afbc-74e315f21462", name: "50 GB — 90 Days", data_gb: 50, duration_days: 90, price_pkr: 14159, popular: false, type: "limited" as const },
  { id: "019c9954-99e8-71bc-a74e-70aba33ceda1", name: "100 GB — 30 Days", data_gb: 100, duration_days: 30, price_pkr: 21985, popular: false, type: "limited" as const },
  // Unlimited Packages (1GB/2GB unthrottled, then throttled)
  { id: "019c9958-c7f7-70a7-9e21-92e4a95b89e9", name: "Unlimited — 1 Day", data_gb: -1, duration_days: 1, price_pkr: 564, popular: false, type: "unlimited" as const, throttle: "512kbps after 1GB" },
  { id: "019c9958-c993-7061-be6d-8b208b586f0f", name: "Unlimited Plus — 1 Day", data_gb: -2, duration_days: 1, price_pkr: 1035, popular: false, type: "unlimited_plus" as const, throttle: "2Mbps after 2GB" },
  { id: "019c9958-c82e-713a-a654-d9a417b6fdfd", name: "Unlimited — 3 Days", data_gb: -1, duration_days: 3, price_pkr: 1402, popular: false, type: "unlimited" as const, throttle: "512kbps after 1GB" },
  { id: "019c9958-c86c-71da-a623-3841141eac70", name: "Unlimited — 5 Days", data_gb: -1, duration_days: 5, price_pkr: 2223, popular: false, type: "unlimited" as const, throttle: "512kbps after 1GB" },
  { id: "019c9958-c9ce-720a-978a-7a0799d048e9", name: "Unlimited Plus — 3 Days", data_gb: -2, duration_days: 3, price_pkr: 2742, popular: false, type: "unlimited_plus" as const, throttle: "2Mbps after 2GB" },
  { id: "019c9958-c8ae-7230-9fdd-4c430b7ec338", name: "Unlimited — 7 Days", data_gb: -1, duration_days: 7, price_pkr: 2990, popular: false, type: "unlimited" as const, throttle: "512kbps after 1GB" },
  { id: "019c9958-c8e1-7047-9597-92444287872f", name: "Unlimited — 10 Days", data_gb: -1, duration_days: 10, price_pkr: 4053, popular: false, type: "unlimited" as const, throttle: "512kbps after 1GB" },
  { id: "019c9958-ca0b-7394-a519-24e83428f4ab", name: "Unlimited Plus — 5 Days", data_gb: -2, duration_days: 5, price_pkr: 4386, popular: false, type: "unlimited_plus" as const, throttle: "2Mbps after 2GB" },
  { id: "019c9958-c908-720d-82dd-3850e8e2de35", name: "Unlimited — 15 Days", data_gb: -1, duration_days: 15, price_pkr: 5198, popular: false, type: "unlimited" as const, throttle: "512kbps after 1GB" },
  { id: "019c9958-ca44-701e-9c70-ff5110d302b6", name: "Unlimited Plus — 7 Days", data_gb: -2, duration_days: 7, price_pkr: 5917, popular: true, type: "unlimited_plus" as const, throttle: "2Mbps after 2GB" },
  { id: "019c9958-c93b-7178-880c-8049ddfff28d", name: "Unlimited — 20 Days", data_gb: -1, duration_days: 20, price_pkr: 6655, popular: false, type: "unlimited" as const, throttle: "512kbps after 1GB" },
  { id: "019c9958-ca7c-7332-aaf3-91d7e42ebb23", name: "Unlimited Plus — 10 Days", data_gb: -2, duration_days: 10, price_pkr: 8048, popular: false, type: "unlimited_plus" as const, throttle: "2Mbps after 2GB" },
  { id: "019c9958-c963-735b-a7c0-21fa02e15405", name: "Unlimited — 30 Days", data_gb: -1, duration_days: 30, price_pkr: 9083, popular: false, type: "unlimited" as const, throttle: "512kbps after 1GB" },
  { id: "019c9958-caad-73c8-91fd-15bc6ddaf5b0", name: "Unlimited Plus — 15 Days", data_gb: -2, duration_days: 15, price_pkr: 10337, popular: false, type: "unlimited_plus" as const, throttle: "2Mbps after 2GB" },
  { id: "019c9958-cad4-739b-9fa0-1fc8c2886597", name: "Unlimited Plus — 20 Days", data_gb: -2, duration_days: 20, price_pkr: 12278, popular: false, type: "unlimited_plus" as const, throttle: "2Mbps after 2GB" },
  { id: "019c9958-cafd-70a5-afcf-3599c9ba2658", name: "Unlimited Plus — 30 Days", data_gb: -2, duration_days: 30, price_pkr: 18100, popular: false, type: "unlimited_plus" as const, throttle: "2Mbps after 2GB" },
];

const typeTabs = [
  { label: "All", value: "all" },
  { label: "Limited Data", value: "limited" },
  { label: "Unlimited", value: "unlimited" },
  { label: "Unlimited Plus", value: "unlimited_plus" },
];

const durationTabs = [
  { label: "All", value: 0 },
  { label: "1 Day", value: 1 },
  { label: "3 Days", value: 3 },
  { label: "5 Days", value: 5 },
  { label: "7 Days", value: 7 },
  { label: "10 Days", value: 10 },
  { label: "15 Days", value: 15 },
  { label: "20 Days", value: 20 },
  { label: "30 Days", value: 30 },
  { label: "90 Days", value: 90 },
];

export default function PlanGrid() {
  const [activeType, setActiveType] = useState("all");
  const [activeDuration, setActiveDuration] = useState(0);

  const filtered = allPlans.filter((p) => {
    const typeMatch = activeType === "all" || p.type === activeType;
    const durationMatch = activeDuration === 0 || p.duration_days === activeDuration;
    return typeMatch && durationMatch;
  });

  const handleBuy = (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/auth/login";
      return;
    }
    alert(`Order would be created for plan ${id}. Payment integration coming soon!`);
  };

  return (
    <div>
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
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
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
                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Plans Grid */}
      <motion.div
        layout
        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filtered.map((plan) => (
          <PlanCard key={plan.id} {...plan} onBuy={handleBuy} />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          No plans found for this combination.
        </div>
      )}
    </div>
  );
}
