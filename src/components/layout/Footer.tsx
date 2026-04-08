"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="ESIMConnections" width={36} height={36} className="rounded-lg" />
              <span className="text-white text-xl font-bold">ESIMConnections</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              International eSIM platform for Pakistan, the Middle East,
              and Europe. Stay connected with affordable data plans that
              work on any eSIM-compatible device.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/plans", label: "All Plans" },
                { href: "/plans/pakistan", label: "Pakistan" },
                { href: "/plans/middle-east", label: "Middle East" },
                { href: "/plans/europe", label: "Europe" },
                { href: "/auth/login", label: "Login" },
                { href: "/auth/register", label: "Sign Up" },
                { href: "/dashboard", label: "Dashboard" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2.5">
              {[
                "How to Activate eSIM",
                "Compatible Devices",
                "Refund Policy",
                "Terms of Service",
                "Privacy Policy",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Mail size={16} className="text-emerald-500 shrink-0" />
                support@esimconnections.com
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Phone size={16} className="text-emerald-500 shrink-0" />
                +1 (407) 529-4527
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} ESIMConnections. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            A product by Utomate AI LLC
          </p>
        </div>
      </div>
    </footer>
  );
}
