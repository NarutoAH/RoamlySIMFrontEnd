"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { CheckCircle, Copy, Check, Mail, ArrowLeft, Smartphone, Settings, Wifi, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { getOrder, type CachedOrder } from "@/lib/orderCache";
import { api } from "@/lib/api";
import { trackCompletePayment } from "@/lib/tiktok";

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params.orderId as string;

  const [order, setOrder] = useState<CachedOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    // First try to load from cache
    const cached = getOrder(orderId);
    if (cached) {
      setOrder(cached);
      setLoading(false);
    }

    // Also try to fetch fresh data from backend
    api.getOrder(orderId)
      .then((res) => {
        const updated: CachedOrder = {
          orderId: String(res.id),
          planId: String(res.plan.id),
          planName: res.plan.name,
          email: cached?.email || "",
          dataGb: res.plan.data_amount_gb,
          durationDays: res.plan.duration_days,
          priceUsd: res.plan.price_usd,
          network: "",
          country: res.plan.country_code,
          status: res.status as CachedOrder["status"],
          esimActivationCode: res.esim_activation_code,
          esimSmdpAddress: res.esim_smdp_address,
          esimMatchingId: res.esim_matching_id,
          esimIccid: res.esim_iccid,
          createdAt: res.created_at,
          expiresAt: cached?.expiresAt || "",
        };
        setOrder(updated);
      })
      .catch(() => {
        // If backend fails, we still have the cache
      })
      .finally(() => setLoading(false));
  }, [orderId]);

  useEffect(() => {
    if (!order) return;
    if (order.status !== "active") return;
    trackCompletePayment({
      orderId: order.orderId,
      planId: order.planId,
      planName: order.planName,
      priceUsd: order.priceUsd,
    });
  }, [order]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-slate-400">Loading order...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="text-center max-w-md">
          <AlertCircle size={48} className="text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Order Not Found</h2>
          <p className="text-slate-500 mb-4">
            This order may have expired from cache. If you received your eSIM details via WhatsApp, please check there.
          </p>
          <Link href="/plans">
            <Button size="sm">Browse Plans</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const isActive = order.status === "active";
  const isPending = order.status === "pending" || order.status === "paid";
  const activationCode = order.esimActivationCode || "";
  const lpaString = order.esimSmdpAddress && order.esimMatchingId
    ? `LPA:1$${order.esimSmdpAddress}$${order.esimMatchingId}`
    : activationCode;
  const isUnlimited = order.dataGb < 0;
  const dataLabel = isUnlimited ? "Unlimited" : `${order.dataGb} GB`;

  return (
    <section className="min-h-screen py-12 bg-[#FAFAF7] dark:bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/plans"
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-emerald-600 mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Browse More Plans
        </Link>

        {/* Status Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          {isActive ? (
            <>
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-emerald-600" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Your eSIM is Ready!
              </h1>
              <p className="text-slate-500">
                Scan the QR code below to activate your eSIM.
                {order.email && (
                  <>
                    {" "}Your eSIM details were also shared via WhatsApp.
                  </>
                )}
              </p>
            </>
          ) : isPending ? (
            <>
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={32} className="text-amber-600" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Payment Pending
              </h1>
              <p className="text-slate-500">
                Your order has been created. Once payment is confirmed, your eSIM will be activated automatically.
              </p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={32} className="text-slate-400" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Order #{order.orderId}
              </h1>
              <p className="text-slate-500">Status: {order.status}</p>
            </>
          )}
        </motion.div>

        {/* QR Code Card */}
        {isActive && lpaString && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="text-center mb-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                eSIM QR Code
              </h2>

              <div className="inline-block p-4 bg-white rounded-2xl shadow-inner mb-4">
                <QRCodeSVG
                  value={lpaString}
                  size={220}
                  level="M"
                  includeMargin
                />
              </div>

              <p className="text-xs text-slate-400 mb-4">
                Scan this QR code in your phone&apos;s eSIM settings
              </p>

              {/* LPA String */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 mb-4">
                <p className="text-xs text-slate-400 mb-1">Activation Code (LPA)</p>
                <div className="flex items-center gap-2">
                  <code className="text-sm text-slate-700 dark:text-slate-300 break-all flex-1 text-left">
                    {lpaString}
                  </code>
                  <button
                    onClick={() => handleCopy(lpaString, "lpa")}
                    className="shrink-0 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Copy"
                  >
                    {copied === "lpa" ? (
                      <Check size={16} className="text-emerald-500" />
                    ) : (
                      <Copy size={16} className="text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* ICCID */}
              {order.esimIccid && (
                <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4">
                  <p className="text-xs text-slate-400 mb-1">ICCID</p>
                  <div className="flex items-center gap-2">
                    <code className="text-sm text-slate-700 dark:text-slate-300 break-all flex-1 text-left">
                      {order.esimIccid}
                    </code>
                    <button
                      onClick={() => handleCopy(order.esimIccid!, "iccid")}
                      className="shrink-0 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Copy"
                    >
                      {copied === "iccid" ? (
                        <Check size={16} className="text-emerald-500" />
                      ) : (
                        <Copy size={16} className="text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        )}

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Order Details
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Order ID</span>
                <span className="font-medium text-slate-900 dark:text-white">#{order.orderId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Plan</span>
                <span className="font-medium text-slate-900 dark:text-white">{order.planName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Data</span>
                <span className="font-medium text-slate-900 dark:text-white">{dataLabel}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Validity</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {order.durationDays} {order.durationDays === 1 ? "Day" : "Days"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Country</span>
                <span className="font-medium text-slate-900 dark:text-white">{order.country}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Price</span>
                <span className="font-bold text-emerald-600">${order.priceUsd.toFixed(2)}</span>
              </div>
              {order.email && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Email</span>
                  <span className="font-medium text-slate-900 dark:text-white">{order.email}</span>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Setup Instructions */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="mb-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                How to Activate
              </h2>
              <div className="space-y-4">
                {[
                  {
                    icon: Smartphone,
                    title: "Open Settings",
                    description: "Go to Settings > Cellular/Mobile Data > Add eSIM or Add Data Plan",
                  },
                  {
                    icon: Settings,
                    title: "Scan QR Code",
                    description: "Choose 'Scan QR Code' and point your camera at the QR code above",
                  },
                  {
                    icon: Wifi,
                    title: "Start Using Data",
                    description: "Once activated, enable the eSIM for data and you're connected!",
                  },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center shrink-0">
                      <step.icon size={20} className="text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white text-sm">
                        Step {i + 1}: {step.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Email notice */}
        {order.email && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-center text-sm text-slate-400 flex items-center justify-center gap-2"
          >
            <Mail size={14} />
            Your eSIM details were shared via WhatsApp
          </motion.div>
        )}
      </div>
    </section>
  );
}
