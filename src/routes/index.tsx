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
  { image: viewDeck, className: "sm:col-span-2", size: "landscape" },
  { image: misty, className: "", size: "portrait" },
  { image: mountainLandscape, className: "", size: "landscape" },
  { image: walkingPath, className: "", size: "portrait" },
  { image: sunsetCamping, className: "", size: "portrait" },
  { image: bonfire, className: "sm:col-span-2", size: "landscape" },
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
            {exploreGallery.map(({ image, className, size }, index) => (
              <div
                key={image}
                className={`${className} ${size === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"} card-camp card-interactive overflow-hidden rise-in delay-${Math.min(index + 1, 4)}`}
              >
                <img
                  src={image}
                  alt="Falls View Camp mountain landscape"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
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
