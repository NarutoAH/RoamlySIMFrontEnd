type TikTokContent = {
  content_id: string;
  content_type: "product";
  content_name?: string;
  price?: number;
  quantity?: number;
};

type TikTokEventData = {
  value?: number;
  currency?: string;
  contents?: TikTokContent[];
  description?: string;
};

type TikTokIdentifyData = {
  email?: string;
  phone_number?: string;
  external_id?: string;
};

type Ttq = {
  page: () => void;
  track: (event: string, data?: TikTokEventData) => void;
  identify: (data: TikTokIdentifyData) => void;
};

function getTtq(): Ttq | null {
  if (typeof window === "undefined") return null;
  const win = window as Window & { ttq?: Ttq };
  return win.ttq ?? null;
}

async function sha256(value: string): Promise<string> {
  if (typeof window === "undefined" || !window.crypto?.subtle) return "";
  const data = new TextEncoder().encode(value);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
  const bytes = new Uint8Array(hashBuffer);
  let hex = "";
  for (const b of bytes) hex += b.toString(16).padStart(2, "0");
  return hex;
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function normalizePhone(phone: string): string {
  const trimmed = phone.trim();
  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");
  return hasPlus ? `+${digits}` : digits;
}

export async function identify(params: {
  email?: string;
  phone?: string;
  externalId?: string;
}): Promise<void> {
  try {
    const ttq = getTtq();
    if (!ttq) return;

    const payload: TikTokIdentifyData = {};
    if (params.email) {
      const normalized = normalizeEmail(params.email);
      if (normalized) payload.email = await sha256(normalized);
    }
    if (params.phone) {
      const normalized = normalizePhone(params.phone);
      if (normalized) payload.phone_number = await sha256(normalized);
    }
    if (params.externalId) {
      payload.external_id = await sha256(params.externalId);
    }

    if (Object.keys(payload).length === 0) return;
    ttq.identify(payload);
  } catch {
    // Hashing or ttq failures must never break the user flow
  }
}

type PlanPayload = {
  planId: string;
  planName: string;
  priceUsd: number;
};

function buildContents(plan: PlanPayload): TikTokEventData {
  return {
    value: plan.priceUsd,
    currency: "USD",
    contents: [
      {
        content_id: plan.planId,
        content_type: "product",
        content_name: plan.planName,
        price: plan.priceUsd,
        quantity: 1,
      },
    ],
  };
}

export function trackViewContent(plan: PlanPayload) {
  const ttq = getTtq();
  if (!ttq) return;
  ttq.track("ViewContent", buildContents(plan));
}

export function trackInitiateCheckout(plan: PlanPayload) {
  const ttq = getTtq();
  if (!ttq) return;
  ttq.track("InitiateCheckout", buildContents(plan));
}

export function trackPlaceAnOrder(plan: PlanPayload) {
  const ttq = getTtq();
  if (!ttq) return;
  ttq.track("PlaceAnOrder", buildContents(plan));
}

const PURCHASE_FIRED_KEY = "tiktok_purchase_fired";
const MAX_REMEMBERED_ORDERS = 100;

function alreadyFired(orderId: string): boolean {
  try {
    const raw = localStorage.getItem(PURCHASE_FIRED_KEY);
    if (!raw) return false;
    const fired = JSON.parse(raw) as string[];
    return Array.isArray(fired) && fired.includes(orderId);
  } catch {
    return false;
  }
}

function rememberFired(orderId: string) {
  try {
    const raw = localStorage.getItem(PURCHASE_FIRED_KEY);
    const fired = raw ? (JSON.parse(raw) as string[]) : [];
    const list = Array.isArray(fired) ? fired : [];
    list.push(orderId);
    const capped = list.slice(-MAX_REMEMBERED_ORDERS);
    localStorage.setItem(PURCHASE_FIRED_KEY, JSON.stringify(capped));
  } catch {
    // best-effort only
  }
}

export function trackPurchase(params: PlanPayload & { orderId: string }) {
  const ttq = getTtq();
  if (!ttq) return;
  if (typeof window === "undefined") return;
  if (alreadyFired(params.orderId)) return;
  rememberFired(params.orderId);
  ttq.track("Purchase", buildContents(params));
}
