"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ui/ThemeToggle";

const planLinks = [
  { href: "/plans/pakistan", label: "Pakistan", flagImg: "/flags/pk.png" },
  { href: "/plans/middle-east", label: "Middle East", flagImg: "/flags/sa.png" },
  { href: "/plans/europe", label: "Europe", flagImg: "/flags/de.png" },
  { href: "/plans/global", label: "Global", flagImg: null },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [plansOpen, setPlansOpen] = useState(false);
  const plansRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);

    const handleClickOutside = (e: MouseEvent) => {
      if (plansRef.current && !plansRef.current.contains(e.target as Node)) {
        setPlansOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-lg"
          : "bg-slate-900"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="ESIMConnections" width={44} height={44} className="rounded-lg" />
            <span className="text-white text-xl font-bold tracking-tight">
              ESIMConnections
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
            >
              Home
            </Link>

            {/* Plans Dropdown */}
            <div className="relative" ref={plansRef}>
              <button
                onClick={() => setPlansOpen(!plansOpen)}
                className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors text-sm font-medium cursor-pointer"
              >
                Plans
                <ChevronDown size={14} className={cn("transition-transform", plansOpen && "rotate-180")} />
              </button>
              {plansOpen && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-52 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-50">
                  <Link
                    href="/plans"
                    className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium"
                    onClick={() => setPlansOpen(false)}
                  >
                    All Destinations
                  </Link>
                  <hr className="my-1 border-slate-100 dark:border-slate-700" />
                  {planLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                      onClick={() => setPlansOpen(false)}
                    >
                      {link.flagImg ? <Image src={link.flagImg} alt={link.label} width={20} height={14} className="rounded-sm object-cover" /> : <span>🌐</span>}
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/#about"
              className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
            >
              About
            </Link>
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2 cursor-pointer"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/"
              className="block text-slate-300 hover:text-white transition-colors text-base font-medium py-2"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/plans"
              className="block text-slate-300 hover:text-white transition-colors text-base font-medium py-2"
              onClick={() => setMobileOpen(false)}
            >
              All Plans
            </Link>
            <div className="pl-4 space-y-1">
              {planLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm py-1.5"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.flagImg ? <Image src={link.flagImg} alt={link.label} width={20} height={14} className="rounded-sm object-cover" /> : <span>🌐</span>}
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
