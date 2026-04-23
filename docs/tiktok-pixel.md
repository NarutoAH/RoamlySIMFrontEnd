# TikTok Pixel Reference

Raw snippets provided by TikTok, kept here for reference when wiring new
events or debugging existing ones. The working implementation lives in
`src/components/TikTokPixel.tsx` and `src/lib/tiktok.ts`.

## Configuration

- Pixel ID: `D7JO32RC77UCM7NNHITG`
- Env var name: `NEXT_PUBLIC_TIKTOK_PIXEL_ID`
- Set in: local `.env.local`, and Vercel (Production + Development)
- TikTok Events Manager: https://ads.tiktok.com/i18n/events_manager

## Events currently wired

| Event            | Fires on                                                  | Helper                   |
| ---------------- | --------------------------------------------------------- | ------------------------ |
| PageView         | Every route change                                        | auto (ttq.page)          |
| ViewContent      | Each plan card enters the viewport (once per tab)         | `trackViewContent`       |
| AddToCart        | User clicks Buy Now                                       | `trackAddToCart`         |
| InitiateCheckout | Same moment as AddToCart                                  | `trackInitiateCheckout`  |
| PlaceAnOrder     | Same moment as AddToCart                                  | `trackPlaceAnOrder`      |
| Purchase         | `/thanks?plan=<id>&ref=<unique>` loads (deduped per ref)  | `trackPurchase`          |
| identify         | Before Purchase on `/thanks` if `email` in URL            | `identify`               |

Identify hashes email and phone via SHA-256 (Web Crypto API) before sending.

## Admin workflow: the `/thanks` page

The backend has no order database yet, and customers receive their eSIM QR
directly in WhatsApp - they never land on any post-payment page. To give
TikTok the `Purchase` signal it needs to optimize ad campaigns, the admin
sends a thank-you link in the final WhatsApp message. When the customer
taps it, `Purchase` fires from their browser (TikTok cookies from any prior
ad click are still present, so attribution works).

**URL format (preferred - admin-friendly):**
```
https://www.esimconnections.com/thanks?amount=<usd>&ref=<uniqueRef>&name=<planName>&email=<customerEmail>
```

| Param  | Required | Purpose                                                                                 |
| ------ | -------- | --------------------------------------------------------------------------------------- |
| amount | yes      | USD value the customer paid (e.g. `5.46`). Drives the Purchase `value` for optimization. |
| ref    | strongly | Unique per customer/order. Used as `event_id` for dedup. WhatsApp msg timestamp works.  |
| name   | optional | Plan name shown on the page and sent as `content_name` (e.g. `5 GB - 7 Days`).          |
| email  | optional | Calls `identify()` with SHA-256 hash before Purchase. Raises Event Match Quality.       |

**Alternative URL format (if you happen to have the plan UUID):**
```
https://www.esimconnections.com/thanks?plan=<UUID>&ref=<uniqueRef>&email=<email>
```
Plan UUIDs live in `src/data/plans.ts` and look like `019c9954-98a8-711d-9387-24b64b9b2dee`.
Using this form gives a nicer summary card on the page (data, validity shown).
For daily use, the `amount=` form is easier.

**Example WhatsApp message to send after confirming payment:**
```
Here's your eSIM QR code!

[attached: QR image]

To confirm receipt, tap here:
https://www.esimconnections.com/thanks?amount=5.46&name=5+GB+-+7+Days&ref=1713000000-ali&email=ali@example.com

If you need help activating, just reply here.
```

Pick any unique string for `ref` (WhatsApp message timestamp, customer name +
epoch, your invoice number). Same `ref` used twice dedupes to one Purchase.
URL-encode spaces in `name` as `+` or `%20`.

When the backend adds a real order-completion path later, server-side Events
API fires `Purchase` with the same `event_id = purchase_<ref>`, and TikTok
dedupes browser + server into a single Purchase automatically.

---

## 1. Base pixel install code

This is the init snippet from TikTok. The actual implementation injects
this via `next/script` in `TikTokPixel.tsx` so Next.js App Router route
changes trigger `ttq.page()` via `usePathname`/`useSearchParams`.

```html
<!-- TikTok Pixel Code Start -->
<script>
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};


  ttq.load('D7JO32RC77UCM7NNHITG');
  ttq.page();
}(window, document, 'ttq');
</script>
<!-- TikTok Pixel Code End -->
```

---

## 2. Standard event reference (from TikTok)

