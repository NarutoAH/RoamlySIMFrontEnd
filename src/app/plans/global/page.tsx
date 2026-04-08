"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Globe as GlobeIcon } from "lucide-react";
import { regions, countries } from "@/data/plans";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const supportedCountries = [countries.pk, countries.ksa, countries.uae, countries.de, countries.es];

const comingSoon = [
  { name: "Qatar", flag: "\u{1F1F6}\u{1F1E6}" },
  { name: "Bahrain", flag: "\u{1F1E7}\u{1F1ED}" },
  { name: "Kuwait", flag: "\u{1F1F0}\u{1F1FC}" },
  { name: "Turkey", flag: "\u{1F1F9}\u{1F1F7}" },
  { name: "France", flag: "\u{1F1EB}\u{1F1F7}" },
  { name: "Italy", flag: "\u{1F1EE}\u{1F1F9}" },
  { name: "UK", flag: "\u{1F1EC}\u{1F1E7}" },
  { name: "USA", flag: "\u{1F1FA}\u{1F1F8}" },
];

export default function GlobalPlansPage() {
  return (
    <section className="py-12 bg-[#FAFAF7] dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GlobeIcon size={32} className="text-emerald-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Global Coverage
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            International eSIM plans available across multiple regions.
            Choose your destination to browse plans.
          </p>
        </motion.div>

        {/* Regions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {regions.map((region, i) => (
            <motion.div
              key={region.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link href={`/plans/${region.slug}`}>
                <Card hover className="text-center group cursor-pointer">
                  <div className="flex justify-center gap-2 mb-3">
                    {region.countries.map((c) => (
                      <div key={c.code} className="w-10 h-7 rounded overflow-hidden">
                        <Image src={c.flagImg} alt={c.name} width={40} height={28} className="object-cover w-full h-full" />
                      </div>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 transition-colors">
                    {region.name}
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">
                    {region.countries.map((c) => c.name).join(", ")}
                  </p>
                  <Button variant="outline" size="sm" className="group-hover:border-emerald-500 group-hover:text-emerald-600">
                    View Plans <ArrowRight size={14} />
                  </Button>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Supported Countries */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">
            Currently Supported Countries
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {supportedCountries.map((c) => (
              <div
                key={c.code}
                className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-5 py-2.5"
              >
                <Image src={c.flagImg} alt={c.name} width={28} height={20} className="rounded-sm object-cover" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{c.name}</span>
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-2">
            More Countries Coming Soon
          </h2>
          <p className="text-slate-400 text-center mb-8">
            We&apos;re expanding to more destinations. Stay tuned!
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {comingSoon.map((c) => (
              <div
                key={c.name}
                className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-2 opacity-60"
              >
                <span className="text-lg">{c.flag}</span>

                <span className="text-sm text-slate-500">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
