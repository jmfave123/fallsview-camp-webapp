import { createFileRoute } from "@tanstack/react-router";

import caramelMacchiato from "@/assets/cafe/caramel-macchiato.jpg";
import icedMatcha from "@/assets/cafe/iced-matcha.jpg";
import cafeHero from "@/assets/cafe/main-cafe-hero.jpg";
import sandwich from "@/assets/cafe/sandwich.jpg";
import tiramisuLatte from "@/assets/cafe/tiramitsu-latte.jpg";

export const Route = createFileRoute("/cafe")({
  head: () => ({
    meta: [
      { title: "Farm-to-Table Cafe & Specialty Coffee — Falls View Camp Sergio Osmeña" },
      {
        name: "description",
        content:
          "Enjoy all-day breakfast, signature coffee mixes, manual drip brew, and garden plates made with produce from the Falls View Camp backyard farm in Sergio Osmeña.",
      },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Farm-to-Table Cafe Menu — Falls View Camp" },
      {
        property: "og:description",
        content: "All-day breakfast and specialty coffee brewed beside the mountain farm terraces in Sergio Osmeña.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://fallsview-camp-webapp.lovable.app/cafe" },
    ],
  }),
  component: Cafe,
});

const DELAYS = ["delay-1", "delay-2", "delay-3", "delay-4"] as const;

const cafeGallery = [cafeHero, sandwich, caramelMacchiato, icedMatcha, tiramisuLatte];

const sections = [
  {
    title: "Manual Brewing",
    note: "Pour over / drip",
    items: [
      { name: "Pour Over / Drip", desc: "Manual brewed coffee", price: "₱70" },
      { name: "Choose Flavor Add", desc: "Hazelnut / Toffeenut / Caramel", price: "₱20" },
      { name: "Brewed Latte", desc: "Freshly brewed coffee with milk", price: "₱110" },
      { name: "Brewed Cappuccino", desc: "Brewed coffee with steamed milk foam", price: "₱115" },
      {
        name: "Brewed Caramel Macchiato",
        desc: "Brewed coffee with caramel and milk",
        price: "₱115",
      },
      { name: "Sikwate / Hot Choco", desc: "Warm chocolate drink", price: "₱60" },
    ],
  },
  {
    title: "Iced Coffee",
    note: "Served cold",
    items: [
      { name: "Iced Americano", desc: "Chilled brewed coffee", price: "₱100" },
      { name: "Iced Cafe Latte", desc: "Chilled coffee with milk", price: "₱115" },
      {
        name: "Iced Caramel Macchiato",
        desc: "Chilled coffee with caramel and milk",
        price: "₱125",
      },
    ],
  },
  {
    title: "Non-Coffee",
    note: "Iced drinks",
    items: [
      { name: "Iced Matcha Latte", desc: "Chilled matcha with milk", price: "₱115" },
      { name: "Iced Choco Latte", desc: "Chilled chocolate with milk", price: "₱115" },
      { name: "Iced Taro Latte", desc: "Chilled taro drink with milk", price: "₱115" },
    ],
  },
  {
    title: "Drinks",
    note: "Cold refreshments",
    items: [
      { name: "Coke / Sprite / Swakto", desc: "Soft drinks", price: "₱30" },
      { name: "Coke Zero Cans", desc: "Canned soft drink", price: "₱60" },
      { name: "Four Season / Mango / Pineapple", desc: "Canned juice", price: "₱60" },
      { name: "Wilkins Water 500 ML", desc: "Bottled water", price: "₱25" },
      { name: "Wilkins Water 1 Liter", desc: "Bottled water", price: "₱35" },
      { name: "Sola Iced Tea", desc: "Bottled iced tea", price: "₱100" },
      { name: "Real Leaf 480 ML", desc: "Bottled iced tea", price: "₱60" },
    ],
  },
  {
    title: "Alcoholic Drinks",
    note: "Available at the cafe",
    items: [
      { name: "San Mig Light", desc: "Beer", price: "₱100" },
      { name: "San Mig Flavored Beer", desc: "Apple / Lemon", price: "₱100" },
      { name: "Jack Daniel Coke", desc: "Ready-to-drink cocktail", price: "₱120" },
      { name: "Lemon-Dou Japanese Beer", desc: "Japanese beer", price: "₱110" },
      { name: "Smirnoff Mule Vodka", desc: "Vodka drink", price: "₱80" },
    ],
  },
];

export function Cafe() {
  return (
    <div>
      <section className="relative isolate overflow-hidden">
        <img
          src={cafeHero}
          alt="Farm-to-table breakfast spread on a wooden table"
          width={1400}
          height={900}
          loading="lazy"
          className="absolute inset-0 h-full w-full scale-105 object-cover fade-in"
        />
        <div className="absolute inset-0 bg-forest-deep/70" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 text-primary-foreground">
          <p className="eyebrow text-azure-light rise-in">Kitchen &amp; Roastery</p>
          <h1 className="mt-3 max-w-2xl text-4xl rise-in delay-1 sm:text-5xl">
            Coffee, drinks, and food at Falls View Camp
          </h1>
          <p className="mt-4 max-w-xl opacity-90 rise-in delay-2">
            Browse the current menu and prices for drinks and cafe items.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16" aria-label="Cafe food and drink gallery">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cafeGallery.map((image, index) => (
            <div
              key={image}
              className={`${index === 0 ? "sm:col-span-2 sm:row-span-2" : ""} card-camp card-interactive overflow-hidden`}
            >
              <img
                src={image}
                alt="Falls View Camp cafe food and drinks"
                loading={index === 0 ? "eager" : "lazy"}
                className="h-full min-h-56 w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-8">
          {sections.map((s, i) => (
            <section
              key={s.title}
              className={`card-camp card-interactive rise-in ${DELAYS[i % DELAYS.length]} p-6 sm:p-8`}
            >
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4 border-b border-border pb-4 sm:flex sm:justify-between">
                <h2 className="min-w-0 text-2xl">{s.title}</h2>
                <p className="shrink-0 text-xs text-muted-foreground">{s.note}</p>
              </div>
              <ul className="mt-5 grid gap-5 sm:grid-cols-2">
                {s.items.map((i) => (
                  <li key={i.name} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold">{i.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{i.desc}</p>
                    </div>
                    <p className="shrink-0 font-display text-lg text-primary">{i.price}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
