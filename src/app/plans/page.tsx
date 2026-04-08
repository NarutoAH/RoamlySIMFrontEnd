"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { regions, plansByCountry } from "@/data/plans";
import { formatPrice, type Currency } from "@/lib/currency";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const regionCurrency: Record<string, Currency> = {
  pakistan: "PKR",
  "middle-east": "USD",
  europe: "USD",
};

export default function PlansPage() {
  return (
    <section className="py-12 bg-[#FAFAF7] dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Choose Your Destination
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            International eSIM data plans across multiple regions.
            Pick your destination to browse plans.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {regions.map((region, i) => {
            const allPlans = region.countries.flatMap((c) => plansByCountry[c.code] || []);
            const cheapest = allPlans.reduce((min, p) => (p.price_usd < min.price_usd ? p : min), allPlans[0]);

            return (
              <motion.div
                key={region.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/plans/${region.slug}`}>
                  <Card hover className="text-center group cursor-pointer h-full">
                    <div className="flex justify-center gap-2 mb-4">
                      {region.countries.map((c) => (
                        <div key={c.code} className="w-14 h-10 rounded-lg overflow-hidden">
                          <Image src={c.flagImg} alt={c.name} width={56} height={40} className="object-cover w-full h-full" />
                        </div>
                      ))}
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 transition-colors">
                      {region.name}
                    </h2>
                    <p className="text-sm text-slate-400 mb-1">
                      {region.countries.map((c) => c.name).join("  ·  ")}
                    </p>
                    <p className="text-sm text-slate-400 mb-4">
                      {allPlans.length} plans available
                    </p>
                    <p className="text-lg font-semibold text-emerald-600 mb-5">
                      From {formatPrice(cheapest?.price_usd || 0, regionCurrency[region.slug] || "USD")}
                    </p>
                    <Button variant="primary" size="sm" className="w-full group-hover:shadow-lg group-hover:shadow-emerald-600/20 transition-shadow">
                      Browse Plans <ArrowRight size={14} />
                    </Button>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/plans/global">
            <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700 group">
              View All Destinations & Coming Soon
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
