"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface PlanCardProps {
  id: string;
  name: string;
  data_gb: number;
  duration_days: number;
  price_pkr: number;
  popular?: boolean;
  type?: string;
  throttle?: string;
  onBuy?: (id: string) => void;
}

export default function PlanCard({
  id,
  name,
  data_gb,
  duration_days,
  price_pkr,
  popular,
  type,
  throttle,
  onBuy,
}: PlanCardProps) {
  const isUnlimited = data_gb < 0;
  const dataLabel = isUnlimited ? "Unlimited" : `${data_gb} GB`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Card
        hover
        className={`relative text-center ${
          popular
            ? "border-2 border-emerald-400 scale-[1.03] animate-card-glow"
            : ""
        }`}
      >
        {popular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
            Popular
          </div>
        )}

        {/* Flag */}
        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-3">
          <span className="text-2xl">🇵🇰</span>
        </div>

        <h3 className="text-base font-semibold text-slate-900 mb-1">{name}</h3>
        <p className="text-xs text-slate-400 mb-4">
          Pakistan &middot; Data Only eSIM &middot; Jazz Network
        </p>

        <div className="mb-1">
          {isUnlimited ? (
            <span className="text-3xl font-bold text-slate-900">Unlimited</span>
          ) : (
            <>
              <span className="text-4xl font-bold text-slate-900">{data_gb}</span>
              <span className="text-lg text-slate-500 ml-1">GB</span>
            </>
          )}
        </div>

        {throttle && (
          <div className="mb-1">
            <p className="text-xs text-amber-600 font-medium">{throttle}/day</p>
            <p className="text-[10px] text-slate-400">Resets daily</p>
          </div>
        )}

        <p className="text-sm text-slate-400 mb-4">
          {duration_days} {duration_days === 1 ? "Day" : "Days"} validity
        </p>

        <div className="mb-5 py-3 bg-slate-50 rounded-lg">
          <span className="text-2xl font-bold text-emerald-600">
            PKR {Math.round(price_pkr).toLocaleString()}
          </span>
        </div>

        <Button
          variant="primary"
          size={popular ? "md" : "sm"}
          className={`w-full ${popular ? "animate-emerald-glow" : ""}`}
          onClick={() => onBuy?.(id)}
        >
          Buy Now
        </Button>
      </Card>
    </motion.div>
  );
}
