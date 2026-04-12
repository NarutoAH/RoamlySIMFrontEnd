"use client";

import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, User, Phone, Wifi } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { plansByCountry, countries, type Plan, type CountryInfo } from "@/data/plans";
import { formatPrice, convertToLocal, type Currency } from "@/lib/currency";
import { WHATSAPP_BUSINESS_NUMBER } from "@/lib/config";

function findPlan(planId: string): { plan: Plan; countryCode: string } | null {
  for (const [code, plans] of Object.entries(plansByCountry)) {
    const plan = plans.find((p) => p.id === planId);
    if (plan) return { plan, countryCode: code };
  }
  return null;
}

function getPlanTypeLabel(plan: Plan): string {
  switch (plan.type) {
    case "unlimited":
      return "Unlimited Data (No Voice/SMS)";
    case "unlimited_plus":
      return "Unlimited Plus Data (No Voice/SMS)";
    default:
      return "Limited Data (No Voice/SMS)";
  }
}

function buildWhatsAppMessage(
  userInfo: { fullName: string; email: string; phone: string },
  plan: Plan,
  country: CountryInfo
): string {
  const isUnlimited = plan.data_gb < 0;
  const dataLabel = isUnlimited ? "Unlimited" : `${plan.data_gb} GB`;
  const durationLabel = `${plan.duration_days} ${plan.duration_days === 1 ? "Day" : "Days"}`;
  const priceUsd = `$${plan.price_usd.toFixed(2)}`;
  const originalPriceUsd = `$${plan.original_price_usd.toFixed(2)}`;
  const pricePkr = `PKR ${convertToLocal(plan.price_usd, "PKR").toLocaleString()}`;

  return `Hi! I'd like to order an eSIM plan from ESIMConnections.

*My Details:*
Name: ${userInfo.fullName}
Email: ${userInfo.email}
Phone: ${userInfo.phone}

*Plan Details:*
Plan: ${plan.name}
Country: ${country.name}
Data: ${dataLabel}
Duration: ${durationLabel}
Type: ${getPlanTypeLabel(plan)}
Network: ${plan.network}
Price: ${priceUsd} (${pricePkr})${plan.original_price_usd > plan.price_usd ? ` [was ${originalPriceUsd}]` : ``}

Please confirm my order. Thank you!`;
}

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function CheckoutPage() {
  const params = useParams();
  const planId = params.planId as string;

  const result = useMemo(() => findPlan(planId), [planId]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; phone?: string }>({});
  const [currency, setCurrency] = useState<Currency>("USD");

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="text-center max-w-md">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Plan Not Found</h2>
          <p className="text-slate-500 mb-4">The plan you are looking for does not exist.</p>
          <Link href="/plans">
            <Button size="sm">Browse Plans</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const { plan, countryCode } = result;
  const country = countries[countryCode];
  const isUnlimited = plan.data_gb < 0;
  const dataLabel = isUnlimited ? "Unlimited" : `${plan.data_gb} GB`;

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    const trimmedName = fullName.trim();
    if (!trimmedName) {
      newErrors.fullName = "Full name is required.";
    } else if (trimmedName.length < 2) {
      newErrors.fullName = "Name must be at least 2 characters.";
    }

    if (!email) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    const trimmedPhone = phone.trim();
    if (!trimmedPhone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[+]?[\d\s\-()]{7,}$/.test(trimmedPhone) || (trimmedPhone.match(/\d/g) || []).length < 7) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const message = buildWhatsAppMessage(
      { fullName: fullName.trim(), email: email.trim(), phone: phone.trim() },
      plan,
      country
    );
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="min-h-screen py-12 bg-[#FAFAF7] dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/plans"
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-emerald-600 mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Plans
        </Link>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Checkout Form - 3 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3"
          >
            <Card>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Checkout
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    <User size={14} className="inline mr-1.5 -mt-0.5" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ahmad Khan"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    <Mail size={14} className="inline mr-1.5 -mt-0.5" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    maxLength={254}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    <Phone size={14} className="inline mr-1.5 -mt-0.5" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={20}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 407 5294527"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* WhatsApp Order Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#25D366] hover:bg-[#1da851] shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40"
                  disabled={!fullName.trim() || !email.trim() || !phone.trim()}
                >
                  <WhatsAppIcon size={20} />
                  Order via WhatsApp
                </Button>

                <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <WhatsAppIcon size={14} />
                    Order via WhatsApp chat
                  </span>
                  <span className="flex items-center gap-1">
                    <Wifi size={14} />
                    eSIM delivered via WhatsApp
                  </span>
                </div>

                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 text-sm text-slate-600 dark:text-slate-300">
                  <p className="font-medium text-slate-800 dark:text-slate-200 mb-2">Payment Methods</p>
                  <p>We currently accept <span className="font-medium">Bank Transfers</span>, <span className="font-medium">JazzCash</span>, and <span className="font-medium">EasyPaisa</span>. Payment details will be shared via WhatsApp.</p>
                  <p className="text-xs text-slate-400 mt-2">Online card payments coming soon!</p>
                </div>
              </form>
            </Card>
          </motion.div>

          {/* Order Summary - 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="sticky top-24">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Order Summary
              </h2>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
                  <Image src={country.flagImg} alt={country.name} width={40} height={40} className="object-cover w-full h-full rounded-xl" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{plan.name}</p>
                  <p className="text-xs text-slate-400">
                    {country.name} &middot; Data Only eSIM &middot; {plan.network}
                  </p>
                </div>
              </div>

              <div className="space-y-3 py-4 border-y border-slate-100 dark:border-slate-700">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Data</span>
                  <span className="font-medium text-slate-900 dark:text-white">{dataLabel}</span>
                </div>
                {plan.throttle && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Speed</span>
                    <span className="text-xs text-amber-600 font-medium">{plan.throttle}/day</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Validity</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {plan.duration_days} {plan.duration_days === 1 ? "Day" : "Days"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Type</span>
                  <span className="font-medium text-slate-900 dark:text-white">Data Only (No Voice/SMS)</span>
                </div>
              </div>

              {/* Currency Toggle - only for Pakistan */}
              {country.code === "pk" && (
              <div className="flex justify-center my-4">
                <div className="inline-flex bg-slate-100 dark:bg-slate-700 rounded-full p-0.5">
                  {(["USD", "PKR"] as Currency[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        currency === c
                          ? "bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm"
                          : "text-slate-500"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              )}

              <div className="flex justify-between items-center pt-2">
                <span className="text-base font-semibold text-slate-900 dark:text-white">Total</span>
                <div className="text-right">
                  {plan.original_price_usd > plan.price_usd && (
                    <span className="text-sm text-slate-400 line-through mr-2">
                      {formatPrice(plan.original_price_usd, currency)}
                    </span>
                  )}
                  <span className="text-2xl font-bold text-emerald-600">
                    {formatPrice(plan.price_usd, currency)}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
