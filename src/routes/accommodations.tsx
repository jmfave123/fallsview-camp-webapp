import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Users, BedDouble, Check } from "lucide-react";

import nativeCottage from "@/assets/native-cottage.jpg";
import cabin from "@/assets/cabin.jpg";
import tentPitching from "@/assets/tent-pitching.jpg";

export const Route = createFileRoute("/accommodations")({
  head: () => ({
    meta: [
      { title: "Accommodations — Native Cottages, Cabins & Tent Pitching" },
      {
        name: "description",
        content:
          "Compare native cottages, timber cabins and tent pitching at Falls View Camp, then check availability for your dates.",
      },
      { property: "og:title", content: "Where to sleep at Falls View Camp" },
      {
        property: "og:description",
        content: "Pricing, capacity and availability for cottages, cabins and tent pitches.",
      },
    ],
  }),
  component: Accommodations,
});

const stays = [
  {
    id: "cottages",
    name: "Native Cottages",
    image: nativeCottage,
    price: "₱2,800",
    unit: "per night",
    capacity: "2–4 guests",
    beds: "1 queen bed + floor mats",
    blurb:
      "Bamboo and nipa huts on the grass clearing, with a covered porch facing the ridge line.",
    perks: ["Private porch & hammock", "Solar lighting", "Shared bath house", "Breakfast for 2"],
  },
  {
    id: "cabins",
    name: "Cabins",
    image: cabin,
    price: "₱4,500",
    unit: "per night",
    capacity: "4–6 guests",
    beds: "2 queen beds + loft",
    blurb:
      "Insulated timber A-frames tucked in the pines — the warmest option for cold-season nights.",
    perks: ["En-suite hot shower", "Wood stove", "Loft with valley window", "Breakfast for 4"],
  },
  {
    id: "tents",
    name: "Tent Pitching",
    image: tentPitching,
    price: "₱450",
    unit: "per person, per night",
    capacity: "1–10 guests",
    beds: "Bring your own tent",
    blurb: "Level grass pitches along the cliff edge, closest to the sunrise and the fire pits.",
    perks: ["Shared fire pit", "Potable water station", "Tent rental ₱600", "Comfort rooms nearby"],
  },
] as const;

function Accommodations() {
  const [active, setActive] = useState<string>(stays[0].id);
  const [submitted, setSubmitted] = useState(false);
  const stay = stays.find((s) => s.id === active) ?? stays[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <p className="eyebrow text-wood">Stay with us</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">Three ways to sleep above the falls</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Toggle between our stay types to compare pricing and capacity, then check availability for
        your dates. Rates are indicative and confirmed by our caretaker.
      </p>

      <div
        role="tablist"
        aria-label="Accommodation types"
        className="mt-8 grid gap-2 rounded-xl border border-border bg-secondary p-2 sm:inline-grid sm:grid-cols-3"
      >
        {stays.map((s) => {
          const isActive = s.id === active;
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => setActive(s.id)}
              className={
                isActive
                  ? "btn-base btn-primary w-full sm:w-auto"
                  : "btn-base w-full text-secondary-foreground hover:bg-card sm:w-auto"
              }
            >
              {s.name}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_1fr]">
        <article className="card-camp">
          <img
            src={stay.image}
            alt={stay.name}
            width={1024}
            height={768}
            loading="lazy"
            className="h-72 w-full object-cover sm:h-96"
          />
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:justify-between">
              <div className="min-w-0">
                <h2 className="text-2xl">{stay.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{stay.blurb}</p>
              </div>
              <p className="shrink-0 text-right">
                <span className="font-display text-3xl text-primary">{stay.price}</span>
                <span className="block text-xs text-muted-foreground">{stay.unit}</span>
              </p>
            </div>

            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-3">
                <Users className="h-4 w-4 shrink-0 text-primary" />
                <div className="min-w-0">
                  <dt className="text-xs text-muted-foreground">Capacity</dt>
                  <dd className="truncate text-sm font-semibold">{stay.capacity}</dd>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-3">
                <BedDouble className="h-4 w-4 shrink-0 text-primary" />
                <div className="min-w-0">
                  <dt className="text-xs text-muted-foreground">Sleeping</dt>
                  <dd className="truncate text-sm font-semibold">{stay.beds}</dd>
                </div>
              </div>
            </dl>

            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {stay.perks.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 shrink-0 text-azure" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </article>

        <aside id="book" className="card-camp h-fit p-6 sm:p-8">
          <h2 className="text-2xl">Check availability</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            For {stay.name.toLowerCase()} — we reply within one day.
          </p>

          <form
            className="mt-6 grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <div>
              <label htmlFor="name" className="text-sm font-semibold">
                Full name
              </label>
              <input id="name" name="name" required placeholder="Juan Dela Cruz" className="field mt-1.5" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="checkin" className="text-sm font-semibold">
                  Check in
                </label>
                <input id="checkin" name="checkin" type="date" required className="field mt-1.5" />
              </div>
              <div>
                <label htmlFor="checkout" className="text-sm font-semibold">
                  Check out
                </label>
                <input id="checkout" name="checkout" type="date" required className="field mt-1.5" />
              </div>
            </div>
            <div>
              <label htmlFor="guests" className="text-sm font-semibold">
                Guests
              </label>
              <input
                id="guests"
                name="guests"
                type="number"
                min={1}
                max={20}
                defaultValue={2}
                required
                className="field mt-1.5"
              />
            </div>
            <button type="submit" className="btn-base btn-water mt-2">
              Check Availability
            </button>
            {submitted && (
              <p className="rounded-lg bg-secondary px-4 py-3 text-sm text-primary">
                Request noted for {stay.name} — our caretaker will confirm your dates shortly.
              </p>
            )}
          </form>
        </aside>
      </div>
    </div>
  );
}
