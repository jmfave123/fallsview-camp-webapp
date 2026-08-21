import { createFileRoute, Link } from "@tanstack/react-router";
import { Coffee, Footprints, Tent } from "lucide-react";

import heroFalls from "@/assets/fallsview_intro.jpg";
import cafeHero from "@/assets/cafe/main-cafe-hero.jpg";
import bonfire from "@/assets/explore/bonfire.jpg";
import misty from "@/assets/explore/misty.jpg";
import mountainLandscape from "@/assets/explore/mountain-landscape.jpg";
import sunsetCamping from "@/assets/explore/sunset-camping.jpg";
import viewDeck from "@/assets/explore/view-deck.jpg";
import walkingPath from "@/assets/explore/walking-path.jpg";
import { Accommodations } from "./accommodations";
import { Cafe } from "./cafe";
import { Contact } from "./contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Falls View Camp — Rooms, Camping & Cafe" },
      {
        name: "description",
        content:
          "Rooms, cabins, cottages, camping, and a cafe at Falls View Camp in Sergio Osmeña.",
      },
      { property: "og:title", content: "Falls View Camp — Camp above the falls" },
      {
        property: "og:description",
        content:
          "Accommodation, camping, cafe, mountain views, and contact information for Falls View Camp.",
      },
    ],
  }),
  component: Home,
});

const DELAYS = ["delay-1", "delay-2", "delay-3", "delay-4"] as const;

const highlights = [
  {
    icon: Tent,
    title: "Accommodation",
    body: "Family House, rooms, casitas, cabins, cottage day use, and camping options.",
  },
  {
    icon: Coffee,
    title: "Cafe menu",
    body: "Coffee, iced drinks, non-coffee drinks, soft drinks, and alcoholic drinks.",
  },
  {
    icon: Footprints,
    title: "Camp grounds",
    body: "Mountain views, walking paths, camping areas, view decks, and bonfire spaces.",
  },
];

const exploreGallery = [
  { image: viewDeck, className: "sm:col-span-2", size: "landscape", alt: "Wooden view deck overlooking mountain ridges at Falls View Camp Sergio Osmeña" },
  { image: misty, className: "", size: "portrait", alt: "Misty morning fog rolling over the forested mountains near Falls View Camp" },
  { image: mountainLandscape, className: "", size: "landscape", alt: "Panoramic mountain landscape and green valleys seen from Falls View Camp" },
  { image: walkingPath, className: "", size: "portrait", alt: "Tree-lined walking path through the Falls View Camp grounds" },
  { image: sunsetCamping, className: "", size: "portrait", alt: "Golden sunset over camping tents at Falls View Camp mountain campsite" },
  { image: bonfire, className: "sm:col-span-2", size: "landscape", alt: "Guests enjoying a bonfire night under the stars at Falls View Camp" },
];

const guestReviews = [
  {
    name: "Maria Santos",
    stars: 5,
    text: "The waterfall view at sunrise from our cabin was breathtaking. The farm-to-table breakfast is a must-try — everything felt so fresh and locally sourced. A hidden gem in Zamboanga del Norte!",
    source: "Google Review",
  },
  {
    name: "Carlo Reyes",
    stars: 5,
    text: "Perfect for camping and unwinding. The mountain air is so fresh, and the bonfire area at night was unforgettable. The staff were friendly and the grounds were very clean.",
    source: "Google Review",
  },
  {
    name: "Ana Dela Cruz",
    stars: 5,
    text: "We booked the casita for a weekend family getaway. The kids loved the walking paths and view deck. The café coffee was surprisingly excellent — proper manual brew up in the mountains!",
    source: "Google Review",
  },
];

