import { useEffect, useRef, useState } from "react";
import { profile, socials } from "../data";
import { gsap, SplitText, reduceMotion } from "../lib/scroll";
import { useMagnetic } from "../lib/hooks";
import SectionLabel from "../components/SectionLabel";
import { ArrowUpRight, Check, Copy, Send } from "../components/Icons";

const ENDPOINT = `https://formsubmit.co/ajax/${profile.email}`;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (v.message.trim().length < 10) e.message = "A few more words, please (10 characters minimum).";
  return e;
}

function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: "idle", text: "" });
  const submit = useMagnetic(0.2);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      e.currentTarget.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }
    const honey = e.currentTarget.elements._honey.value;
    setStatus({ state: "sending", text: "" });
    let res;
    try {
      res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, _honey: honey, _subject: `Portfolio message from ${values.name}` }),
      });
    } catch {
      setStatus({ state: "error", text: "Connection error. Please email me directly." });
      return;
    }
    const data = await res.json().catch(() => ({}));
    if (res.ok && String(data.success) === "true") {
      setStatus({ state: "sent", text: "Message sent successfully! I'll reply soon." });
      setValues({ name: "", email: "", message: "" });
    } else {
      setStatus({
        state: "error",
        text: `Service response${data.message ? `: ${data.message}` : ""}. You can email me directly instead.`,
      });
    }
  };

  const field = (name, label, props) => (
    <div>
      <label htmlFor={`f-${name}`} className="font-mono text-xs uppercase tracking-wider text-[#6e6e73] font-medium mb-2 block">
        {label}
      </label>
      {props.as === "textarea" ? (
        <textarea
          id={`f-${name}`}
          name={name}
          rows={5}
          value={values[name]}
          onChange={onChange}
          aria-invalid={errors[name] ? "true" : undefined}
          aria-describedby={errors[name] ? `e-${name}` : undefined}
          className="field resize-none"
          placeholder={props.placeholder}
        />
      ) : (
        <input
          id={`f-${name}`}
          name={name}
          type={props.type}
          autoComplete={props.autoComplete}
          value={values[name]}
          onChange={onChange}
          aria-invalid={errors[name] ? "true" : undefined}
          aria-describedby={errors[name] ? `e-${name}` : undefined}
          className="field"
          placeholder={props.placeholder}
        />
      )}
      {errors[name] && (
        <p id={`e-${name}`} className="mt-1.5 text-xs text-red-500 font-medium">
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="apple-card" data-dim>
      <form noValidate onSubmit={onSubmit} className="apple-card-inner p-7 sm:p-9 space-y-5 bg-white">
        <div className="border-b border-black/[0.08] pb-4 mb-2">
          <h3 className="font-semibold text-[#1d1d1f] text-lg tracking-tight">Initiate Conversation</h3>
          <p className="text-xs text-[#86868b] mt-0.5">Expect a response within 24 hours.</p>
        </div>

        {field("name", "Your Name", { type: "text", autoComplete: "name", placeholder: "e.g. Alex Pratama" })}
        {field("email", "Your Email", { type: "email", autoComplete: "email", placeholder: "alex@company.com" })}
        {field("message", "Message Details", { as: "textarea", placeholder: "Tell me about your project, timeline, or engineering role..." })}
        <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

        <div className="flex flex-wrap items-center gap-4 pt-3">
          <button
            ref={submit}
            type="submit"
            disabled={status.state === "sending"}
            className="btn btn-apple-primary rounded-full px-6 py-2.5 text-xs font-semibold disabled:opacity-60 shadow-sm"
          >
            {status.state === "sending" ? "Transmitting…" : "Send Message"} <Send />
          </button>
          {status.text && (
            <p
              role="status"
              className={`text-xs font-medium ${status.state === "error" ? "text-red-500" : "text-black"}`}
            >
              {status.text}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default function Contact() {
  const root = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      SplitText.create("[data-contact-title]", {
        type: "words,lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.words, {
            yPercent: 110,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.05,
            scrollTrigger: { trigger: "[data-contact-title]", start: "top 80%" },
          }),
      });
      gsap.from("[data-contact-fade]", {
        y: 24,
        autoAlpha: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.06,
        scrollTrigger: { trigger: "[data-contact-title]", start: "top 70%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" ref={root} data-shape="5" className="relative pb-28 pt-24 lg:pt-36 bg-white">
      <div className="shell grid gap-y-14 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-7">
          <SectionLabel>Get in Touch</SectionLabel>
          <h2 data-contact-title className="display mt-8 pb-2 text-[clamp(2.6rem,6vw,5.5rem)] font-bold text-[#1d1d1f]">
            Let&apos;s build <span className="text-black italic">something remarkable.</span>
          </h2>
          <p data-contact-fade className="mt-6 max-w-[46ch] text-base sm:text-lg text-[#6e6e73] leading-relaxed">
            Available for fullstack engineering, autonomous AI agent architecture, or SDET QA leadership roles. Let's discuss your next production milestone.
          </p>

          <div data-contact-fade className="mt-6">
            <span className="font-mono text-xs text-[#6e6e73]">
              Available for fullstack &amp; SDET roles · Prompt email reply
            </span>
          </div>

          <div data-contact-fade className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="ulink break-all text-[clamp(1.2rem,2.4vw,2rem)] font-bold text-[#1d1d1f] tracking-tight hover:text-black"
            >
              {profile.email}
            </a>
            <button
              type="button"
              onClick={copy}
              className="btn btn-apple-ghost min-h-[38px] px-3.5 text-xs font-mono rounded-full text-black hover:bg-black/[0.08]"
            >
              {copied ? <Check /> : <Copy />}
              {copied ? "Copied" : "Copy"}
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? "Email address copied" : ""}
            </span>
          </div>

          <ul data-contact-fade className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {socials
              .filter((s) => s.label !== "Email")
              .map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[38px] items-center gap-1.5 text-sm font-medium text-[#6e6e73] hover:text-black ulink"
                  >
                    {s.label} <ArrowUpRight />
                  </a>
                </li>
              ))}
            <li>
              <a
                href={profile.cv}
                download="Reyhan_Resha_Sasmita_CV.pdf"
                className="inline-flex min-h-[38px] items-center gap-1.5 text-sm font-semibold text-black hover:text-[#1d1d1f] ulink"
              >
                Download CV (PDF) <ArrowUpRight />
              </a>
            </li>
          </ul>
        </div>

        <div data-contact-fade className="lg:col-span-5">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
