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

| Event            | Fires on                                   | Helper                   |
| ---------------- | ------------------------------------------ | ------------------------ |
| PageView         | Every route change                         | auto (ttq.page)          |
| ViewContent      | Checkout page mount                        | `trackViewContent`       |
| InitiateCheckout | User clicks "Order via WhatsApp"           | `trackInitiateCheckout`  |
| PlaceAnOrder     | Same moment as InitiateCheckout            | `trackPlaceAnOrder`      |
| Purchase         | Order status becomes `active` (deduped)    | `trackPurchase`          |
| identify         | Before InitiateCheckout and before Purchase| `identify`               |

Identify hashes email and phone via SHA-256 (Web Crypto API) before sending.

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
