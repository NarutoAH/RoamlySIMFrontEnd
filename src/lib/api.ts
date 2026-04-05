const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(error.detail || `HTTP ${res.status}`);
  }

  return res.json();
}

export interface OrderCreateRequest {
  plan_id: string;
  email: string;
  payment_method: "paddle" | "bank_transfer";
}

export interface OrderResponse {
  id: string;
  status: "pending" | "paid" | "active" | "expired" | "cancelled";
  payment_method: string;
  payment_reference: string;
  esim_iccid?: string;
  esim_activation_code?: string;
  esim_smdp_address?: string;
  esim_matching_id?: string;
  auto_renew: boolean;
  created_at: string;
  plan: {
    id: number;
    name: string;
    data_amount_gb: number;
    duration_days: number;
    price_usd: number;
    country_code: string;
  };
}

export const api = {
  createOrder: (data: OrderCreateRequest) =>
    request<OrderResponse>("/orders", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getOrder: (orderId: string) =>
    request<OrderResponse>(`/orders/${orderId}`),

  // Admin endpoints (kept for admin dashboard)
  adminStats: () =>
    request<AdminStats>("/admin/stats"),

  adminOrders: (params?: { skip?: number; limit?: number; status?: string }) => {
    const query = new URLSearchParams();
    if (params?.skip) query.set("skip", String(params.skip));
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.status) query.set("status", params.status);
    const qs = query.toString();
    return request<OrderResponse[]>(`/admin/orders${qs ? `?${qs}` : ""}`);
  },
};

export interface AdminStats {
  total_users: number;
  total_revenue: number;
  active_esims: number;
  total_orders: number;
}

// Mock email service - logs instead of sending
export async function sendOrderEmail(email: string, order: OrderResponse): Promise<void> {
  console.log("=== EMAIL SERVICE (MOCK) ===");
  console.log(`To: ${email}`);
  console.log(`Subject: Your Roamly eSIM eSIM is ready - Order #${order.id}`);
  console.log(`Plan: ${order.plan.name}`);
  console.log(`Activation Code: ${order.esim_activation_code || "N/A"}`);
  console.log(`SMDP Address: ${order.esim_smdp_address || "N/A"}`);
  console.log(`ICCID: ${order.esim_iccid || "N/A"}`);
  console.log("===========================");
}
