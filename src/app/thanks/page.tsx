"use client";

import { Suspense, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { plansByCountry } from "@/data/plans";
import { identify, trackPurchase } from "@/lib/tiktok";
import { WHATSAPP_BUSINESS_NUMBER } from "@/lib/config";

function findPlan(planId: string) {
  for (const plans of Object.values(plansByCountry)) {
    const plan = plans.find((p) => p.id === planId);
    if (plan) return plan;
  }
  return null;
}

function ThanksContent() {
  const params = useSearchParams();
  const planId = params.get("plan");
  const email = params.get("email");
  const ref = params.get("ref");

  const plan = useMemo(() => (planId ? findPlan(planId) : null), [planId]);

  useEffect(() => {
    if (!plan) return;

    let cancelled = false;
    (async () => {
      if (email) {
        await identify({ email });
      }
      if (cancelled) return;

      // Dedup key: prefer admin-supplied ref (unique per customer/order), else
      // fall back to plan_YYYY-MM-DD so a refresh within the same day does not
      // double-fire. Admins should pass ref=<unique> to guarantee correct
      // attribution for multiple customers buying the same plan the same day.
      const today = new Date().toISOString().slice(0, 10);
      const dedupKey = ref || `${plan.id}_${today}`;

      trackPurchase({
        orderId: dedupKey,
        planId: plan.id,
        planName: plan.name,
        priceUsd: plan.price_usd,
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [plan, email, ref]);

  const isUnlimited = plan && plan.data_gb < 0;
  const dataLabel = plan ? (isUnlimited ? "Unlimited" : `${plan.data_gb} GB`) : "";

  return (
    <section className="min-h-screen py-12 bg-[#FAFAF7] dark:bg-slate-950 flex items-center">
      <div className="max-w-xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="text-center">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-emerald-600" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Thank you for your order!
            </h1>

            <p className="text-slate-500 mb-6">
              Your eSIM has been sent to your WhatsApp. Scan the QR code to activate.
            </p>

            {plan && (
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 mb-6 text-left">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-500">Plan</span>
                  <span className="font-medium text-slate-900 dark:text-white">{plan.name}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-500">Data</span>
                  <span className="font-medium text-slate-900 dark:text-white">{dataLabel}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-500">Validity</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {plan.duration_days} {plan.duration_days === 1 ? "Day" : "Days"}
                  </span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500">Amount Paid</span>
                  <span className="font-bold text-emerald-600">${plan.price_usd.toFixed(2)}</span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-6">
              <MessageCircle size={14} className="text-[#25D366]" />
              <span>Need help activating? Reply on WhatsApp</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/${WHATSAPP_BUSINESS_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="primary" className="w-full">
                  Message on WhatsApp
                </Button>
              </a>
              <Link href="/plans" className="flex-1">
                <Button variant="outline" className="w-full">
                  Browse More Plans
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export default function ThanksPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-slate-400">
          Loading...
        </div>
      }
    >
      <ThanksContent />
    </Suspense>
  );
}
