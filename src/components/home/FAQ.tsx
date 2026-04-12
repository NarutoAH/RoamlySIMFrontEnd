"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is an eSIM?",
    answer:
      "An eSIM (embedded SIM) is a digital SIM that allows you to activate a cellular plan without using a physical SIM card. It's built into your phone and can be activated by scanning a QR code. Most modern smartphones support eSIM technology.",
  },
  {
    question: "Which countries does ESIMConnections support?",
    answer:
      "We currently offer international eSIM data plans for Pakistan, Saudi Arabia, UAE, Germany, and Spain. More countries are being added soon, including Qatar, Bahrain, Kuwait, and Turkey.",
  },
  {
    question: "Does ESIMConnections work on non-PTA phones in Pakistan?",
    answer:
      "Yes. Since our eSIMs operate on international roaming networks, they are compatible with non-PTA registered devices - just like any international SIM card works when roaming. This makes ESIMConnections a convenient data solution for non-PTA phones in Pakistan.",
  },
  {
    question: "How do I activate my eSIM?",
    answer:
      "After placing your order via WhatsApp and completing payment, we will send your eSIM QR code directly to your WhatsApp. Go to your phone's Settings > Cellular/Mobile Data > Add eSIM or Add Data Plan. Scan the QR code, and your eSIM will be activated within minutes. We also provide step-by-step guides for popular phone models.",
  },
  {
    question: "What data plans do you offer?",
    answer:
      "We offer Limited, Unlimited, and Unlimited Plus data plans across all supported countries. Plan durations range from 1 day to 90 days. Prices start from $0.87 (for Europe) and PKR 400 (for Pakistan) and vary by region. All plans are data-only and provide 4G/LTE data through international roaming networks. Voice calls and SMS are not included.",
  },
  {
    question: "Which phones are compatible with eSIM?",
    answer:
      "Most modern smartphones support eSIM, including iPhone XR and newer, Samsung Galaxy S20 and newer, Google Pixel 3 and newer, and many other Android devices. Check your phone's settings for 'Add eSIM' or 'Add Data Plan' option to confirm compatibility.",
  },
  {
    question: "Do ESIMConnections eSIMs support voice calls and SMS?",
    answer:
      "No. ESIMConnections eSIMs are data-only, which means they provide mobile internet access but do not support voice calls or SMS. If you need to make calls, you can use internet-based apps like WhatsApp, Zoom, or Skype over your data connection.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "We offer a full refund within 24 hours of purchase if the eSIM hasn't been activated. Once activated, we can offer a partial refund based on unused data within the first 3 days. Please contact our support team for refund requests.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      >
        <span className="text-base font-medium text-slate-900 dark:text-white pr-4">
          {faq.question}
        </span>
        <ChevronDown
          size={20}
          className={cn(
            "text-slate-400 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-6 pb-4">
              <p className="text-sm text-slate-500 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-lg">
            Got questions? We&apos;ve got answers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
