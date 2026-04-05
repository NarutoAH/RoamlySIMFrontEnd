"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ISO 3166-1 numeric codes
const PAKISTAN = "586";
const SAUDI_ARABIA = "682";
const UAE = "784";
const GERMANY = "276";
const SPAIN = "724";
const QATAR = "634";

const ACTIVE_COUNTRIES = new Set([PAKISTAN, SAUDI_ARABIA, UAE, GERMANY, SPAIN]);
const COMING_SOON_COUNTRIES = new Set([QATAR]);

function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const geoDataRef = useRef<any>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !geoDataRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const size = Math.min(rect.width, rect.height);

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    // Center between Pakistan (68E) and Europe (10E), roughly 40E, 30N
    const projection = d3
      .geoOrthographic()
      .rotate([-45, -28, 0])
      .translate([size / 2, size / 2])
      .scale(size / 2 - 2)
      .clipAngle(90);

    const path = d3.geoPath(projection, ctx);
    const { countries } = geoDataRef.current;

    ctx.clearRect(0, 0, size, size);

    // Ocean
    ctx.beginPath();
    path({ type: "Sphere" } as any);
    const gradient = ctx.createRadialGradient(
      size * 0.45, size * 0.4, 0,
      size / 2, size / 2, size / 2
    );
    gradient.addColorStop(0, "#1a2744");
    gradient.addColorStop(1, "#0c1629");
    ctx.fillStyle = gradient;
    ctx.fill();

    // Globe border
    ctx.beginPath();
    path({ type: "Sphere" } as any);
    ctx.strokeStyle = "rgba(16, 185, 129, 0.15)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Graticule
    const graticule = d3.geoGraticule10();
    ctx.beginPath();
    path(graticule);
    ctx.strokeStyle = "rgba(71, 85, 105, 0.25)";
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Countries
    countries.features.forEach((feature: any) => {
      const id = feature.id;
      const isActive = ACTIVE_COUNTRIES.has(id);
      const isComingSoon = COMING_SOON_COUNTRIES.has(id);

      ctx.beginPath();
      path(feature);

      if (isActive) {
        ctx.fillStyle = "#10b981";
        ctx.fill();
        ctx.strokeStyle = "#059669";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.shadowColor = "#10b981";
        ctx.shadowBlur = 15;
        ctx.beginPath();
        path(feature);
        ctx.fillStyle = "rgba(16, 185, 129, 0.4)";
        ctx.fill();
        ctx.shadowBlur = 0;
      } else if (isComingSoon) {
        ctx.fillStyle = "#f59e0b";
        ctx.fill();
        ctx.strokeStyle = "#d97706";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.shadowColor = "#f59e0b";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        path(feature);
        ctx.fillStyle = "rgba(245, 158, 11, 0.3)";
        ctx.fill();
        ctx.shadowBlur = 0;
      } else {
        ctx.fillStyle = "#1e3a5f";
        ctx.fill();
        ctx.strokeStyle = "rgba(71, 85, 105, 0.4)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    });

    // Outer glow
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 + 4, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(16, 185, 129, 0.08)";
    ctx.lineWidth = 10;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2 + 12, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(16, 185, 129, 0.04)";
    ctx.lineWidth = 15;
    ctx.stroke();
  }, []);

  useEffect(() => {
    fetch(GEO_URL)
      .then((res) => res.json())
      .then((world) => {
        const land = topojson.feature(world, world.objects.land);
        const countries = topojson.feature(world, world.objects.countries);
        geoDataRef.current = { land, countries };
        draw();
      });

    const handleResize = () => draw();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full aspect-square max-w-[500px]"
      style={{ contain: "layout paint size" }}
    />
  );
}

export default function Globe() {
  return (
    <section className="relative bg-slate-950 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Connected Across{" "}
              <span className="text-emerald-400">5 Countries</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Our international eSIM works across Pakistan, the Middle East, and
              Europe. Get reliable high-speed data wherever you travel — one eSIM,
              multiple destinations.
            </p>

            {/* Active coverage */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wide">
                  Active Coverage
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { country: "Pakistan", flag: "\u{1F1F5}\u{1F1F0}", network: "Jazz" },
                  { country: "Saudi Arabia", flag: "\u{1F1F8}\u{1F1E6}", network: "STC" },
                  { country: "UAE", flag: "\u{1F1E6}\u{1F1EA}", network: "Etisalat" },
                  { country: "Germany", flag: "\u{1F1E9}\u{1F1EA}", network: "Vodafone" },
                  { country: "Spain", flag: "\u{1F1EA}\u{1F1F8}", network: "Movistar" },
                ].map((item) => (
                  <div
                    key={item.country}
                    className="flex items-center gap-2 text-sm text-slate-300"
                  >
                    <span>{item.flag}</span>
                    {item.country}
                  </div>
                ))}
              </div>
            </div>

            {/* Coming soon */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Clock size={14} className="text-amber-400" />
                <span className="text-sm font-semibold text-amber-400 uppercase tracking-wide">
                  Coming Soon
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  { country: "Qatar", flag: "\u{1F1F6}\u{1F1E6}" },
                  { country: "Bahrain", flag: "\u{1F1E7}\u{1F1ED}" },
                  { country: "Kuwait", flag: "\u{1F1F0}\u{1F1FC}" },
                  { country: "Turkey", flag: "\u{1F1F9}\u{1F1F7}" },
                ].map((item) => (
                  <motion.div
                    key={item.country}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 bg-slate-800/60 border border-amber-500/20 rounded-lg px-4 py-2"
                  >
                    <span className="text-lg">{item.flag}</span>
                    <span className="text-sm text-slate-300">
                      {item.country}
                    </span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-medium">
                      SOON
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center"
          >
            <GlobeCanvas />
          </motion.div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-8 mt-8">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="w-3 h-3 bg-emerald-500 rounded-full" />
            Active Coverage
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="w-3 h-3 bg-amber-500 rounded-full" />
            Coming Soon
          </div>
        </div>
      </div>
    </section>
  );
}
