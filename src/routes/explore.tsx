import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Signal } from "lucide-react";

import actTrek from "@/assets/act-trek.jpg";
import actFarm from "@/assets/act-farm.jpg";
import actSwim from "@/assets/act-swim.jpg";
import tentPitching from "@/assets/tent-pitching.jpg";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore & Activities — Falls View Camp" },
      {
        name: "description",
        content:
          "Waterfall trekking, farm tours, rock-pool swims and sunrise ridge walks at Falls View Camp in Sergio Osmeña.",
      },
      { property: "og:title", content: "Things to do at Falls View Camp" },
      {
        property: "og:description",
        content: "Guided waterfall treks, farm tours and sunrise ridge walks.",
      },
    ],
  }),
  component: Explore,
});

const DELAYS = ["delay-1", "delay-2", "delay-3", "delay-4"] as const;

const activities = [
  {
    name: "Waterfall Trekking",
    image: actTrek,
    duration: "2.5 hours",
    level: "Moderate",
    desc: "A mossy descent through old-growth forest to the base of the main falls, with a guide and rope-assisted sections.",
    price: "₱350 per person",
  },
  {
    name: "Farm Tour & Harvest",
    image: actFarm,
    duration: "1 hour",
    level: "Easy",
    desc: "Walk the terraces, feed the goats, and pick the greens that go straight to your cafe plate.",
    price: "₱200 per person",
  },
  {
    name: "Rock Pool Swim",
    image: actSwim,
    duration: "Open 8am–4pm",
    level: "Easy",
    desc: "Cold, clear plunge pool below the second cascade. Life vests and dry bags available at the ranger hut.",
    price: "Free for guests",
  },
  {
    name: "Sunrise Ridge Walk",
    image: tentPitching,
    duration: "45 minutes",
    level: "Easy",
    desc: "A 5am walk to the east lookout for the sea of clouds, ending with coffee at the fire pit.",
    price: "₱150 per person",
  },
];

function Explore() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <p className="eyebrow text-wood rise-in">Explore</p>
      <h1 className="mt-3 text-4xl rise-in delay-1 sm:text-5xl">Days that start before the sun</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground rise-in delay-2">
        Guided by locals who grew up on this mountain. Book any activity at the ranger hut on
        arrival, or add it to your stay request.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {activities.map((a, i) => (
          <article
            key={a.name}
            className={`card-camp card-interactive rise-in ${DELAYS[i % DELAYS.length]} flex flex-col`}
          >
            <img
              src={a.image}
              alt={a.name}
              width={1024}
              height={768}
              loading="lazy"
              className="h-56 w-full object-cover"
            />
            <div className="flex flex-1 flex-col p-6">
              <h2 className="text-2xl">{a.name}</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                  <Clock className="h-3.5 w-3.5" /> {a.duration}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                  <Signal className="h-3.5 w-3.5" /> {a.level}
                </span>
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
              <p className="mt-5 font-display text-lg text-primary">{a.price}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="card-camp card-interactive rise-in delay-4 mt-12 flex flex-col gap-4 p-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl">Ready to pick your pitch?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Cottages, cabins and tent decks fill up fast on weekends.
          </p>
        </div>
        <Link to="/accommodations" hash="book" className="btn-base btn-water shrink-0 transition-transform hover:-translate-y-0.5">
          Book a Stay
        </Link>
      </div>
    </div>
  );
}
