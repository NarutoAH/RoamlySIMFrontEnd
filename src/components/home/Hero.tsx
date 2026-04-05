"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Wifi, Shield, Zap, Globe } from "lucide-react";
import Button from "@/components/ui/Button";

const supportedFlags = [
  { flag: "\u{1F1F5}\u{1F1F0}", name: "Pakistan" },
  { flag: "\u{1F1F8}\u{1F1E6}", name: "Saudi Arabia" },
  { flag: "\u{1F1E6}\u{1F1EA}", name: "UAE" },
  { flag: "\u{1F1E9}\u{1F1EA}", name: "Germany" },
  { flag: "\u{1F1EA}\u{1F1F8}", name: "Spain" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-400 text-sm font-medium">
                International eSIM — 5 Countries Available
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Stay Connected{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                Anywhere
              </span>{" "}
              You Go
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed"
            >
              Get data-only eSIM plans for Pakistan, Saudi Arabia, UAE,
              Germany, and Spain. No physical SIM needed, no voice or SMS — just
              fast, reliable mobile data. Activate in minutes wherever you are.
            </motion.p>

            {/* Supported country flags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex items-center gap-3 mb-8"
            >
              {supportedFlags.map((c) => (
                <div
                  key={c.name}
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center"
                  title={c.name}
                >
                  <span className="text-lg">{c.flag}</span>
                </div>
              ))}
              <span className="text-sm text-slate-500 ml-1">+ more coming</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link href="/plans">
                <Button size="lg" className="group">
                  Browse Plans
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
              <Link href="/#how-it-works">
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                  How It Works
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-6"
            >
              {[
                { icon: Zap, text: "Instant Activation" },
                { icon: Wifi, text: "Data Only — No Calls/SMS" },
                { icon: Shield, text: "Secure & Reliable" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-400">
                  <item.icon size={16} className="text-emerald-400" />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Stats / Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main card */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Globe size={32} className="text-emerald-400" />
                  </div>
                  <h3 className="text-white text-xl font-semibold">International eSIM</h3>
                  <p className="text-slate-400 text-sm mt-1">Data Only &middot; 5 countries &middot; 150+ plans</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "5", label: "Countries" },
                    { value: "99.9%", label: "Uptime" },
                    { value: "150+", label: "Data Plans" },
                    { value: "24/7", label: "Support" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="bg-white/5 rounded-xl p-4 text-center"
                    >
                      <div className="text-2xl font-bold text-white">
                        {stat.value}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-amber-500 text-white rounded-xl px-4 py-2 shadow-lg shadow-amber-500/30">
                <span className="text-sm font-bold">From $0.91</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
