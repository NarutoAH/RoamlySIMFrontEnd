"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const featuredPlans = [
  {
    region: "Pakistan",
    flagImg: "/flags/pk.png",
    name: "5 GB - 7 Days",
    price: "PKR 1,556",
    originalPrice: "PKR 1,778",
    link: "/plans/pakistan",
  },
  {
    region: "Saudi Arabia",
    flagImg: "/flags/sa.png",
    name: "5 GB - 7 Days",
    price: "$8.95",
    originalPrice: "$10.23",
    link: "/plans/middle-east",
  },
  {
    region: "Germany",
    flagImg: "/flags/de.png",
    name: "5 GB - 7 Days",
    price: "$3.13",
    originalPrice: "$3.58",
    link: "/plans/europe",
  },
  {
    region: "UAE",
    flagImg: "/flags/ae.png",
    name: "5 GB - 7 Days",
    price: "$10.70",
    originalPrice: "$12.23",
    link: "/plans/middle-east",
  },
];

export default function PlanPreview() {
  return (
    <section className="py-20 bg-[#FAFAF7] dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Popular Plans by Region
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Affordable data-only eSIM plans starting from just $0.87.
            No voice or SMS - just reliable mobile data. Browse plans for your destination.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPlans.map((plan, index) => (
            <motion.div
              key={plan.region}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={plan.link}>
                <Card hover className="text-center group cursor-pointer">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 overflow-hidden">
                    <Image src={plan.flagImg} alt={plan.region} width={56} height={38} className="object-cover w-full h-full rounded-xl" />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-emerald-600 transition-colors">
                    {plan.region}
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">{plan.name}</p>

                  <div className="mb-5 py-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                    <span className="text-sm text-slate-400">from</span>
                    <span className="text-sm text-slate-400 line-through ml-2">
                      {plan.originalPrice}
                    </span>
                    <span className="text-xl font-bold text-emerald-600 ml-1.5">
                      {plan.price}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:border-emerald-500 group-hover:text-emerald-600"
                  >
                    View Plans
                  </Button>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link href="/plans">
            <Button variant="ghost" className="group text-emerald-600 hover:text-emerald-700">
              View All Destinations
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
