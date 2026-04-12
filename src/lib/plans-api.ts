import type { Plan, CountryInfo } from "@/data/plans";
import { countries, regions, plansByCountry } from "@/data/plans";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Map backend country_code (ISO) to frontend country key
const ISO_TO_KEY: Record<string, string> = {
  PK: "pk",
  SA: "ksa",
  AE: "uae",
  DE: "de",
  ES: "es",
};

interface BackendPlan {
  id: number;
  name: string;
  data_amount_gb: number;
  duration_days: number;
  price_usd: number;
  original_price_usd: number | null;
  country_code: string;
  plan_type: string;
  throttle: string | null;
  network: string | null;
  popular: boolean;
  esim_package_id: string | null;
}

function toFrontendPlan(bp: BackendPlan): Plan {
  return {
    id: bp.esim_package_id || String(bp.id),
    name: bp.name,
    data_gb: bp.data_amount_gb,
    duration_days: bp.duration_days,
    price_usd: bp.price_usd,
    original_price_usd: bp.original_price_usd || bp.price_usd,
    popular: bp.popular,
    type: bp.plan_type as Plan["type"],
    throttle: bp.throttle || null,
    network: bp.network || "",
  };
}

export async function fetchPlansByCountry(
  countryCode: string
): Promise<Plan[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/plans?country_code=${countryCode}`,
      { next: { revalidate: 300 } } // cache for 5 minutes
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: BackendPlan[] = await res.json();
    if (data.length === 0) throw new Error("No plans returned");
    return data.map(toFrontendPlan);
  } catch {
    // Fallback to hardcoded data
    const key = ISO_TO_KEY[countryCode.toUpperCase()] || countryCode.toLowerCase();
    return plansByCountry[key] || [];
  }
}

export async function fetchPlansForRegion(
  regionSlug: string
): Promise<{ country: CountryInfo; plans: Plan[] }[]> {
  const region = regions.find((r) => r.slug === regionSlug);
  if (!region) return [];

  const results = await Promise.all(
    region.countries.map(async (country) => {
      const isoCode = country.iso;
      const plans = await fetchPlansByCountry(isoCode);
      return { country, plans };
    })
  );

  return results;
}
