import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, AlertCircle, Check } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Directions — Falls View Camp" },
      {
        name: "description",
        content:
          "Find Falls View Camp in Sergio Osmeña, Zamboanga del Norte. Map, directions, phone, email and a message form for enquiries.",
      },
      { property: "og:title", content: "Contact Falls View Camp" },
      {
        property: "og:description",
        content: "Map, directions and contact details for our mountain campsite and cafe.",
      },
    ],
  }),
  component: Contact,
});

const DELAYS = ["delay-1", "delay-2", "delay-3", "delay-4"] as const;

const details = [
  {
    icon: MapPin,
    label: "Location",
    value: "Sitio Falls View, Sergio Osmeña Sr., Zamboanga del Norte",
  },
  { icon: Phone, label: "Caretaker", value: "+63 917 555 0142" },
  { icon: Mail, label: "Email", value: "stay@fallsviewcamp.ph" },
  { icon: Clock, label: "Open", value: "Daily 6:00am – 9:00pm" },
];

type Errors = { name?: string; email?: string; message?: string };

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function validate(values: typeof form): Errors {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = "Enter a valid email address.";
    if (values.message.trim().length < 10)
      next.message = "Your message should be at least 10 characters.";
    return next;
  }

  function update<K extends keyof typeof form>(key: K, value: string) {
    const next = { ...form, [key]: value };
    setForm(next);
    if (errors[key]) setErrors(validate(next));
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <p className="eyebrow text-wood rise-in">Contact</p>
      <h1 className="mt-3 text-4xl rise-in delay-1 sm:text-5xl">Find us on the mountain</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground rise-in delay-2">
        The last 4km is a rough farm road — habal-habal transfers can be arranged from the town
        proper. Message us and we'll send a pin plus pickup times.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="grid gap-6">
          <div className="card-camp card-interactive rise-in delay-2 overflow-hidden">
            <iframe
              title="Map of Falls View Camp in Sergio Osmeña, Zamboanga del Norte"
              src="https://www.openstreetmap.org/export/embed.html?bbox=123.30%2C8.02%2C123.50%2C8.18&layer=mapnik&marker=8.1013%2C123.4028"
              loading="lazy"
              className="h-80 w-full border-0 sm:h-96"
            />
          </div>

          <dl className="grid gap-3 sm:grid-cols-2">
            {details.map((d, i) => (
              <div
                key={d.label}
                className={`card-camp card-interactive rise-in ${DELAYS[i % DELAYS.length]} flex items-start gap-3 p-5`}
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                  <d.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <dt className="text-xs text-muted-foreground">{d.label}</dt>
                  <dd className="text-sm font-semibold">{d.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <section className="card-camp rise-in delay-3 h-fit p-6 sm:p-8">
          <h2 className="text-2xl">Send a message</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We reply within one day, usually sooner when the signal holds.
          </p>

          <form
            noValidate
            className="mt-6 grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              const next = validate(form);
              setErrors(next);
              if (Object.keys(next).length === 0) {
                setSent(true);
                setForm({ name: "", email: "", message: "" });
              }
            }}
          >
            <div>
              <label htmlFor="c-name" className="text-sm font-semibold">
                Full name
              </label>
              <input
                id="c-name"
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

            <div>
              <label htmlFor="c-email" className="text-sm font-semibold">
                Email
              </label>
              <input
                id="c-email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                aria-invalid={Boolean(errors.email)}
                placeholder="you@email.com"
                className={`field mt-1.5 ${errors.email ? "field-error" : ""}`}
              />
              {errors.email && (
                <p className="error-text">
                  <AlertCircle className="h-3.5 w-3.5" /> {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="c-message" className="text-sm font-semibold">
                Message
              </label>
              <textarea
                id="c-message"
                rows={5}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                aria-invalid={Boolean(errors.message)}
                placeholder="We're 6 people looking at the last weekend of the month…"
                className={`field mt-1.5 ${errors.message ? "field-error" : ""}`}
              />
              {errors.message && (
                <p className="error-text">
                  <AlertCircle className="h-3.5 w-3.5" /> {errors.message}
                </p>
              )}
            </div>

            <button type="submit" className="btn-base btn-water mt-2">
              Send Message
            </button>

            {sent && (
              <p className="fade-in flex items-center gap-2 rounded-lg bg-secondary px-4 py-3 text-sm text-primary">
                <Check className="h-4 w-4" /> Thanks — your message is with our caretaker.
              </p>
            )}
          </form>
        </section>
      </div>
    </div>
  );
}
