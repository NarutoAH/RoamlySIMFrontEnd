// Auto-generated from esimcard.com pricing with 10% markup on cost price
// Prices in USD - convert to PKR using currency.ts

export interface Plan {
  id: string;
  name: string;
  data_gb: number;
  duration_days: number;
  price_usd: number;
  popular: boolean;
  type: "limited" | "unlimited" | "unlimited_plus";
  throttle: string | null;
  network: string;
}

export interface CountryInfo {
  code: string;
  name: string;
  flag: string;
  iso: string;
}

export interface Region {
  code: string;
  name: string;
  flag: string;
  countries: CountryInfo[];
  slug: string;
}

export const countries: Record<string, CountryInfo> = {
  pk: { code: "pk", name: "Pakistan", flag: "🇵🇰", iso: "PK" },
  ksa: { code: "ksa", name: "Saudi Arabia", flag: "🇸🇦", iso: "SA" },
  uae: { code: "uae", name: "UAE", flag: "🇦🇪", iso: "AE" },
  de: { code: "de", name: "Germany", flag: "🇩🇪", iso: "DE" },
  es: { code: "es", name: "Spain", flag: "🇪🇸", iso: "ES" },
};

export const regions: Region[] = [
  { code: "pakistan", name: "Pakistan", flag: "🇵🇰", countries: [countries.pk], slug: "pakistan" },
  { code: "middle-east", name: "Middle East", flag: "🌍", countries: [countries.ksa, countries.uae], slug: "middle-east" },
  { code: "europe", name: "Europe", flag: "🇪🇺", countries: [countries.de, countries.es], slug: "europe" },
];

