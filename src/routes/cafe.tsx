import { createFileRoute } from "@tanstack/react-router";

import cafeTable from "@/assets/cafe-table.jpg";

export const Route = createFileRoute("/cafe")({
  head: () => ({
    meta: [
      { title: "Farm-to-Table Cafe — Falls View Camp" },
      {
        name: "description",
        content:
          "All-day breakfast, signature coffee mixes and garden plates made with produce from the Falls View Camp backyard farm.",
      },
      { property: "og:title", content: "The cafe at Falls View Camp" },
      {
        property: "og:description",
        content: "All-day breakfast and signature coffee brewed beside the farm terraces.",
      },
    ],
  }),
  component: Cafe,
});

const sections = [
  {
    title: "All-Day Breakfast",
    note: "Served 6am to 8pm",
    items: [
      { name: "Highland Silog", desc: "Coop eggs, garlic rice, choice of tapa or tofu adobo", price: "₱210" },
      { name: "Terrace Omelette", desc: "Three eggs, mountain greens, kesong puti", price: "₱235" },
      { name: "Falls Pancake Stack", desc: "Buckwheat pancakes, wild honey, saba banana", price: "₱195" },
      { name: "Campfire Longganisa Plate", desc: "House-cured longganisa, egg, pickled papaya", price: "₱225" },
    ],
  },
  {
    title: "Signature Coffee Mixes",
    note: "Single-origin, dried on our beds",
    items: [
      { name: "Falls View Cold Brew", desc: "18-hour steep, spring water, hint of cane", price: "₱160" },
      { name: "Pine Smoke Latte", desc: "Espresso, smoked muscovado, fresh carabao milk", price: "₱175" },
      { name: "Cacao Barako", desc: "Barako blend with local tablea and sea salt", price: "₱185" },
      { name: "Lemongrass Americano", desc: "Espresso over cold lemongrass tea", price: "₱150" },
    ],
  },
  {
    title: "From the Backyard Farm",
    note: "Harvested the same morning",
    items: [
      { name: "Garden Bowl", desc: "Mixed terrace greens, roast squash, toasted pili", price: "₱240" },
      { name: "Farm Broth Noodles", desc: "Slow bone broth, malunggay noodles, soft egg", price: "₱255" },
      { name: "Clay Oven Sourdough", desc: "Whole loaf with herb butter from the dairy", price: "₱180" },
      { name: "Ginataang Kalabasa", desc: "Squash, coconut cream, native chili", price: "₱210" },
    ],
  },
];

function Cafe() {
  return (
    <div>
      <section className="relative isolate overflow-hidden">
        <img
          src={cafeTable}
          alt="Farm-to-table breakfast spread on a wooden table"
          width={1400}
          height={900}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-forest-deep/70" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 text-primary-foreground">
          <p className="eyebrow text-azure-light">Kitchen & Roastery</p>
          <h1 className="mt-3 max-w-2xl text-4xl sm:text-5xl">
            A short menu, a shorter supply chain
          </h1>
          <p className="mt-4 max-w-xl opacity-90">
            Everything is cooked to order in an open kitchen beside the farm terraces. If a dish
            runs out, it means the harvest did too.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-8">
          {sections.map((s) => (
            <section key={s.title} className="card-camp p-6 sm:p-8">
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
