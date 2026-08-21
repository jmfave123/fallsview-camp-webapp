import { createFileRoute, Link } from "@tanstack/react-router";
import { Coffee, Footprints, Tent, Sprout } from "lucide-react";

import heroFalls from "@/assets/hero-falls.jpg";
import cafeTable from "@/assets/cafe-table.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Falls View Camp — Mountain Campsite & Farm-to-Table Cafe" },
      {
        name: "description",
        content:
          "A rugged mountain campsite and farm-to-table cafe in Sergio Osmeña. Cottages, cabins and tent pitching above the falls.",
      },
      { property: "og:title", content: "Falls View Camp — Camp above the falls" },
      {
        property: "og:description",
        content:
          "Native cottages, cabins and tent pitching with waterfall treks and a backyard-farm cafe.",
      },
    ],
  }),
  component: Home,
});

const highlights = [
  {
    icon: Tent,
    title: "Sleep on the ridge",
    body: "Native cottages, timber cabins, and open pitching decks with valley views at first light.",
  },
  {
    icon: Coffee,
    title: "Farm-to-table cafe",
    body: "All-day breakfast and signature coffee mixes brewed steps from the garden beds.",
  },
  {
    icon: Footprints,
    title: "Trek to the falls",
    body: "A guided 45-minute mossy trail down to the plunge pool and rock ledges.",
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
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-forest-deep/65" />
        <div className="relative mx-auto flex min-h-[86vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 text-primary-foreground">
          <p className="eyebrow text-azure-light">Sergio Osmeña · 980 masl</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] sm:text-6xl">
            Camp where the mountain spills into water.
          </h1>
          <p className="mt-5 max-w-xl text-base opacity-90 sm:text-lg">
            A working highland farm, a small cafe, and three ways to sleep under the pines —
            all facing the falls.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/accommodations" hash="book" className="btn-base btn-water">
              Book a Stay
            </Link>
            <Link
              to="/explore"
              className="btn-base border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10"
            >
              See the trails
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((h) => (
            <article key={h.title} className="card-camp p-6">
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
          <div className="card-camp">
            <img
              src={cafeTable}
              alt="Farm-to-table breakfast spread with garden vegetables, bread and coffee"
              width={1400}
              height={900}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow text-wood">From our backyard</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Harvested this morning, plated by eight</h2>
            <p className="mt-4 text-muted-foreground">
              Eggs from the coop, greens from the terraces, arabica dried on our own beds. What we
              can't grow, we source from neighbouring farms in Sergio Osmeña.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/cafe" className="btn-base btn-primary">
                View the menu
              </Link>
              <Link to="/explore" className="btn-base btn-outline">
                <Sprout className="h-4 w-4" /> Farm tours
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
