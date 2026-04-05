"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, CreditCard, Wifi } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Choose a Plan",
    description:
      "Browse our range of affordable international eSIM data plans. Pick the one that fits your usage — daily, weekly, or monthly.",
  },
  {
    icon: CreditCard,
    step: "02",
    title: "Pay & Receive eSIM",
    description:
      "Pay securely via Paddle or bank transfer. Your international eSIM QR code will be available instantly in your dashboard.",
  },
  {
    icon: Wifi,
    step: "03",
    title: "Activate & Connect",
    description:
      "Scan the QR code in your phone's settings to install the eSIM. You'll be online in under 5 minutes.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Get connected in three simple steps. No store visits, no waiting in
            line. Everything is done digitally.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-200" />

          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative text-center"
            >
              {/* Step circle */}
              <div className="relative z-10 mx-auto mb-6">
                <div className="w-32 h-32 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-100 dark:border-emerald-900 flex items-center justify-center mx-auto">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                    <step.icon size={32} className="text-emerald-600" />
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {step.step}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                {step.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