```js
// add this before event code to all pages where PII data postback is expected and appropriate
ttq.identify({
    "email": "<hashed_email_address>", // string. The email of the customer if available. It must be hashed with SHA-256 on the client side.
    "phone_number": "<hashed_phone_number>", // string. The phone number of the customer if available. It must be hashed with SHA-256 on the client side.
    "external_id": "<hashed_external_id>" // string. Any unique identifier, such as loyalty membership IDs, user IDs, and external cookie IDs.It must be hashed with SHA-256 on the client side.
});

ttq.track('ViewContent', {
    "contents": [
        {
            "content_id": "<content_identifier>", // string. ID of the product. Example: "1077218".
            "content_type": "<content_type>", // string. Either product or product_group.
            "content_name": "<content_name>" // string. The name of the page or product. Example: "shirt".
        }
    ],
    "value": "<content_value>", // number. Value of the order or items sold. Example: 100.
    "currency": "<content_currency>" // string. The 4217 currency code. Example: "USD".
});

ttq.track('AddToWishlist', {
    "contents": [
        {
            "content_id": "<content_identifier>", // string. ID of the product. Example: "1077218".
            "content_type": "<content_type>", // string. Either product or product_group.
            "content_name": "<content_name>" // string. The name of the page or product. Example: "shirt".
        }
    ],
    "value": "<content_value>", // number. Value of the order or items sold. Example: 100.
    "currency": "<content_currency>" // string. The 4217 currency code. Example: "USD".
});

ttq.track('Search', {
    "contents": [
        {
            "content_id": "<content_identifier>", // string. ID of the product. Example: "1077218".
            "content_type": "<content_type>", // string. Either product or product_group.
            "content_name": "<content_name>" // string. The name of the page or product. Example: "shirt".
        }
    ],
    "value": "<content_value>", // number. Value of the order or items sold. Example: 100.
    "currency": "<content_currency>", // string. The 4217 currency code. Example: "USD".
    "search_string": "<search_keywords>" // string. The word or phrase used to search. Example: "SAVE10COUPON".
});

ttq.track('AddPaymentInfo', {
    "contents": [
        {
            "content_id": "<content_identifier>", // string. ID of the product. Example: "1077218".
            "content_type": "<content_type>", // string. Either product or product_group.
            "content_name": "<content_name>" // string. The name of the page or product. Example: "shirt".
        }
    ],
    "value": "<content_value>", // number. Value of the order or items sold. Example: 100.
    "currency": "<content_currency>" // string. The 4217 currency code. Example: "USD".
});

ttq.track('AddToCart', {
    "contents": [
        {
            "content_id": "<content_identifier>", // string. ID of the product. Example: "1077218".
            "content_type": "<content_type>", // string. Either product or product_group.
            "content_name": "<content_name>" // string. The name of the page or product. Example: "shirt".
        }
    ],
    "value": "<content_value>", // number. Value of the order or items sold. Example: 100.
    "currency": "<content_currency>" // string. The 4217 currency code. Example: "USD".
});

ttq.track('InitiateCheckout', {
    "contents": [
        {
            "content_id": "<content_identifier>", // string. ID of the product. Example: "1077218".
            "content_type": "<content_type>", // string. Either product or product_group.
            "content_name": "<content_name>" // string. The name of the page or product. Example: "shirt".
        }
    ],
    "value": "<content_value>", // number. Value of the order or items sold. Example: 100.
    "currency": "<content_currency>" // string. The 4217 currency code. Example: "USD".
});

ttq.track('PlaceAnOrder', {
    "contents": [
        {
            "content_id": "<content_identifier>", // string. ID of the product. Example: "1077218".
            "content_type": "<content_type>", // string. Either product or product_group.
            "content_name": "<content_name>" // string. The name of the page or product. Example: "shirt".
        }
    ],
    "value": "<content_value>", // number. Value of the order or items sold. Example: 100.
    "currency": "<content_currency>" // string. The 4217 currency code. Example: "USD".
});

ttq.track('CompleteRegistration', {
    "contents": [
        {
            "content_id": "<content_identifier>", // string. ID of the product. Example: "1077218".
            "content_type": "<content_type>", // string. Either product or product_group.
            "content_name": "<content_name>" // string. The name of the page or product. Example: "shirt".
        }
    ],
    "value": "<content_value>", // number. Value of the order or items sold. Example: 100.
    "currency": "<content_currency>" // string. The 4217 currency code. Example: "USD".
});

ttq.track('Purchase', {
    "contents": [
        {
            "content_id": "<content_identifier>", // string. ID of the product. Example: "1077218".
            "content_type": "<content_type>", // string. Either product or product_group.
            "content_name": "<content_name>" // string. The name of the page or product. Example: "shirt".
        }
    ],
    "value": "<content_value>", // number. Value of the order or items sold. Example: 100.
    "currency": "<content_currency>" // string. The 4217 currency code. Example: "USD".
});
```

---

## Events NOT currently wired (and why)

| Event                | Why skipped                                                                 |
| -------------------- | --------------------------------------------------------------------------- |
| AddToCart            | No cart in the flow - user selects a plan and goes straight to checkout     |
| AddToWishlist        | No wishlist feature                                                         |
| Search               | No search-box UI; plans are browsed by region pages                         |
| AddPaymentInfo       | Payment happens offline via WhatsApp / bank transfer - no in-app card entry |
| CompleteRegistration | Auth-less design per CLAUDE.md - there is no signup                         |

Add any of these later if the product gains the corresponding feature.
