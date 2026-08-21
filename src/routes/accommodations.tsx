import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Users, BedDouble, Check, AlertCircle, CalendarCheck, Loader2 } from "lucide-react";

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
    rate: 2800,
    perPerson: false,
    unit: "per night",
    capacity: "2–4 guests",
    maxGuests: 4,
    units: 4,
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
    rate: 4500,
    perPerson: false,
    unit: "per night",
    capacity: "4–6 guests",
    maxGuests: 6,
    units: 2,
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
    rate: 450,
    perPerson: true,
    unit: "per person, per night",
    capacity: "1–10 guests",
    maxGuests: 10,
    units: 12,
    beds: "Bring your own tent",
    blurb: "Level grass pitches along the cliff edge, closest to the sunrise and the fire pits.",
    perks: ["Shared fire pit", "Potable water station", "Tent rental ₱600", "Comfort rooms nearby"],
  },
] as const;

type Stay = (typeof stays)[number];

const today = () => new Date().toISOString().slice(0, 10);

const peso = (n: number) => `₱${n.toLocaleString("en-PH")}`;

function nightsBetween(checkin: string, checkout: string) {
  const a = new Date(`${checkin}T00:00:00`).getTime();
  const b = new Date(`${checkout}T00:00:00`).getTime();
  return Math.round((b - a) / 86_400_000);
}

/** Deterministic stand-in for a live availability calendar. */
function unitsLeft(stay: Stay, checkin: string) {
  const day = new Date(`${checkin}T00:00:00`).getDay();
  const weekendPressure = day === 5 || day === 6 ? stay.units - 1 : 0;
  const seed = (checkin.charCodeAt(8) + checkin.charCodeAt(9) + stay.id.length) % stay.units;
  return Math.max(0, stay.units - weekendPressure - (seed % 2));
}

type Errors = { name?: string; checkin?: string; checkout?: string; guests?: string };

type Result =
  | { status: "available"; nights: number; total: number; left: number }
  | { status: "full"; nights: number };

