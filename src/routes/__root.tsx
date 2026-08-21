import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteNav, SiteFooter } from "../components/site-nav";
import faviconImage from "../assets/03_fallsview.jpg";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Falls View Camp — Mountain Campsite & Farm-to-Table Cafe in Sergio Osmeña" },
      {
        name: "description",
        content:
          "Book rooms, cottages, cabins, and tent pitching at Falls View Camp in Sergio Osmeña, Zamboanga del Norte. Enjoy all-day farm-to-table dining and waterfall views.",
      },
      {
        name: "keywords",
        content:
          "Falls View Camp, Sergio Osmeña, Zamboanga del Norte, camping Philippines, mountain campsite, farm to table cafe, waterfall trekking, cabins rental",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Falls View Camp" },
      { property: "og:title", content: "Falls View Camp — Mountain Campsite & Cafe in Sergio Osmeña" },
      {
        property: "og:description",
        content:
          "Rooms, cottages, cabins, camping grounds, and farm-to-table dining beside mountain waterfalls in Sergio Osmeña.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Falls View Camp — Campsite & Cafe in Sergio Osmeña" },
      {
        name: "twitter:description",
        content:
          "Rooms, cottages, cabins, camping grounds, and farm-to-table dining in Sergio Osmeña, Zamboanga del Norte.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: faviconImage, type: "image/jpeg" },
      { rel: "canonical", href: "https://fallsview-camp-webapp.lovable.app" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Campground", "LodgingBusiness", "Restaurant"],
              "name": "Falls View Camp & Cafe",
              "description":
                "Mountain campsite, rooms, cottages, cabins, and farm-to-table cafe in Sergio Osmeña, Zamboanga del Norte.",
              "url": "https://fallsview-camp-webapp.lovable.app",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Sergio Osmeña",
                "addressRegion": "Zamboanga del Norte",
                "addressCountry": "PH",
              },
              "priceRange": "₱₱",
              "currenciesAccepted": "PHP",
              "paymentAccepted": "Cash, GCash",
              "servesCuisine": "Filipino, Farm-to-Table, Specialty Coffee",
            }),
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <QueryClientProvider client={queryClient}>
      <SiteNav />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <main key={pathname} className="page-enter">
        <Outlet />
      </main>
      <SiteFooter />
    </QueryClientProvider>
  );
}
