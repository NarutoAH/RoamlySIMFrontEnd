"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  DollarSign,
  Smartphone,
  ShoppingBag,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import Card from "@/components/ui/Card";

const stats = [
  {
    label: "Total Users",
    value: "2,847",
    change: "+12.5%",
    icon: Users,
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Revenue",
    value: "PKR 1.2M",
    change: "+8.3%",
    icon: DollarSign,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Active eSIMs",
    value: "1,423",
    change: "+15.2%",
    icon: Smartphone,
    color: "bg-purple-50 text-purple-600",
  },
  {
    label: "Total Orders",
    value: "5,891",
    change: "+6.8%",
    icon: ShoppingBag,
    color: "bg-amber-50 text-amber-600",
  },
];

const recentOrders = [
  { id: "ORD-892", user: "Ahmed Khan", plan: "Monthly Pro", amount: 1499, status: "active" },
  { id: "ORD-891", user: "Sara Ali", plan: "Weekly Basic", amount: 499, status: "active" },
  { id: "ORD-890", user: "Usman Raza", plan: "Daily Starter", amount: 99, status: "completed" },
  { id: "ORD-889", user: "Fatima Noor", plan: "Monthly Ultra", amount: 2999, status: "active" },
  { id: "ORD-888", user: "Ali Hassan", plan: "3-Day Pro", amount: 349, status: "completed" },
];

const topPlans = [
  { name: "Monthly Pro", sales: 423, revenue: "PKR 634K" },
  { name: "Weekly Basic", sales: 312, revenue: "PKR 156K" },
  { name: "Monthly Ultra", sales: 198, revenue: "PKR 594K" },
  { name: "Daily Starter", sales: 567, revenue: "PKR 56K" },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF7] dark:bg-slate-950">
      <div className="max-w-7xl mx-auto p-6 lg:p-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Overview of your ESIMConnections platform performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                      {stat.value}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp size={14} className="text-emerald-500" />
                      <span className="text-xs font-medium text-emerald-600">
                        {stat.change}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">vs last month</span>
                    </div>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}
                  >
                    <stat.icon size={20} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-0 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                  Recent Orders
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-50 dark:border-slate-700">
                      <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 dark:text-slate-500">
                        Order
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 dark:text-slate-500">
                        Customer
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 dark:text-slate-500">
                        Plan
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 dark:text-slate-500">
                        Amount
                      </th>
                      <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 dark:text-slate-500">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b border-slate-50 dark:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-700/50"
                      >
                        <td className="px-6 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">
                          {order.id}
                        </td>
                        <td className="px-6 py-3 text-slate-700 dark:text-slate-300 font-medium">
                          {order.user}
                        </td>
                        <td className="px-6 py-3 text-slate-600 dark:text-slate-400">
                          {order.plan}
                        </td>
                        <td className="px-6 py-3 text-slate-700 dark:text-slate-300 font-medium">
                          PKR {order.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              order.status === "active"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-blue-50 text-blue-700"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>

          {/* Top Plans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4">
                Top Plans
              </h2>
              <div className="space-y-4">
                {topPlans.map((plan, i) => (
                  <div
                    key={plan.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-slate-100 dark:bg-slate-700 rounded-md flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {plan.name}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">
                          {plan.sales} sales
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                      {plan.revenue}
                      <ArrowUpRight size={14} className="text-emerald-500" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