function Accommodations() {
  const [active, setActive] = useState<string>(stays[0].id);
  const stay = stays.find((s) => s.id === active) ?? stays[0];

  const [form, setForm] = useState({ name: "", checkin: "", checkout: "", guests: "2" });
  const [errors, setErrors] = useState<Errors>({});
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  function validate(values: typeof form, current: Stay): Errors {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Please enter the name for the booking.";

    if (!values.checkin) {
      next.checkin = "Pick a check-in date.";
    } else if (values.checkin < today()) {
      next.checkin = "Check-in cannot be in the past.";
    }

    if (!values.checkout) {
      next.checkout = "Pick a check-out date.";
    } else if (values.checkin && values.checkout <= values.checkin) {
      next.checkout = "Check-out must be after the check-in date.";
    }

    const guests = Number(values.guests);
    if (!Number.isInteger(guests) || guests < 1) {
      next.guests = "Enter at least 1 guest.";
    } else if (guests > current.maxGuests) {
      next.guests = `${current.name} sleeps up to ${current.maxGuests} guests.`;
    }
    return next;
  }

  function update<K extends keyof typeof form>(key: K, value: string) {
    const next = { ...form, [key]: value };
    setForm(next);
    setResult(null);
    setConfirmed(false);
    if (Object.keys(errors).length) setErrors(validate(next, stay));
  }

  function selectStay(id: string) {
    setActive(id);
    setResult(null);
    setConfirmed(false);
    setErrors({});
  }

  async function onCheck(e: React.FormEvent) {
    e.preventDefault();
    const next = validate(form, stay);
    setErrors(next);
    setResult(null);
    setConfirmed(false);
    if (Object.keys(next).length > 0) return;

    setChecking(true);
    await new Promise((r) => setTimeout(r, 700));
    const nights = nightsBetween(form.checkin, form.checkout);
    const left = unitsLeft(stay, form.checkin);
    const guests = Number(form.guests);
    const total = stay.perPerson ? stay.rate * guests * nights : stay.rate * nights;
    setResult(left > 0 ? { status: "available", nights, total, left } : { status: "full", nights });
    setChecking(false);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <p className="eyebrow text-wood rise-in">Stay with us</p>
      <h1 className="mt-3 text-4xl rise-in delay-1 sm:text-5xl">
        Three ways to sleep above the falls
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground rise-in delay-2">
        Toggle between our stay types to compare pricing and capacity, then check availability for
        your dates. Rates are indicative and confirmed by our caretaker.
      </p>

      <div
        role="tablist"
        aria-label="Accommodation types"
        className="mt-8 grid gap-2 rounded-xl border border-border bg-secondary p-2 rise-in delay-2 sm:inline-grid sm:grid-cols-3"
      >
        {stays.map((s) => {
          const isActive = s.id === active;
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => selectStay(s.id)}
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
        <article key={stay.id} className="card-camp card-interactive fade-in">
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

        <aside id="book" className="card-camp rise-in delay-3 h-fit p-6 sm:p-8">
          <h2 className="text-2xl">Check availability</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            For {stay.name.toLowerCase()} — we reply within one day.
          </p>

          <form noValidate className="mt-6 grid gap-4" onSubmit={onCheck}>
            <div>
              <label htmlFor="name" className="text-sm font-semibold">
                Full name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                aria-invalid={Boolean(errors.name)}
                placeholder="Juan Dela Cruz"
                className={`field mt-1.5 ${errors.name ? "field-error" : ""}`}
              />
              {errors.name && (
                <p className="error-text">
                  <AlertCircle className="h-3.5 w-3.5" /> {errors.name}
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="checkin" className="text-sm font-semibold">
                  Check in
                </label>
                <input
                  id="checkin"
                  name="checkin"
                  type="date"
                  min={today()}
                  value={form.checkin}
                  onChange={(e) => update("checkin", e.target.value)}
                  aria-invalid={Boolean(errors.checkin)}
                  className={`field mt-1.5 ${errors.checkin ? "field-error" : ""}`}
                />
                {errors.checkin && (
                  <p className="error-text">
                    <AlertCircle className="h-3.5 w-3.5" /> {errors.checkin}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="checkout" className="text-sm font-semibold">
                  Check out
                </label>
                <input
                  id="checkout"
                  name="checkout"
                  type="date"
                  min={form.checkin || today()}
                  value={form.checkout}
                  onChange={(e) => update("checkout", e.target.value)}
                  aria-invalid={Boolean(errors.checkout)}
                  className={`field mt-1.5 ${errors.checkout ? "field-error" : ""}`}
                />
                {errors.checkout && (
                  <p className="error-text">
                    <AlertCircle className="h-3.5 w-3.5" /> {errors.checkout}
                  </p>
                )}
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
                max={stay.maxGuests}
                value={form.guests}
                onChange={(e) => update("guests", e.target.value)}
                aria-invalid={Boolean(errors.guests)}
                className={`field mt-1.5 ${errors.guests ? "field-error" : ""}`}
              />
              {errors.guests && (
                <p className="error-text">
                  <AlertCircle className="h-3.5 w-3.5" /> {errors.guests}
                </p>
              )}
            </div>

            <button type="submit" disabled={checking} className="btn-base btn-water mt-2 disabled:opacity-70">
              {checking ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Checking dates…
                </>
              ) : (
                "Check Availability"
              )}
            </button>
          </form>

          {result?.status === "full" && (
            <div className="fade-in mt-5 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3">
              <p className="error-text mt-0">
                <AlertCircle className="h-4 w-4" /> {stay.name} is fully booked for those dates.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try shifting a day, or switch to another stay type above.
              </p>
            </div>
          )}

          {result?.status === "available" && !confirmed && (
            <div className="fade-in mt-5 grid gap-3 rounded-lg bg-secondary px-4 py-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                <CalendarCheck className="h-4 w-4" /> {result.left}{" "}
                {result.left === 1 ? "space" : "spaces"} left — you're good to go
              </p>
              <dl className="grid gap-1 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Nights</dt>
                  <dd className="font-semibold">{result.nights}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Guests</dt>
                  <dd className="font-semibold">{form.guests}</dd>
                </div>
                <div className="flex justify-between border-t border-border pt-1">
                  <dt className="text-muted-foreground">Estimated total</dt>
                  <dd className="font-display text-lg text-primary">{peso(result.total)}</dd>
                </div>
              </dl>
              <button
                type="button"
                onClick={() => setConfirmed(true)}
                className="btn-base btn-primary mt-1"
              >
                Confirm Booking Request
              </button>
            </div>
          )}

          {confirmed && result?.status === "available" && (
            <div className="fade-in mt-5 rounded-lg bg-secondary px-4 py-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Check className="h-4 w-4" /> Booking request sent
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Thanks {form.name.split(" ")[0]} — we've reserved {stay.name.toLowerCase()} for{" "}
                {form.checkin} to {form.checkout} ({result.nights}{" "}
                {result.nights === 1 ? "night" : "nights"}, {form.guests} guests). Our caretaker will
                confirm by text within a day.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