// Pakistan - 31 plans
export const plans_pk: Plan[] = [
  { id: "019c9954-9696-708a-b6bd-faa720306616", name: "1 GB — 3 Days", data_gb: 1, duration_days: 3, price_usd: 1.47, popular: false, type: "limited", throttle: null, network: "Jazz" },
  { id: "019c9954-96bc-73ee-af9d-dec91da100fd", name: "3 GB — 3 Days", data_gb: 3, duration_days: 3, price_usd: 3.69, popular: false, type: "limited", throttle: null, network: "Jazz" },
  { id: "019c9954-9758-729c-a1b3-a1bab6e0cbb6", name: "3 GB — 7 Days", data_gb: 3, duration_days: 7, price_usd: 3.78, popular: false, type: "limited", throttle: null, network: "Jazz" },
  { id: "019c9954-97e4-7360-95fa-bdf3fe9a4bf1", name: "5 GB — 7 Days", data_gb: 5, duration_days: 7, price_usd: 5.72, popular: true, type: "limited", throttle: null, network: "Jazz" },
  { id: "019c9954-987f-71fc-9322-34adf377ca49", name: "10 GB — 7 Days", data_gb: 10, duration_days: 7, price_usd: 10.11, popular: false, type: "limited", throttle: null, network: "Jazz" },
  { id: "019c9954-9819-73b3-a9a4-051e5765887c", name: "5 GB — 15 Days", data_gb: 5, duration_days: 15, price_usd: 5.87, popular: false, type: "limited", throttle: null, network: "Jazz" },
  { id: "019c9954-98a8-711d-9387-24b64b9b2dee", name: "10 GB — 15 Days", data_gb: 10, duration_days: 15, price_usd: 10.66, popular: true, type: "limited", throttle: null, network: "Jazz" },
  { id: "019c9954-9905-73dc-9f84-8426ec8b6849", name: "20 GB — 15 Days", data_gb: 20, duration_days: 15, price_usd: 18.24, popular: false, type: "limited", throttle: null, network: "Jazz" },
  { id: "019c9954-9792-73af-8d52-e92842c21c5e", name: "3 GB — 30 Days", data_gb: 3, duration_days: 30, price_usd: 3.91, popular: false, type: "limited", throttle: null, network: "Jazz" },
  { id: "019c9954-984d-72e7-a83a-86414834d35b", name: "5 GB — 30 Days", data_gb: 5, duration_days: 30, price_usd: 6.15, popular: false, type: "limited", throttle: null, network: "Jazz" },
  { id: "019c9954-98d0-7363-88cd-445412144077", name: "10 GB — 30 Days", data_gb: 10, duration_days: 30, price_usd: 11.21, popular: false, type: "limited", throttle: null, network: "Jazz" },
  { id: "019c9954-9942-7053-a7ad-53ee257b4cd9", name: "20 GB — 30 Days", data_gb: 20, duration_days: 30, price_usd: 19.56, popular: true, type: "limited", throttle: null, network: "Jazz" },
  { id: "019c9954-9970-7301-aaba-c2a7f1a2664e", name: "50 GB — 30 Days", data_gb: 50, duration_days: 30, price_usd: 42.53, popular: false, type: "limited", throttle: null, network: "Jazz" },
  { id: "019c9954-99e8-71bc-a74e-70aba33ceda1", name: "100 GB — 30 Days", data_gb: 100, duration_days: 30, price_usd: 77.14, popular: false, type: "limited", throttle: null, network: "Jazz" },
  { id: "019c9954-99a5-73e8-afbc-74e315f21462", name: "50 GB — 90 Days", data_gb: 50, duration_days: 90, price_usd: 49.68, popular: false, type: "limited", throttle: null, network: "Jazz" },
  { id: "019c9958-c7f7-70a7-9e21-92e4a95b89e9", name: "Unlimited — 1 Day", data_gb: -1, duration_days: 1, price_usd: 1.98, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Jazz" },
  { id: "019c9958-c82e-713a-a654-d9a417b6fdfd", name: "Unlimited — 3 Days", data_gb: -1, duration_days: 3, price_usd: 4.92, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Jazz" },
  { id: "019c9958-c86c-71da-a623-3841141eac70", name: "Unlimited — 5 Days", data_gb: -1, duration_days: 5, price_usd: 7.8, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Jazz" },
  { id: "019c9958-c8ae-7230-9fdd-4c430b7ec338", name: "Unlimited — 7 Days", data_gb: -1, duration_days: 7, price_usd: 10.49, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Jazz" },
  { id: "019c9958-c8e1-7047-9597-92444287872f", name: "Unlimited — 10 Days", data_gb: -1, duration_days: 10, price_usd: 14.22, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Jazz" },
  { id: "019c9958-c908-720d-82dd-3850e8e2de35", name: "Unlimited — 15 Days", data_gb: -1, duration_days: 15, price_usd: 18.24, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Jazz" },
  { id: "019c9958-c93b-7178-880c-8049ddfff28d", name: "Unlimited — 20 Days", data_gb: -1, duration_days: 20, price_usd: 23.35, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Jazz" },
  { id: "019c9958-c963-735b-a7c0-21fa02e15405", name: "Unlimited — 30 Days", data_gb: -1, duration_days: 30, price_usd: 31.87, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Jazz" },
  { id: "019c9958-c993-7061-be6d-8b208b586f0f", name: "Unlimited Plus — 1 Day", data_gb: -2, duration_days: 1, price_usd: 3.63, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Jazz" },
  { id: "019c9958-c9ce-720a-978a-7a0799d048e9", name: "Unlimited Plus — 3 Days", data_gb: -2, duration_days: 3, price_usd: 9.62, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Jazz" },
  { id: "019c9958-ca0b-7394-a519-24e83428f4ab", name: "Unlimited Plus — 5 Days", data_gb: -2, duration_days: 5, price_usd: 15.39, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Jazz" },
  { id: "019c9958-ca44-701e-9c70-ff5110d302b6", name: "Unlimited Plus — 7 Days", data_gb: -2, duration_days: 7, price_usd: 20.76, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Jazz" },
  { id: "019c9958-ca7c-7332-aaf3-91d7e42ebb23", name: "Unlimited Plus — 10 Days", data_gb: -2, duration_days: 10, price_usd: 28.24, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Jazz" },
  { id: "019c9958-caad-73c8-91fd-15bc6ddaf5b0", name: "Unlimited Plus — 15 Days", data_gb: -2, duration_days: 15, price_usd: 36.27, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Jazz" },
  { id: "019c9958-cad4-739b-9fa0-1fc8c2886597", name: "Unlimited Plus — 20 Days", data_gb: -2, duration_days: 20, price_usd: 43.08, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Jazz" },
  { id: "019c9958-cafd-70a5-afcf-3599c9ba2658", name: "Unlimited Plus — 30 Days", data_gb: -2, duration_days: 30, price_usd: 63.51, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Jazz" },
];

// Saudi Arabia - 31 plans
export const plans_ksa: Plan[] = [
  { id: "019c9954-d95e-730e-a791-1c4c08725eb0", name: "1 GB — 3 Days", data_gb: 1, duration_days: 3, price_usd: 2.33, popular: false, type: "limited", throttle: null, network: "Zain" },
  { id: "019c9954-d999-7129-b740-4e70a9871f5a", name: "3 GB — 3 Days", data_gb: 3, duration_days: 3, price_usd: 5.98, popular: false, type: "limited", throttle: null, network: "Zain" },
  { id: "019c9954-d9d9-70d5-a050-ffe8efabcc3e", name: "3 GB — 7 Days", data_gb: 3, duration_days: 7, price_usd: 6.15, popular: false, type: "limited", throttle: null, network: "Zain" },
  { id: "019c9954-da3b-7188-8937-1acf093c776d", name: "5 GB — 7 Days", data_gb: 5, duration_days: 7, price_usd: 9.38, popular: true, type: "limited", throttle: null, network: "Zain" },
  { id: "019c9954-daec-7079-8b38-92f4f3f657b2", name: "10 GB — 7 Days", data_gb: 10, duration_days: 7, price_usd: 16.71, popular: false, type: "limited", throttle: null, network: "Zain" },
  { id: "019c9954-da7e-700e-a2d3-7c932333570b", name: "5 GB — 15 Days", data_gb: 5, duration_days: 15, price_usd: 9.65, popular: false, type: "limited", throttle: null, network: "Zain" },
  { id: "019c9954-db1a-7199-acc1-dc78e488d06f", name: "10 GB — 15 Days", data_gb: 10, duration_days: 15, price_usd: 17.62, popular: true, type: "limited", throttle: null, network: "Zain" },
  { id: "019c9954-db7f-7158-b775-5c6c2af0ca34", name: "20 GB — 15 Days", data_gb: 20, duration_days: 15, price_usd: 30.26, popular: false, type: "limited", throttle: null, network: "Zain" },
  { id: "019c9954-da0c-73d9-9a20-a9496fb3057d", name: "3 GB — 30 Days", data_gb: 3, duration_days: 30, price_usd: 6.37, popular: false, type: "limited", throttle: null, network: "Zain" },
  { id: "019c9954-dabc-734c-9eaf-3e253fe89f77", name: "5 GB — 30 Days", data_gb: 5, duration_days: 30, price_usd: 10.11, popular: false, type: "limited", throttle: null, network: "Zain" },
  { id: "019c9954-db5b-7185-8fef-454b36bbe90f", name: "10 GB — 30 Days", data_gb: 10, duration_days: 30, price_usd: 18.54, popular: false, type: "limited", throttle: null, network: "Zain" },
  { id: "019c9954-dbb2-714b-817c-0e6335c4fb00", name: "20 GB — 30 Days", data_gb: 20, duration_days: 30, price_usd: 32.45, popular: true, type: "limited", throttle: null, network: "Zain" },
  { id: "019c9954-dbec-71ae-b42a-4927517c4295", name: "50 GB — 30 Days", data_gb: 50, duration_days: 30, price_usd: 70.73, popular: false, type: "limited", throttle: null, network: "Zain" },
  { id: "019c9954-dc3c-707f-ba0c-300584b53753", name: "100 GB — 30 Days", data_gb: 100, duration_days: 30, price_usd: 128.43, popular: false, type: "limited", throttle: null, network: "Zain" },
  { id: "019c9954-dc1b-73d7-8e6c-12d517ea1192", name: "50 GB — 90 Days", data_gb: 50, duration_days: 90, price_usd: 82.64, popular: false, type: "limited", throttle: null, network: "Zain" },
  { id: "019c9958-fa5a-71d1-bbb7-f3e6b40f3289", name: "Unlimited — 1 Day", data_gb: -1, duration_days: 1, price_usd: 3.15, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Zain" },
  { id: "019c9958-fa87-73c0-8b38-662fea7c2711", name: "Unlimited — 3 Days", data_gb: -1, duration_days: 3, price_usd: 8.05, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Zain" },
  { id: "019c9958-fab2-7188-a612-10d13c30ad14", name: "Unlimited — 5 Days", data_gb: -1, duration_days: 5, price_usd: 12.86, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Zain" },
  { id: "019c9958-faec-70d2-8e41-6c18b0ba0739", name: "Unlimited — 7 Days", data_gb: -1, duration_days: 7, price_usd: 17.34, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Zain" },
  { id: "019c9958-fb16-7081-b175-8390f3c4bc8c", name: "Unlimited — 10 Days", data_gb: -1, duration_days: 10, price_usd: 23.56, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Zain" },
  { id: "019c9958-fb52-72ed-919d-931e2226d322", name: "Unlimited — 15 Days", data_gb: -1, duration_days: 15, price_usd: 30.26, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Zain" },
  { id: "019c9958-fb8e-722e-b6b2-a02a014ce641", name: "Unlimited — 20 Days", data_gb: -1, duration_days: 20, price_usd: 38.79, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Zain" },
  { id: "019c9958-fbc3-732d-a69e-190f803828a1", name: "Unlimited — 30 Days", data_gb: -1, duration_days: 30, price_usd: 52.97, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Zain" },
  { id: "019c9958-fbfc-737d-a2ba-350e9662ff39", name: "Unlimited Plus — 1 Day", data_gb: -2, duration_days: 1, price_usd: 5.9, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Zain" },
  { id: "019c9958-fc24-7126-8b89-aff252a04392", name: "Unlimited Plus — 3 Days", data_gb: -2, duration_days: 3, price_usd: 15.87, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Zain" },
  { id: "019c9958-fc57-735b-8842-680c107476bf", name: "Unlimited Plus — 5 Days", data_gb: -2, duration_days: 5, price_usd: 25.5, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Zain" },
  { id: "019c9958-fc9f-7257-8786-b75acc25a13c", name: "Unlimited Plus — 7 Days", data_gb: -2, duration_days: 7, price_usd: 34.45, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Zain" },
  { id: "019c9958-fce2-71f7-9b62-834129b3553a", name: "Unlimited Plus — 10 Days", data_gb: -2, duration_days: 10, price_usd: 46.93, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Zain" },
  { id: "019c9958-fd16-7169-9415-9f2b952b2c54", name: "Unlimited Plus — 15 Days", data_gb: -2, duration_days: 15, price_usd: 60.29, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Zain" },
  { id: "019c9958-fd4f-72b1-ac85-39ca8c881105", name: "Unlimited Plus — 20 Days", data_gb: -2, duration_days: 20, price_usd: 71.65, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Zain" },
  { id: "019c9958-fd7f-737a-b3a6-fc0ac8e37bce", name: "Unlimited Plus — 30 Days", data_gb: -2, duration_days: 30, price_usd: 105.71, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Zain" },
];

// UAE - 28 plans
export const plans_uae: Plan[] = [
  { id: "019c9955-286a-71b4-b3ae-e22a6a604ab5", name: "1 GB — 3 Days", data_gb: 1, duration_days: 3, price_usd: 2.75, popular: false, type: "limited", throttle: null, network: "du" },
  { id: "019c9955-289a-7079-a0a4-5a355d4e6223", name: "3 GB — 3 Days", data_gb: 3, duration_days: 3, price_usd: 7.14, popular: false, type: "limited", throttle: null, network: "du" },
  { id: "019c9955-28cb-7140-9a3c-28ba116e545d", name: "3 GB — 7 Days", data_gb: 3, duration_days: 7, price_usd: 7.34, popular: false, type: "limited", throttle: null, network: "du" },
  { id: "019c9955-292c-70ba-a9e6-beac10c49f6f", name: "5 GB — 7 Days", data_gb: 5, duration_days: 7, price_usd: 11.21, popular: true, type: "limited", throttle: null, network: "du" },
  { id: "019c9955-29d2-720f-946e-8b960e5f05bf", name: "10 GB — 7 Days", data_gb: 10, duration_days: 7, price_usd: 20.0, popular: false, type: "limited", throttle: null, network: "du" },
  { id: "019c9955-2967-7084-8903-41a84082d50b", name: "5 GB — 15 Days", data_gb: 5, duration_days: 15, price_usd: 11.54, popular: false, type: "limited", throttle: null, network: "du" },
  { id: "019c9955-29f5-7299-8dc4-559cb7b16ba6", name: "10 GB — 15 Days", data_gb: 10, duration_days: 15, price_usd: 21.1, popular: true, type: "limited", throttle: null, network: "du" },
  { id: "019c9955-2a6c-7345-acb5-1a9edee5da41", name: "20 GB — 15 Days", data_gb: 20, duration_days: 15, price_usd: 36.27, popular: false, type: "limited", throttle: null, network: "du" },
  { id: "019c9955-28fe-7028-8ebd-803efd13abf8", name: "3 GB — 30 Days", data_gb: 3, duration_days: 30, price_usd: 7.61, popular: false, type: "limited", throttle: null, network: "du" },
  { id: "019c9955-299d-7149-9978-95c92d2e49c0", name: "5 GB — 30 Days", data_gb: 5, duration_days: 30, price_usd: 12.09, popular: false, type: "limited", throttle: null, network: "du" },
  { id: "019c9955-2a39-705e-b478-81d282ded59f", name: "10 GB — 30 Days", data_gb: 10, duration_days: 30, price_usd: 22.2, popular: false, type: "limited", throttle: null, network: "du" },
  { id: "019c9955-2a99-72d1-9432-c1f2f12e188a", name: "20 GB — 30 Days", data_gb: 20, duration_days: 30, price_usd: 38.9, popular: true, type: "limited", throttle: null, network: "du" },
  { id: "019c9957-01b8-737d-a104-3bbc7f9fda6b", name: "Unlimited — 1 Day", data_gb: -1, duration_days: 1, price_usd: 3.74, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "du" },
  { id: "019c9957-01e6-7191-9c9c-18af7ed91ef9", name: "Unlimited — 3 Days", data_gb: -1, duration_days: 3, price_usd: 9.62, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "du" },
  { id: "019c9957-0208-70d5-8099-a2265846ed87", name: "Unlimited — 5 Days", data_gb: -1, duration_days: 5, price_usd: 15.39, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "du" },
  { id: "019c9957-0230-71ac-b16f-5f739e173727", name: "Unlimited — 7 Days", data_gb: -1, duration_days: 7, price_usd: 20.76, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "du" },
  { id: "019c9957-025d-7112-8e15-ee04ac5af7da", name: "Unlimited — 10 Days", data_gb: -1, duration_days: 10, price_usd: 28.24, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "du" },
  { id: "019c9957-0285-704a-bcce-baf38fc8e145", name: "Unlimited — 15 Days", data_gb: -1, duration_days: 15, price_usd: 36.27, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "du" },
  { id: "019c9957-02bc-7201-8922-c61b32e06cb3", name: "Unlimited — 20 Days", data_gb: -1, duration_days: 20, price_usd: 46.51, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "du" },
  { id: "019c9957-02f6-7011-8b43-9d06550d09d4", name: "Unlimited — 30 Days", data_gb: -1, duration_days: 30, price_usd: 63.51, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "du" },
  { id: "019c9957-031a-7149-9b2b-d00c4de81d37", name: "Unlimited Plus — 1 Day", data_gb: -2, duration_days: 1, price_usd: 7.03, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "du" },
  { id: "019c9957-0355-7201-a558-50600e5c067e", name: "Unlimited Plus — 3 Days", data_gb: -2, duration_days: 3, price_usd: 19.01, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "du" },
  { id: "019c9957-0394-719b-892a-5a6915b9bf92", name: "Unlimited Plus — 5 Days", data_gb: -2, duration_days: 5, price_usd: 30.55, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "du" },
  { id: "019c9957-03c8-7032-a821-aaf63ead3986", name: "Unlimited Plus — 7 Days", data_gb: -2, duration_days: 7, price_usd: 41.29, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "du" },
  { id: "019c9957-0407-724a-a216-6f8acc42f2e3", name: "Unlimited Plus — 10 Days", data_gb: -2, duration_days: 10, price_usd: 56.27, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "du" },
  { id: "019c9957-042d-73e7-8acb-3e1404a06c59", name: "Unlimited Plus — 15 Days", data_gb: -2, duration_days: 15, price_usd: 72.3, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "du" },
  { id: "019c9957-0478-7079-9c55-5cfd38a187bb", name: "Unlimited Plus — 20 Days", data_gb: -2, duration_days: 20, price_usd: 85.93, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "du" },
  { id: "019c9957-04d0-7194-8478-fa9441175c2f", name: "Unlimited Plus — 30 Days", data_gb: -2, duration_days: 30, price_usd: 126.81, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "du" },
];

// Germany - 31 plans
export const plans_de: Plan[] = [
  { id: "019c9953-e47c-7070-ab7c-1b49395ad425", name: "1 GB — 3 Days", data_gb: 1, duration_days: 3, price_usd: 0.91, popular: false, type: "limited", throttle: null, network: "Vodafone Germany" },
  { id: "019c9953-e4c3-70db-ab90-96765dc62724", name: "3 GB — 3 Days", data_gb: 3, duration_days: 3, price_usd: 2.13, popular: false, type: "limited", throttle: null, network: "Vodafone Germany" },
  { id: "019c9953-e4ef-73f6-8ada-99816277ebb6", name: "3 GB — 7 Days", data_gb: 3, duration_days: 7, price_usd: 2.2, popular: false, type: "limited", throttle: null, network: "Vodafone Germany" },
  { id: "019c9953-e537-73c2-8cb7-52a4eb8183f9", name: "5 GB — 7 Days", data_gb: 5, duration_days: 7, price_usd: 3.28, popular: true, type: "limited", throttle: null, network: "Vodafone Germany" },
  { id: "019c9953-e5b6-7130-9bca-8a6029502ca9", name: "10 GB — 7 Days", data_gb: 10, duration_days: 7, price_usd: 5.72, popular: false, type: "limited", throttle: null, network: "Vodafone Germany" },
  { id: "019c9953-e562-705b-94b8-4bee9e16542a", name: "5 GB — 15 Days", data_gb: 5, duration_days: 15, price_usd: 3.37, popular: false, type: "limited", throttle: null, network: "Vodafone Germany" },
  { id: "019c9953-e5e8-7345-afeb-b76888c64a3a", name: "10 GB — 15 Days", data_gb: 10, duration_days: 15, price_usd: 6.02, popular: true, type: "limited", throttle: null, network: "Vodafone Germany" },
  { id: "019c9953-e638-7063-81b5-5f4d7728cb8e", name: "20 GB — 15 Days", data_gb: 20, duration_days: 15, price_usd: 10.23, popular: false, type: "limited", throttle: null, network: "Vodafone Germany" },
  { id: "019c9953-e514-7128-b774-912626a7d449", name: "3 GB — 30 Days", data_gb: 3, duration_days: 30, price_usd: 2.27, popular: false, type: "limited", throttle: null, network: "Vodafone Germany" },
  { id: "019c9953-e58b-70bb-ab88-bb93873b5c30", name: "5 GB — 30 Days", data_gb: 5, duration_days: 30, price_usd: 3.52, popular: false, type: "limited", throttle: null, network: "Vodafone Germany" },
  { id: "019c9953-e60b-707a-adac-9e8b247e273f", name: "10 GB — 30 Days", data_gb: 10, duration_days: 30, price_usd: 6.33, popular: false, type: "limited", throttle: null, network: "Vodafone Germany" },
  { id: "019c9953-e678-7203-a4d1-d8f5dbbfc148", name: "20 GB — 30 Days", data_gb: 20, duration_days: 30, price_usd: 10.97, popular: true, type: "limited", throttle: null, network: "Vodafone Germany" },
  { id: "019c9953-e6b6-7363-915d-f7fd2675507d", name: "50 GB — 30 Days", data_gb: 50, duration_days: 30, price_usd: 23.73, popular: false, type: "limited", throttle: null, network: "Vodafone Germany" },
  { id: "019c9953-e721-733a-9fa3-a7dd56706289", name: "100 GB — 30 Days", data_gb: 100, duration_days: 30, price_usd: 42.95, popular: false, type: "limited", throttle: null, network: "Vodafone Germany" },
  { id: "019c9953-e6f7-703b-9923-df5b98f83ef6", name: "50 GB — 90 Days", data_gb: 50, duration_days: 90, price_usd: 27.7, popular: false, type: "limited", throttle: null, network: "Vodafone Germany" },
  { id: "019c9957-8c2b-7324-81cf-7c9e50e14135", name: "Unlimited — 1 Day", data_gb: -1, duration_days: 1, price_usd: 1.2, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Vodafone Germany" },
  { id: "019c9957-8c61-723f-bef3-198010da8ee2", name: "Unlimited — 3 Days", data_gb: -1, duration_days: 3, price_usd: 2.84, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Vodafone Germany" },
  { id: "019c9957-8c91-7255-afbc-50641d74a64c", name: "Unlimited — 5 Days", data_gb: -1, duration_days: 5, price_usd: 4.43, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Vodafone Germany" },
  { id: "019c9957-8cbb-7236-999b-395f30675507", name: "Unlimited — 7 Days", data_gb: -1, duration_days: 7, price_usd: 5.92, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Vodafone Germany" },
  { id: "019c9957-8d00-7247-b824-851708a990cc", name: "Unlimited — 10 Days", data_gb: -1, duration_days: 10, price_usd: 8.01, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Vodafone Germany" },
  { id: "019c9957-8d37-7356-b75b-1513516547fc", name: "Unlimited — 15 Days", data_gb: -1, duration_days: 15, price_usd: 10.23, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Vodafone Germany" },
  { id: "019c9957-8d66-7205-85b5-6d89dc9c5fc9", name: "Unlimited — 20 Days", data_gb: -1, duration_days: 20, price_usd: 13.08, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Vodafone Germany" },
  { id: "019c9957-8d9b-7289-8786-29b4a5fbebd8", name: "Unlimited — 30 Days", data_gb: -1, duration_days: 30, price_usd: 17.8, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Vodafone Germany" },
  { id: "019c9957-8dc9-7113-8ae6-463b3c30749b", name: "Unlimited Plus — 1 Day", data_gb: -2, duration_days: 1, price_usd: 2.11, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Vodafone Germany" },
  { id: "019c9957-8df3-7363-8de4-e0cb37cf9779", name: "Unlimited Plus — 3 Days", data_gb: -2, duration_days: 3, price_usd: 5.45, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Vodafone Germany" },
  { id: "019c9957-8e24-739b-b530-4f4c8cf08930", name: "Unlimited Plus — 5 Days", data_gb: -2, duration_days: 5, price_usd: 8.65, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Vodafone Germany" },
  { id: "019c9957-8e4c-739e-925e-5b5c5af10dff", name: "Unlimited Plus — 7 Days", data_gb: -2, duration_days: 7, price_usd: 11.64, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Vodafone Germany" },
  { id: "019c9957-8e7d-733e-8337-3a46cd996776", name: "Unlimited Plus — 10 Days", data_gb: -2, duration_days: 10, price_usd: 15.79, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Vodafone Germany" },
  { id: "019c9957-8ea9-7261-923c-daa5080d5699", name: "Unlimited Plus — 15 Days", data_gb: -2, duration_days: 15, price_usd: 20.24, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Vodafone Germany" },
  { id: "019c9957-8ee9-7023-aff6-064b3e60ed9b", name: "Unlimited Plus — 20 Days", data_gb: -2, duration_days: 20, price_usd: 24.04, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Vodafone Germany" },
  { id: "019c9957-8f36-730d-ba8f-f1375ca51fa4", name: "Unlimited Plus — 30 Days", data_gb: -2, duration_days: 30, price_usd: 35.39, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Vodafone Germany" },
];

// Spain - 31 plans
export const plans_es: Plan[] = [
  { id: "019c9953-e9c5-7198-a680-5d6b48be0bd5", name: "1 GB — 3 Days", data_gb: 1, duration_days: 3, price_usd: 0.91, popular: false, type: "limited", throttle: null, network: "Vodafone Spain" },
  { id: "019c9953-e9e7-7063-8b7d-6160c0795dc7", name: "3 GB — 3 Days", data_gb: 3, duration_days: 3, price_usd: 2.13, popular: false, type: "limited", throttle: null, network: "Vodafone Spain" },
  { id: "019c9953-ea0b-7018-b526-3b1561ebaf9c", name: "3 GB — 7 Days", data_gb: 3, duration_days: 7, price_usd: 2.2, popular: false, type: "limited", throttle: null, network: "Vodafone Spain" },
  { id: "019c9953-ea6a-72f3-a858-ddd84f6c9cc4", name: "5 GB — 7 Days", data_gb: 5, duration_days: 7, price_usd: 3.28, popular: true, type: "limited", throttle: null, network: "Vodafone Spain" },
  { id: "019c9953-eb1b-73d3-a740-a19ac580728b", name: "10 GB — 7 Days", data_gb: 10, duration_days: 7, price_usd: 5.72, popular: false, type: "limited", throttle: null, network: "Vodafone Spain" },
  { id: "019c9953-eaaf-7092-af3a-f6d086cbc472", name: "5 GB — 15 Days", data_gb: 5, duration_days: 15, price_usd: 3.37, popular: false, type: "limited", throttle: null, network: "Vodafone Spain" },
  { id: "019c9953-eb47-703b-9688-853523ca430c", name: "10 GB — 15 Days", data_gb: 10, duration_days: 15, price_usd: 6.02, popular: true, type: "limited", throttle: null, network: "Vodafone Spain" },
  { id: "019c9953-eb9d-70f2-8dfb-d04fc1fa931d", name: "20 GB — 15 Days", data_gb: 20, duration_days: 15, price_usd: 10.23, popular: false, type: "limited", throttle: null, network: "Vodafone Spain" },
  { id: "019c9953-ea40-71f5-bc66-326f9e13d253", name: "3 GB — 30 Days", data_gb: 3, duration_days: 30, price_usd: 2.27, popular: false, type: "limited", throttle: null, network: "Vodafone Spain" },
  { id: "019c9953-eae0-72e5-9b0d-62e97429bd28", name: "5 GB — 30 Days", data_gb: 5, duration_days: 30, price_usd: 3.52, popular: false, type: "limited", throttle: null, network: "Vodafone Spain" },
  { id: "019c9953-eb6b-7315-aa3b-e5bc2fe62bef", name: "10 GB — 30 Days", data_gb: 10, duration_days: 30, price_usd: 6.33, popular: false, type: "limited", throttle: null, network: "Vodafone Spain" },
  { id: "019c9953-ebd7-7128-be27-f11376b51a36", name: "20 GB — 30 Days", data_gb: 20, duration_days: 30, price_usd: 10.97, popular: true, type: "limited", throttle: null, network: "Vodafone Spain" },
  { id: "019c9953-ec0f-726c-b60d-dd3aad7c2cc2", name: "50 GB — 30 Days", data_gb: 50, duration_days: 30, price_usd: 23.73, popular: false, type: "limited", throttle: null, network: "Vodafone Spain" },
  { id: "019c9953-ec76-72f0-8366-b87d87d091a9", name: "100 GB — 30 Days", data_gb: 100, duration_days: 30, price_usd: 42.95, popular: false, type: "limited", throttle: null, network: "Vodafone Spain" },
  { id: "019c9953-ec43-73cd-a274-1b607a14a2ab", name: "50 GB — 90 Days", data_gb: 50, duration_days: 90, price_usd: 27.7, popular: false, type: "limited", throttle: null, network: "Vodafone Spain" },
  { id: "019c9957-a44a-7037-848f-fa7150ce1962", name: "Unlimited — 1 Day", data_gb: -1, duration_days: 1, price_usd: 1.2, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Vodafone Spain" },
  { id: "019c9957-a473-7325-80a3-e704ffb31ca0", name: "Unlimited — 3 Days", data_gb: -1, duration_days: 3, price_usd: 2.84, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Vodafone Spain" },
  { id: "019c9957-a499-72ba-adfe-70956d6ce738", name: "Unlimited — 5 Days", data_gb: -1, duration_days: 5, price_usd: 4.43, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Vodafone Spain" },
  { id: "019c9957-a4e8-7212-b682-ea1bd326660e", name: "Unlimited — 7 Days", data_gb: -1, duration_days: 7, price_usd: 5.92, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Vodafone Spain" },
  { id: "019c9957-a546-71b0-8685-ffc5b67ccdcd", name: "Unlimited — 10 Days", data_gb: -1, duration_days: 10, price_usd: 8.01, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Vodafone Spain" },
  { id: "019c9957-a580-7320-b85d-f40038715dce", name: "Unlimited — 15 Days", data_gb: -1, duration_days: 15, price_usd: 10.23, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Vodafone Spain" },
  { id: "019c9957-a5af-721b-845d-2a1b2cf8746a", name: "Unlimited — 20 Days", data_gb: -1, duration_days: 20, price_usd: 13.08, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Vodafone Spain" },
  { id: "019c9957-a5d3-70a8-9c44-9dd29e84df8a", name: "Unlimited — 30 Days", data_gb: -1, duration_days: 30, price_usd: 17.8, popular: false, type: "unlimited", throttle: "512kbps after 1GB", network: "Vodafone Spain" },
  { id: "019c9957-a607-73d6-bd8f-7d47c5f487ea", name: "Unlimited Plus — 1 Day", data_gb: -2, duration_days: 1, price_usd: 2.11, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Vodafone Spain" },
  { id: "019c9957-a63f-71e9-b5ac-7bc7bf41c4ab", name: "Unlimited Plus — 3 Days", data_gb: -2, duration_days: 3, price_usd: 5.45, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Vodafone Spain" },
  { id: "019c9957-a661-71b7-b87d-96fc4c0fbc35", name: "Unlimited Plus — 5 Days", data_gb: -2, duration_days: 5, price_usd: 8.65, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Vodafone Spain" },
  { id: "019c9957-a6a3-7185-ad70-c647fb39fd3a", name: "Unlimited Plus — 7 Days", data_gb: -2, duration_days: 7, price_usd: 11.64, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Vodafone Spain" },
  { id: "019c9957-a6cb-7037-892a-a3c10ac12e6d", name: "Unlimited Plus — 10 Days", data_gb: -2, duration_days: 10, price_usd: 15.79, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Vodafone Spain" },
  { id: "019c9957-a70a-7075-bfa0-417c2174e6bc", name: "Unlimited Plus — 15 Days", data_gb: -2, duration_days: 15, price_usd: 20.24, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Vodafone Spain" },
  { id: "019c9957-a73b-7121-aab2-46566ad0ded9", name: "Unlimited Plus — 20 Days", data_gb: -2, duration_days: 20, price_usd: 24.04, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Vodafone Spain" },
  { id: "019c9957-a75d-7283-95fa-dc07d1380d02", name: "Unlimited Plus — 30 Days", data_gb: -2, duration_days: 30, price_usd: 35.39, popular: false, type: "unlimited_plus", throttle: "2mbps after 2GB", network: "Vodafone Spain" },
];

export const plansByCountry: Record<string, Plan[]> = {
  pk: plans_pk,
  ksa: plans_ksa,
  uae: plans_uae,
  de: plans_de,
  es: plans_es,
};

export function getPlansForRegion(regionSlug: string): { country: CountryInfo; plans: Plan[] }[] {
  const region = regions.find((r) => r.slug === regionSlug);
  if (!region) return [];
  return region.countries.map((c) => ({ country: c, plans: plansByCountry[c.code] || [] }));
}