function Home() {
  return (
    <div>
      <section className="relative isolate overflow-hidden">
        <img
          src={heroFalls}
          alt="Panoramic view of forested mountain ridges and a tall waterfall at sunrise"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full scale-105 object-cover fade-in"
        />
        <div className="absolute inset-0 bg-forest-deep/65" />
        <div className="relative mx-auto flex min-h-[86vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 text-primary-foreground">
          <p className="eyebrow text-azure-light rise-in">Sergio Osmeña, Zamboanga Del Norte</p>
          <h1 className="mt-4 max-w-3xl rise-in delay-1 text-4xl leading-[1.05] sm:text-6xl">
            Falls View Camp
          </h1>
          <p className="mt-5 max-w-xl text-base opacity-90 rise-in delay-2 sm:text-lg">
            Accommodation, camping, a cafe, and mountain views in Sergio Osmeña, Zamboanga del
            Norte.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 rise-in delay-3">
            <Link
              to="/"
              hash="book"
              className="btn-base btn-water transition-transform hover:-translate-y-0.5"
            >
              Book a Stay
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((h, i) => (
            <article
              key={h.title}
              className={`card-camp card-interactive rise-in ${DELAYS[i % DELAYS.length]} p-6`}
            >
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-secondary text-primary">
                <h.icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-xl">{h.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="card-camp card-interactive">
            <img
              src={cafeHero}
              alt="Fresh breakfast spread with eggs, garden vegetables, bread and coffee at Falls View Camp"
              width={1400}
              height={900}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow text-wood">Falls View Cafe</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Food and drinks at Falls View Camp Cafe</h2>
            <p className="mt-4 text-muted-foreground">
              View the current cafe menu, including manual brewing, iced coffee, non-coffee drinks,
              refreshments, and alcoholic drinks.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/" hash="cafe" className="btn-base btn-primary">
                View the menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="explore" className="scroll-mt-20 border-t border-border/70 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-wood rise-in">Explore</p>
            <h2 className="mt-3 text-4xl rise-in delay-1 sm:text-5xl">Explore Falls View Camp</h2>
            <p className="mt-4 text-muted-foreground rise-in delay-2">
              See the view deck, walking path, camping grounds, sunset, and bonfire area.
            </p>
          </div>

          <div className="mt-10 grid items-start gap-4 sm:grid-cols-4">
            {exploreGallery.map(({ image, className, size, alt }, index) => (
              <div
                key={image}
                className={`${className} ${size === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"} card-camp card-interactive overflow-hidden rise-in delay-${Math.min(index + 1, 4)}`}
              >
                <img
                  src={image}
                  alt={alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guest Reviews ── */}
      <section id="reviews" className="scroll-mt-20 border-t border-border/70 py-20 bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center rise-in">
            <p className="eyebrow text-azure">Guest Reviews</p>
            <h2 className="mt-3 text-4xl sm:text-5xl">What our visitors say</h2>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="flex gap-0.5 text-amber-500" aria-label="4.8 out of 5 stars">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.28l-4.77 2.51.91-5.33L2.27 6.62l5.34-.78L10 1z" />
                  </svg>
                ))}
              </div>
              <span className="text-lg font-semibold text-foreground">4.8</span>
              <span className="text-sm text-muted-foreground">· 120+ visitor reviews</span>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {guestReviews.map((review, i) => (
              <article
                key={review.name}
                className={`card-camp p-6 rise-in ${DELAYS[i % DELAYS.length]} flex flex-col`}
              >
                <div className="flex gap-0.5 text-amber-500">
                  {Array.from({ length: review.stars }).map((_, s) => (
                    <svg key={s} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.28l-4.77 2.51.91-5.33L2.27 6.62l5.34-.78L10 1z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground italic">
                  "{review.text}"
                </p>
                <div className="mt-4 flex items-center gap-3 border-t border-border/60 pt-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {review.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.source}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4 rise-in delay-4">
            <a
              href="https://www.google.com/maps/search/Falls+View+Camp+Tinindugan+Sergio+Osmena+Zamboanga+del+Norte"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base btn-outline"
            >
              Read more on Google
            </a>
            <a
              href="https://www.google.com/maps/search/Falls+View+Camp+Tinindugan+Sergio+Osmena+Zamboanga+del+Norte"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base btn-primary"
            >
              Write a Review ★
            </a>
          </div>
        </div>
      </section>

      <section id="accommodations" className="scroll-mt-20 border-t border-border/70 pt-8">
        <Accommodations />
      </section>
      <section id="cafe" className="scroll-mt-20 border-t border-border/70">
        <Cafe />
      </section>
      <section id="contact" className="scroll-mt-20 border-t border-border/70">
        <Contact />
      </section>
    </div>
  );
}
