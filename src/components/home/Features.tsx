"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Database, Smartphone, RefreshCw } from "lucide-react";
import Card from "@/components/ui/Card";

const features = [
  {
    icon: Zap,
    title: "Quick Activation",
    description:
      "Order via WhatsApp, pay via bank transfer, and receive your eSIM QR code on WhatsApp. Scan the code and you're online.",
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    icon: Database,
    title: "Data Only Plans",
    description:
      "Affordable data-only plans across 5 countries - no voice calls or SMS included. Choose from daily, weekly, or monthly options to suit your needs.",
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    icon: Smartphone,
    title: "Works on Non-PTA Phones",
    description:
      "Our international eSIM connects via international roaming, so any eSIM-compatible device can get data connectivity hassle-free - including non-PTA phones in Pakistan.",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: RefreshCw,
    title: "Auto-Renewal",
    description:
      "Never lose connectivity. Set up auto-renewal for your favorite plan and stay connected without interruption.",
    color: "bg-purple-500/10 text-purple-500",
  },
];

export default function Features() {
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
            Why Choose <span className="text-emerald-600">ESIMConnections</span>?
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            The simplest way to get international eSIM data plans for Pakistan,
            the Middle East, and Europe. Here&apos;s what makes us different.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hover className="h-full text-center">
                <div
                  className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mx-auto mb-4`}
                >
                  <feature.icon size={26} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
