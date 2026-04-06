const CACHE_PREFIX = "esimconnections_order_";
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface CachedOrder {
  orderId: string;
  planId: string;
  planName: string;
  email: string;
  dataGb: number;
  durationDays: number;
  priceUsd: number;
  network: string;
  country: string;
  status: "pending" | "paid" | "active" | "failed" | "expired" | "cancelled";
  esimActivationCode?: string;
  esimSmdpAddress?: string;
  esimMatchingId?: string;
  esimIccid?: string;
  createdAt: string;
  expiresAt: string;
}

interface CacheEntry {
  order: CachedOrder;
  cachedAt: number;
}

export function saveOrder(order: CachedOrder): void {
  if (typeof window === "undefined") return;
  const entry: CacheEntry = { order, cachedAt: Date.now() };
  localStorage.setItem(`${CACHE_PREFIX}${order.orderId}`, JSON.stringify(entry));

  // Also save to recent orders list
  const recentIds = getRecentOrderIds();
  if (!recentIds.includes(order.orderId)) {
    recentIds.unshift(order.orderId);
    // Keep only last 20 orders
    localStorage.setItem("esimconnections_recent_orders", JSON.stringify(recentIds.slice(0, 20)));
  }
}

export function getOrder(orderId: string): CachedOrder | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(`${CACHE_PREFIX}${orderId}`);
  if (!raw) return null;

  try {
    const entry: CacheEntry = JSON.parse(raw);
    if (Date.now() - entry.cachedAt > CACHE_TTL_MS) {
      localStorage.removeItem(`${CACHE_PREFIX}${orderId}`);
      return null;
    }
    return entry.order;
  } catch {
    return null;
  }
}

export function updateOrder(orderId: string, updates: Partial<CachedOrder>): void {
  const existing = getOrder(orderId);
  if (!existing) return;
  saveOrder({ ...existing, ...updates });
}

function getRecentOrderIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("esimconnections_recent_orders") || "[]");
  } catch {
    return [];
  }
}

export function getRecentOrders(): CachedOrder[] {
  return getRecentOrderIds()
    .map(getOrder)
    .filter((o): o is CachedOrder => o !== null);
}
