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

type Ttq = {
  page: () => void;
  track: (event: string, data?: TikTokEventData) => void;
};

function getTtq(): Ttq | null {
  if (typeof window === "undefined") return null;
  const win = window as Window & { ttq?: Ttq };
  return win.ttq ?? null;
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

const COMPLETE_PAYMENT_KEY = "tiktok_complete_payment_fired";
const MAX_REMEMBERED_ORDERS = 100;

function alreadyFired(orderId: string): boolean {
  try {
    const raw = localStorage.getItem(COMPLETE_PAYMENT_KEY);
    if (!raw) return false;
    const fired = JSON.parse(raw) as string[];
    return Array.isArray(fired) && fired.includes(orderId);
  } catch {
    return false;
  }
}

function rememberFired(orderId: string) {
  try {
    const raw = localStorage.getItem(COMPLETE_PAYMENT_KEY);
    const fired = raw ? (JSON.parse(raw) as string[]) : [];
    const list = Array.isArray(fired) ? fired : [];
    list.push(orderId);
    const capped = list.slice(-MAX_REMEMBERED_ORDERS);
    localStorage.setItem(COMPLETE_PAYMENT_KEY, JSON.stringify(capped));
  } catch {
    // localStorage may be disabled; best-effort only
  }
}

export function trackCompletePayment(params: PlanPayload & { orderId: string }) {
  const ttq = getTtq();
  if (!ttq) return;
  if (typeof window === "undefined") return;
  if (alreadyFired(params.orderId)) return;
  rememberFired(params.orderId);
  ttq.track("CompletePayment", buildContents(params));
}
