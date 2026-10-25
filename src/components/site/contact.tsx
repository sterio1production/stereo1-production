"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  Check,
  ChevronLeft,
  Instagram,
  Loader2,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { SectionHeading } from "@/components/site/section-heading";
import { useQuoteStore } from "@/lib/quote-store";
import { buildWhatsAppUrl, EVENT_TYPE_OPTIONS, SERVICES, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const detailsSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20, "Phone number is too long"),
  venue: z.string().trim().min(2, "Tell us the venue or location"),
  message: z
    .string()
    .trim()
    .min(5, "Tell us a little about what you need")
    .max(2000, "Message is too long"),
});

type DetailsValues = z.infer<typeof detailsSchema>;

const STEPS = ["Your event", "The gear", "Your details"] as const;

export function Contact() {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [stepError, setStepError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<
    (DetailsValues & { eventType: string; eventDate: string; guests: number; services: string[] }) | null
  >(null);

  const {
    eventType,
    eventDate,
    guests,
    services,
    setEventType,
    setEventDate,
    setGuests,
    toggleService,
  } = useQuoteStore();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<DetailsValues>({
    resolver: zodResolver(detailsSchema),
    defaultValues: { name: "", phone: "", venue: "", message: "" },
  });

  const message = useWatch({ control, name: "message", defaultValue: "" });

  const go = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStepError("");
    setStep(next);
  };

  const continueFromEvent = () => {
    if (!eventType) {
      setStepError("Choose an event type to continue");
      return;
    }
    go(1);
  };

  const onSubmit = async (values: DetailsValues) => {
    setSubmitting(true);
    try {
      const gear = services.length
        ? services.join(", ")
        : "Full production (open to advice)";
      const fullMessage = [
        values.message,
        "",
        `Guests: ~${guests.toLocaleString("en-US")}`,
        `Gear: ${gear}`,
      ].join("\n");

      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          phone: values.phone,
          eventType,
          eventDate,
          venue: values.venue,
          message: fullMessage.slice(0, 2000),
        }),
      });
      if (!res.ok) {
        throw new Error("Request failed");
      }
      setSubmitted({ ...values, eventType, eventDate, guests, services });
      reset();
      setStep(0);
      toast({
        title: "Request received",
        description:
          "Thank you! We have your event details and will get back to you shortly.",
      });
    } catch {
      toast({
        title: "Something went wrong",
        description:
          "We could not send your request. Please try again, or reach us directly on WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappSummary = submitted
    ? buildWhatsAppUrl(
        [
          "Hello Stereo 1 Production! I just sent a quote request.",
          "",
          `Name: ${submitted.name}`,
          `Event: ${submitted.eventType}`,
          `Date: ${submitted.eventDate || "Not fixed yet"}`,
          `Guests: ~${submitted.guests.toLocaleString("en-US")}`,
          `Gear: ${submitted.services.length ? submitted.services.join(", ") : "Full production"}`,
          `Venue: ${submitted.venue}`,
          "",
          `Details: ${submitted.message}`,
        ].join("\n")
      )
    : buildWhatsAppUrl(
        "Hello Stereo 1 Production! I would like to request a quote for my event."
      );

  const slide = {
    initial: (dir: number) => ({ opacity: 0, x: 32 * dir }),
    animate: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: -32 * dir }),
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-full bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.08),transparent_55%)]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Get in touch"
          title={<>Build your quote <span className="grad-text">in a minute</span></>}
          description="Pick your event, tap the gear you need, leave your details. We pick it up on WhatsApp, or you can call us straight away."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-5 lg:gap-8">
          {/* Contact info + live summary */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4 lg:col-span-2"
          >
            {/* Live summary */}
            <div className="rounded-2xl border border-brand/30 bg-brand/5 p-5">
              <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-brand">
                Your event so far
              </p>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">Type</dt>
                  <dd className="font-semibold text-foreground">
                    {eventType || "Not chosen yet"}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">Date</dt>
                  <dd className="font-semibold text-foreground">
                    {eventDate || "Not fixed yet"}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">Guests</dt>
                  <dd className="font-semibold text-foreground">
                    ~{guests.toLocaleString("en-US")}
                  </dd>
                </div>
              </dl>
              <div className="mt-3 border-t border-border/60 pt-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Gear
                </p>
                {services.length === 0 ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Nothing picked yet. Add services from the cards above or in
                    the builder.
                  </p>
                ) : (
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {services.map((title) => (
                      <li key={title}>
                        <button
                          type="button"
                          onClick={() => toggleService(title)}
                          className="group inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/15 px-3 py-1 text-xs font-semibold text-brand transition-colors hover:bg-brand/25"
                          aria-label={`Remove ${title} from your quote`}
                        >
                          {title}
                          <X
                            className="h-3 w-3 opacity-60 transition-opacity group-hover:opacity-100"
                            aria-hidden="true"
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {SITE.phones.map((phone) => (
              <a
                key={phone.display}
                href={phone.primary ? phone.whatsapp : phone.tel}
                target={phone.primary ? "_blank" : undefined}
                rel={phone.primary ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/50"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-display text-base font-bold text-foreground">
                    {phone.display}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {phone.label}
                  </span>
                </span>
              </a>
            ))}

            <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-display text-base font-bold text-foreground">
                  Munyonyo, Kampala
                </span>
                <span className="block text-xs text-muted-foreground">Uganda</span>
              </span>
            </div>

            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/50"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand">
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-display text-base font-bold text-foreground">
                  {SITE.instagram}
                </span>
                <span className="block text-xs text-muted-foreground">
                  Follow us on social media
                </span>
              </span>
            </a>

            <p className="mt-1 px-1 text-sm leading-relaxed text-muted-foreground">
              Serving Kampala and beyond: concerts, weddings, conferences,
              corporate events and live streamed shows.
            </p>
          </motion.div>

          {/* Quote wizard */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              {submitted ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-brand/30 bg-brand/15 text-brand">
                    <MessageCircle className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold text-foreground">
                    Request received!
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    Thank you, {submitted.name.split(" ")[0]}. We have your
                    details and will get back to you shortly. Want a faster
                    reply? Continue the conversation on WhatsApp.
                  </p>
                  <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                    <Button asChild className="font-semibold">
                      <a
                        href={whatsappSummary}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        Continue on WhatsApp
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="font-semibold"
                      onClick={() => setSubmitted(null)}
                    >
                      Send another request
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  {/* Progress */}
                  <div aria-live="polite">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-display text-sm font-bold text-foreground">
                        {STEPS[step]}
                      </p>
                      <p className="text-xs font-semibold text-muted-foreground">
                        Step {step + 1} of {STEPS.length}
                      </p>
                    </div>
                    <div className="mt-2.5 flex gap-1.5">
                      {STEPS.map((label, i) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => i < step && go(i)}
                          disabled={i > step}
                          aria-label={`Go back to step ${i + 1}: ${label}`}
                          className={cn(
                            "h-1.5 flex-1 overflow-hidden rounded-full transition-colors",
                            i <= step ? "bg-brand" : "bg-secondary",
                            i < step && "cursor-pointer"
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 min-h-[21rem]">
                    <AnimatePresence mode="wait" custom={direction}>
                      {step === 0 && (
                        <motion.div
                          key="step-0"
                          custom={direction}
                          variants={slide}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                          className="grid gap-5 sm:grid-cols-2"
                        >
                          <div className="space-y-2">
                            <Label htmlFor="eventType">Event type</Label>
                            <Select
                              value={eventType}
                              onValueChange={(v) => {
                                setEventType(v);
                                setStepError("");
                              }}
                            >
                              <SelectTrigger
                                id="eventType"
                                className="w-full"
                                aria-invalid={!!stepError}
                              >
                                <SelectValue placeholder="Select event type" />
                              </SelectTrigger>
                              <SelectContent>
                                {EVENT_TYPE_OPTIONS.map((opt) => (
                                  <SelectItem key={opt} value={opt}>
                                    {opt}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {stepError && (
                              <p className="text-xs text-destructive">
                                {stepError}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="eventDate">Date</Label>
                            <Input
                              id="eventDate"
                              type="date"
                              className="[color-scheme:dark]"
                              value={eventDate}
                              onChange={(e) => setEventDate(e.target.value)}
                            />
                          </div>

                          <div className="space-y-3 sm:col-span-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="guests" className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-brand" aria-hidden="true" />
                                Estimated guests
                              </Label>
                              <span className="font-display text-lg font-bold text-brand">
                                ~{guests.toLocaleString("en-US")}
                              </span>
                            </div>
                            <Slider
                              id="guests"
                              min={20}
                              max={2000}
                              step={10}
                              value={[guests]}
                              onValueChange={([v]) => setGuests(v)}
                              aria-label="Estimated number of guests"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>20</span>
                              <span>2,000+</span>
                            </div>
                          </div>

                          <div className="rounded-xl border border-border/70 bg-secondary/40 px-4 py-3 text-sm leading-relaxed text-muted-foreground sm:col-span-2">
                            Not sure yet? Rough numbers are fine. We size the
                            sound and stage to your venue and crowd together.
                          </div>
                        </motion.div>
                      )}

                      {step === 1 && (
                        <motion.div
                          key="step-1"
                          custom={direction}
                          variants={slide}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="flex items-center justify-between">
                            <Label>What do you need?</Label>
                            <span className="text-xs font-semibold text-brand">
                              {services.length} selected
                            </span>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {SERVICES.map((service) => {
                              const selected = services.includes(service.title);
                              return (
                                <button
                                  key={service.title}
                                  type="button"
                                  onClick={() => toggleService(service.title)}
                                  aria-pressed={selected}
                                  className={cn(
                                    "inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-all active:scale-[0.97]",
                                    selected
                                      ? "border-brand/60 bg-brand/15 text-brand"
                                      : "border-border bg-secondary/50 text-foreground hover:border-brand/40"
                                  )}
                                >
                                  <service.icon className="h-4 w-4" aria-hidden="true" />
                                  {service.title}
                                  {selected && (
                                    <Check className="h-4 w-4" aria-hidden="true" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                            Not sure what it takes? Choose roughly what you have
                            in mind and we will confirm the details together on
                            WhatsApp.
                          </p>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="step-2"
                          custom={direction}
                          variants={slide}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                          className="grid gap-5 sm:grid-cols-2"
                        >
                          <div className="space-y-2">
                            <Label htmlFor="name">Your name</Label>
                            <Input
                              id="name"
                              placeholder="e.g. Sarah Nakato"
                              autoComplete="name"
                              aria-invalid={!!errors.name}
                              {...register("name")}
                            />
                            {errors.name && (
                              <p className="text-xs text-destructive">
                                {errors.name.message}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+256 7XX XXX XXX"
                              autoComplete="tel"
                              aria-invalid={!!errors.phone}
                              {...register("phone")}
                            />
                            {errors.phone && (
                              <p className="text-xs text-destructive">
                                {errors.phone.message}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="venue">Venue / location</Label>
                            <Input
                              id="venue"
                              placeholder="e.g. Speke Resort, Munyonyo"
                              aria-invalid={!!errors.venue}
                              {...register("venue")}
                            />
                            {errors.venue && (
                              <p className="text-xs text-destructive">
                                {errors.venue.message}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="message">Anything else?</Label>
                            <Textarea
                              id="message"
                              rows={4}
                              placeholder="Tell us more: sound, lights, stage, DJ, live stream…"
                              aria-invalid={!!errors.message}
                              {...register("message")}
                            />
                            {errors.message && (
                              <p className="text-xs text-destructive">
                                {errors.message.message}
                              </p>
                            )}
                            {message.trim().length > 0 && message.trim().length < 5 && (
                              <p className="text-xs text-muted-foreground">
                                A few more words and you are good to send.
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Nav buttons */}
                  <div className="mt-6 flex items-center gap-3">
                    {step > 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => go(step - 1)}
                        className="h-12 shrink-0 font-semibold"
                      >
                        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                        Back
                      </Button>
                    )}
                    {step < 2 ? (
                      <Button
                        type="button"
                        onClick={step === 0 ? continueFromEvent : () => go(2)}
                        className="glow-brand h-12 w-full font-display text-base font-bold"
                      >
                        Continue
                        <Send className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        size="lg"
                        disabled={submitting}
                        className="glow-brand h-12 w-full font-display text-base font-bold"
                      >
                        {submitting ? (
                          <>
                            <Loader2
                              className="h-5 w-5 animate-spin"
                              aria-hidden="true"
                            />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" aria-hidden="true" />
                            Send request
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                  <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                    We reply with a clear, written quote: every item listed.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
