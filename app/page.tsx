"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type Condolence = {
  id: number;
  name: string;
  message: string;
  created_at: string;
};

const BIOGRAPHY_PARAGRAPHS = [
  "In the same manner that a shooting star momentarily adorns the sky before fading from view, this great man briefly but surely illuminated the world for 48 years.",
  "Godswill Chinemeze Nwosu was born on June 11, 1977, to the humble Christian trading family of Sir and Lady Zeph Nwosu. And over the course of his 48 years, he touched innumerable lives, served in the church and his community, built a great family, and impacted generations with his humility and unrelenting philanthropy.",
  "Trained as a Mechanical Engineer at the Federal University of Agriculture, Makurdi, he approached life with a solution-driven mindset and efficiency that made solving monumental problems look simple. After completing his NYSC in 2001, he told his father that he would not work for anyone for a single day. Godswill received his father's blessing, having been raised in the family business alongside his two elder brothers, Dr. Chinedu Zephaniah and Sir Tochukwu Nwosu.",
  "In the months after his NYSC in Kano, he returned to the family business in Aba. There, he had a brief refresher course before receiving capital from his father to begin his own business. He expanded rapidly, relocated to Abuja, and became a household name in Nigeria's telecom industry. He founded G-Wills Nigeria Limited, becoming an MTN, Glo, Airtel, and Etisalat Trade Partner for Niger State. He also established the Tranquila Hotels 1 & 2 in Abuja, demonstrating the astute business acumen that brought him remarkable growth and achievement within a short period of time.",
  "As a devoted Christian, his commitment to kingdom service and the propagation of the gospel was exemplary across every congregation in the Church of Nigeria (Anglican Communion), to which he belonged at different times in his life. As a member of the Vicar Society at the Cathedral Church of Advent, Life Camp, Abuja, his passion for soul-winning and building the church was so glaring. He always volunteered and served beyond the usual, committing his time, talent and wealth to every project of God's kingdom.",
  "In his hometown of Nnewi, Chinemeze was recognised by his people as a beacon of hope for the downtrodden and a large-hearted philanthropist. His G-Wills Foundation has awarded over 100 scholarships and provided financial assistance to numerous widows. He consistently pushed for the development of the community, and after several unsuccessful attempts to secure government support for infrastructure in his village, he single-handedly rebuilt the major Uruagu-Nnewi road (St Mary's Road), which connects the community to Oraifite. The project brought new life to businesses and all who rely on the road for their livelihoods.",
  "He married his wife, Uzoamaka Nwosu (nee Udeogu), in 2004, and their union was blessed with 4 children; Chigozirim, Mmesoma, Oluoma, and Chimamaka. As a husband and father, the love and devotion he gave was a steady light in his family's life. His heartfelt insistence that his children attend schools close to his home and office ensured he was always available to share memorable moments and weave precious memories they now cherish deeply. Equally, his parents, siblings, and cousins all remember the warmth and rare depth of his love and affection. Their voices echo the immense presence he brought to their lives; a presence now missed beyond words.",
  "Many people say that good things do not last. But really, this good man will endure, given the huge impact he made on the body of Christ, his community, the poor, and humanity at large. Truly, the measure of a life is not in length but in impact. He came with purpose, lived intentionally, and left with his work finished and his name unblemished. At 48, many people would still be planning their legacy, but Chinemeze had already built his — in the church, community, boardrooms and in the lives of people, many of whom are mourning him today.",
  "His life was a testament of what one soul can mean to so many. He leaves behind a legacy stitched into the fabric of countless hearts. Though his time was short, the brilliance of his spirit will shine on, casting light and hope wherever his memory is held.",
];

function BiographyModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(43, 42, 40, 0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto"
        style={{ background: "#fffdf9", border: "1px solid #e3ded6" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 flex items-center justify-between px-8 py-5 border-b"
          style={{ background: "#fffdf9", borderColor: "#e3ded6" }}
        >
          <div>
            <p
              className="text-xs uppercase tracking-[0.3em] mb-1"
              style={{ color: "#8b5e34", fontFamily: "var(--font-lato), sans-serif" }}
            >
              Biography
            </p>
            <h3
              className="text-2xl"
              style={{ fontFamily: "var(--font-cormorant), serif", color: "#2b2a28", fontWeight: 700 }}
            >
              Chief Engr. Godswill Nwosu (KSC)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 ml-6 w-8 h-8 flex items-center justify-center border transition-colors"
            style={{ borderColor: "#e3ded6", color: "#6f665e" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#8b5e34"; e.currentTarget.style.color = "#8b5e34"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e3ded6"; e.currentTarget.style.color = "#6f665e"; }}
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-8 space-y-6">
          {BIOGRAPHY_PARAGRAPHS.map((para, i) => (
            <p
              key={i}
              className={i === 0 ? "text-xl italic leading-relaxed" : "text-base leading-8"}
              style={{
                color: i === 0 ? "#6f665e" : "#2b2a28",
                fontFamily: i === 0
                  ? "var(--font-cormorant), serif"
                  : "var(--font-lato), sans-serif",
                fontWeight: i === 0 ? 400 : 300,
              }}
            >
              {para}
            </p>
          ))}

          {/* Closing line */}
          <div className="pt-4 border-t" style={{ borderColor: "#e3ded6" }}>
            <p
              className="text-center text-lg italic"
              style={{ color: "#8b5e34", fontFamily: "var(--font-cormorant), serif" }}
            >
              June 11, 1977 — March 31, 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Divider({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-4 my-12">
      <div
        className="flex-1 h-px"
        style={{ background: "linear-gradient(to right, transparent, #d6ccc2, transparent)" }}
      />
      {label && (
        <span
          className="text-xs uppercase tracking-[0.35em] px-2 shrink-0"
          style={{ color: "#8b5e34", fontFamily: "var(--font-lato), sans-serif" }}
        >
          {label}
        </span>
      )}
      <div
        className="flex-1 h-px"
        style={{ background: "linear-gradient(to right, transparent, #d6ccc2, transparent)" }}
      />
    </div>
  );
}

const CHAR_LIMIT = 160;

function CondolenceCard({
  condolence,
  onClick,
}: {
  condolence: Condolence;
  onClick: () => void;
}) {
  const truncated = condolence.message.length > CHAR_LIMIT;
  const preview = truncated
    ? condolence.message.slice(0, CHAR_LIMIT).trimEnd() + "..."
    : condolence.message;

  return (
    <div
      onClick={onClick}
      className="p-6 border cursor-pointer transition-colors duration-200"
      style={{ background: "#faf7f2", borderColor: "#e3ded6" }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#c17f59"; e.currentTarget.style.background = "#fffdf9"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e3ded6"; e.currentTarget.style.background = "#faf7f2"; }}
    >
      <p
        className="leading-relaxed mb-4"
        style={{
          color: "#6f665e",
          fontFamily: "var(--font-cormorant), serif",
          fontSize: "1.1rem",
          fontStyle: "italic",
        }}
      >
        &ldquo;{preview}&rdquo;
      </p>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <span
          className="text-sm font-semibold"
          style={{ color: "#8b5e34", fontFamily: "var(--font-lato), sans-serif" }}
        >
          {condolence.name}
        </span>
        <div className="flex items-center gap-3">
          {truncated && (
            <span
              className="text-xs uppercase tracking-[0.15em]"
              style={{ color: "#c17f59", fontFamily: "var(--font-lato), sans-serif" }}
            >
              Read more
            </span>
          )}
          <span className="text-xs" style={{ color: "#d6ccc2" }}>
            {new Date(condolence.created_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

function CondolenceModal({
  condolences,
  index,
  onClose,
  onNavigate,
}: {
  condolences: Condolence[];
  index: number;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const c = condolences[index];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && index > 0) onNavigate(index - 1);
      if (e.key === "ArrowRight" && index < condolences.length - 1) onNavigate(index + 1);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, condolences.length, onClose, onNavigate]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(43,42,40,0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg"
        style={{ background: "#fffdf9", border: "1px solid #e3ded6" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-7 py-4 border-b"
          style={{ borderColor: "#e3ded6" }}
        >
          <span
            className="text-xs uppercase tracking-[0.3em]"
            style={{ color: "#8b5e34", fontFamily: "var(--font-lato), sans-serif" }}
          >
            Condolence {index + 1} of {condolences.length}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center border transition-colors"
            style={{ borderColor: "#e3ded6", color: "#6f665e" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#8b5e34"; e.currentTarget.style.color = "#8b5e34"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e3ded6"; e.currentTarget.style.color = "#6f665e"; }}
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-7 py-8">
          <p
            className="text-xl italic leading-relaxed mb-6"
            style={{ color: "#2b2a28", fontFamily: "var(--font-cormorant), serif" }}
          >
            &ldquo;{c.message}&rdquo;
          </p>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span
              className="text-sm font-semibold"
              style={{ color: "#8b5e34", fontFamily: "var(--font-lato), sans-serif" }}
            >
              {c.name}
            </span>
            <span className="text-xs" style={{ color: "#d6ccc2", fontFamily: "var(--font-lato), sans-serif" }}>
              {new Date(c.created_at).toLocaleDateString("en-GB", {
                day: "numeric", month: "long", year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div
          className="flex items-center justify-between px-7 py-4 border-t"
          style={{ borderColor: "#e3ded6" }}
        >
          <button
            onClick={() => onNavigate(index - 1)}
            disabled={index === 0}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] transition-colors disabled:opacity-30"
            style={{ color: "#6f665e", fontFamily: "var(--font-lato), sans-serif" }}
            onMouseEnter={(e) => { if (index > 0) e.currentTarget.style.color = "#8b5e34"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#6f665e"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Previous
          </button>

          <div className="flex gap-1.5">
            {condolences.map((_, i) => (
              <button
                key={i}
                onClick={() => onNavigate(i)}
                className="w-1.5 h-1.5 rounded-full transition-colors"
                style={{ background: i === index ? "#8b5e34" : "#e3ded6" }}
                aria-label={`Go to condolence ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => onNavigate(index + 1)}
            disabled={index === condolences.length - 1}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] transition-colors disabled:opacity-30"
            style={{ color: "#6f665e", fontFamily: "var(--font-lato), sans-serif" }}
            onMouseEnter={(e) => { if (index < condolences.length - 1) e.currentTarget.style.color = "#8b5e34"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#6f665e"; }}
          >
            Next
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

const PHOTOS_PER_PAGE = 4;
const TOTAL_PHOTOS = 12;

export default function MemorialPage() {
  const [condolences, setCondolences] = useState<Condolence[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [galleryPage, setGalleryPage] = useState(1);
  const [biographyOpen, setBiographyOpen] = useState(false);
  const [condolencePage, setCondolencePage] = useState(1);
  const [selectedCondolence, setSelectedCondolence] = useState<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const CONDOLENCES_PER_PAGE = 3;
  const totalCondolencePages = Math.ceil(condolences.length / CONDOLENCES_PER_PAGE);
  const pagedCondolences = condolences.slice(
    (condolencePage - 1) * CONDOLENCES_PER_PAGE,
    condolencePage * CONDOLENCES_PER_PAGE
  );

  const totalGalleryPages = Math.ceil(TOTAL_PHOTOS / PHOTOS_PER_PAGE);
  const galleryStart = (galleryPage - 1) * PHOTOS_PER_PAGE + 1;
  const galleryEnd = Math.min(galleryPage * PHOTOS_PER_PAGE, TOTAL_PHOTOS);

  useEffect(() => {
    fetch("/api/condolences")
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setCondolences(data))
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/condolences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");
      setCondolences((prev) => [data, ...prev]);
      setName("");
      setMessage("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function copyToClipboard(text: string, field: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  }

  const nigerianBankDetails = [
    { label: "Bank Name", value: "First Bank of Nigeria" },
    { label: "Account Name", value: "Nwosu Family Fund" },
    { label: "Account Number", value: "0123456789" },
  ];

  return (
    <main style={{ background: "#fffdf9", minHeight: "100vh" }}>
      {biographyOpen && <BiographyModal onClose={() => setBiographyOpen(false)} />}
      {selectedCondolence !== null && (
        <CondolenceModal
          condolences={condolences}
          index={selectedCondolence}
          onClose={() => setSelectedCondolence(null)}
          onNavigate={(i) => setSelectedCondolence(i)}
        />
      )}

      {/* HERO */}
      <section
        className="flex flex-col items-center justify-center text-center px-6 py-16"
        style={{ background: "#faf7f2", borderBottom: "1px solid #e3ded6" }}
      >
        {/* Portrait */}
        <div
          className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 mx-auto mb-7 flex items-center justify-center"
          style={{ borderColor: "#d6ccc2", background: "#e3ded6" }}
        >
          <Image
            src="/portrait.jpg"
            alt="Chief Engineer Godswill Nwosu"
            width={208}
            height={208}
            className="object-cover w-full h-full"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        <p
          className="uppercase tracking-[0.4em] text-xs mb-3"
          style={{ color: "#8b5e34", fontFamily: "var(--font-lato), sans-serif" }}
        >
          In Loving Memory of
        </p>

        <h1
          className="text-4xl md:text-6xl leading-tight mb-3"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            color: "#2b2a28",
            fontWeight: 700,
          }}
        >
          Chief Engineer
          <br />
          <em>Godswill Nwosu</em>
        </h1>

        <p
          className="tracking-[0.25em] text-sm mb-6"
          style={{ color: "#d6ccc2", fontFamily: "var(--font-lato), sans-serif" }}
        >
          June 11, 1977 &mdash; March 31, 2026
        </p>

        <p
          className="max-w-lg text-lg md:text-xl leading-relaxed italic mb-8"
          style={{ color: "#6f665e", fontFamily: "var(--font-cormorant), serif" }}
        >
          A life of service, honour, and love. Forever in our hearts.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="#biography"
            className="px-8 py-3 text-xs uppercase tracking-[0.3em] border transition-colors duration-200"
            style={{ borderColor: "#8b5e34", background: "#8b5e34", color: "#fffdf9", fontFamily: "var(--font-lato), sans-serif" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#c17f59"; e.currentTarget.style.borderColor = "#c17f59"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#8b5e34"; e.currentTarget.style.borderColor = "#8b5e34"; }}
          >
            Read His Story
          </a>
          <a
            href="#condolences"
            className="px-8 py-3 text-xs uppercase tracking-[0.3em] border transition-colors duration-200"
            style={{ borderColor: "#d6ccc2", color: "#6f665e", fontFamily: "var(--font-lato), sans-serif" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#6f665e";
              e.currentTarget.style.color = "#2b2a28";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#d6ccc2";
              e.currentTarget.style.color = "#6f665e";
            }}
          >
            Leave a Message
          </a>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6">

        {/* BIOGRAPHY */}
        <section id="biography" className="py-20">
          <Divider label="Biography" />

          <h2
            className="text-4xl md:text-5xl text-center mb-12"
            style={{ fontFamily: "var(--font-cormorant), serif", color: "#2b2a28", fontWeight: 700 }}
          >
            A Life Well Lived
          </h2>

          {/* Opening quote */}
          <p
            className="text-xl md:text-2xl italic leading-relaxed text-center mb-8"
            style={{ color: "#6f665e", fontFamily: "var(--font-cormorant), serif" }}
          >
            &ldquo;In the same manner that a shooting star momentarily adorns the sky before fading from view, this great man briefly but surely illuminated the world for 48 years.&rdquo;
          </p>

          <p
            className="text-base leading-8 mb-10 text-center"
            style={{ color: "#2b2a28", fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
          >
            Godswill Chinemeze Nwosu was born on June 11, 1977, to the humble Christian trading family of Sir and Lady Zeph Nwosu. Over the course of his 48 years, he touched innumerable lives, served in the church and his community, built a great family, and impacted generations with his humility and unrelenting philanthropy.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <button
              onClick={() => setBiographyOpen(true)}
              className="px-8 py-3 text-xs uppercase tracking-[0.3em] border transition-colors duration-200"
              style={{ borderColor: "#8b5e34", background: "#8b5e34", color: "#fffdf9", fontFamily: "var(--font-lato), sans-serif" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#c17f59"; e.currentTarget.style.borderColor = "#c17f59"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#8b5e34"; e.currentTarget.style.borderColor = "#8b5e34"; }}
            >
              Read Full Biography
            </button>

            <a
              href="/biography.pdf"
              download
              className="flex items-center gap-2 px-8 py-3 text-xs uppercase tracking-[0.3em] border transition-colors duration-200"
              style={{ borderColor: "#e3ded6", color: "#6f665e", fontFamily: "var(--font-lato), sans-serif" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#8b5e34"; e.currentTarget.style.color = "#8b5e34"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e3ded6"; e.currentTarget.style.color = "#6f665e"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 15V3m0 12-4-4m4 4 4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17" />
              </svg>
              Download PDF
            </a>
          </div>
        </section>

        {/* GALLERY */}
        <section className="py-10">
          <Divider label="Gallery" />
          <h2
            className="text-4xl md:text-5xl text-center mb-12"
            style={{ fontFamily: "var(--font-cormorant), serif", color: "#2b2a28", fontWeight: 700 }}
          >
            Chinemeze.
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: PHOTOS_PER_PAGE }, (_, i) => galleryStart + i).map((n) => (
              <div
                key={n}
                className="aspect-square flex items-center justify-center text-xs uppercase tracking-widest"
                style={{ background: "#faf7f2", color: "#e3ded6", border: "1px solid #e3ded6" }}
              >
                Photo {n}
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={() => setGalleryPage((p) => Math.max(1, p - 1))}
              disabled={galleryPage === 1}
              className="text-xs uppercase tracking-[0.2em] px-4 py-2 border transition-colors disabled:opacity-30"
              style={{
                borderColor: "#e3ded6",
                color: "#6f665e",
                fontFamily: "var(--font-lato), sans-serif",
              }}
              onMouseEnter={(e) => { if (galleryPage !== 1) e.currentTarget.style.borderColor = "#8b5e34"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e3ded6"; }}
            >
              Previous
            </button>

            <span
              className="text-xs"
              style={{ color: "#d6ccc2", fontFamily: "var(--font-lato), sans-serif" }}
            >
              {galleryPage} / {totalGalleryPages}
            </span>

            <button
              onClick={() => setGalleryPage((p) => Math.min(totalGalleryPages, p + 1))}
              disabled={galleryPage === totalGalleryPages}
              className="text-xs uppercase tracking-[0.2em] px-4 py-2 border transition-colors disabled:opacity-30"
              style={{
                borderColor: "#e3ded6",
                color: "#6f665e",
                fontFamily: "var(--font-lato), sans-serif",
              }}
              onMouseEnter={(e) => { if (galleryPage !== totalGalleryPages) e.currentTarget.style.borderColor = "#8b5e34"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e3ded6"; }}
            >
              Next
            </button>
          </div>

          <p
            className="text-center text-xs mt-4 uppercase tracking-widest"
            style={{ color: "#d6ccc2", fontFamily: "var(--font-lato), sans-serif" }}
          >
            Photos will be added here
          </p>
        </section>

        {/* CONDOLENCES */}
        <section id="condolences" className="py-20">
          <Divider label="Condolences" />

          <h2
            className="text-4xl md:text-5xl text-center mb-4"
            style={{ fontFamily: "var(--font-cormorant), serif", color: "#2b2a28", fontWeight: 700 }}
          >
            Share Your Condolences
          </h2>
          <p
            className="text-center text-sm mb-10"
            style={{ color: "#6f665e", fontFamily: "var(--font-lato), sans-serif" }}
          >
            Leave a message of comfort for the family
          </p>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="border p-6 md:p-8 mb-10 space-y-5"
            style={{ borderColor: "#e3ded6", background: "#faf7f2" }}
          >
            <div>
              <label
                className="block text-xs uppercase tracking-[0.2em] mb-2"
                style={{ color: "#8b5e34", fontFamily: "var(--font-lato), sans-serif" }}
              >
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. John Okafor"
                className="w-full px-4 py-3 text-sm outline-none"
                style={{
                  background: "#fffdf9",
                  border: "1px solid #e3ded6",
                  color: "#2b2a28",
                  fontFamily: "var(--font-lato), sans-serif",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#8b5e34")}
                onBlur={(e) => (e.target.style.borderColor = "#e3ded6")}
              />
            </div>

            <div>
              <label
                className="block text-xs uppercase tracking-[0.2em] mb-2"
                style={{ color: "#8b5e34", fontFamily: "var(--font-lato), sans-serif" }}
              >
                Your Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                placeholder="Share a memory or words of comfort..."
                className="w-full px-4 py-3 text-sm outline-none resize-none"
                style={{
                  background: "#fffdf9",
                  border: "1px solid #e3ded6",
                  color: "#2b2a28",
                  fontFamily: "var(--font-lato), sans-serif",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#8b5e34")}
                onBlur={(e) => (e.target.style.borderColor = "#e3ded6")}
              />
            </div>

            {formError && (
              <p className="text-sm" style={{ color: "#c17f59", fontFamily: "var(--font-lato), sans-serif" }}>
                {formError}
              </p>
            )}

            {submitted && (
              <p className="text-sm" style={{ color: "#8b5e34", fontFamily: "var(--font-lato), sans-serif" }}>
                Your condolence has been shared. Thank you.
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 text-xs uppercase tracking-[0.3em] transition-colors duration-200 disabled:opacity-50"
              style={{
                background: "#8b5e34",
                color: "#fffdf9",
                fontFamily: "var(--font-lato), sans-serif",
                fontWeight: 700,
              }}
              onMouseEnter={(e) => {
                if (!submitting) e.currentTarget.style.background = "#c17f59";
              }}
              onMouseLeave={(e) => {
                if (!submitting) e.currentTarget.style.background = "#8b5e34";
              }}
            >
              {submitting ? "Submitting..." : "Submit Condolence"}
            </button>
          </form>

          {condolences.length > 0 ? (
            <div>
              <p
                className="text-xs uppercase tracking-[0.25em] mb-6"
                style={{ color: "#d6ccc2", fontFamily: "var(--font-lato), sans-serif" }}
              >
                {condolences.length} message{condolences.length !== 1 ? "s" : ""} of condolence
              </p>

              <div className="space-y-4 mb-8">
                {pagedCondolences.map((c, i) => {
                  const globalIndex = (condolencePage - 1) * CONDOLENCES_PER_PAGE + i;
                  return (
                    <CondolenceCard
                      key={c.id}
                      condolence={c}
                      onClick={() => setSelectedCondolence(globalIndex)}
                    />
                  );
                })}
              </div>

              {totalCondolencePages > 1 && (
                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={() => setCondolencePage((p) => Math.max(1, p - 1))}
                    disabled={condolencePage === 1}
                    className="text-xs uppercase tracking-[0.2em] px-4 py-2 border transition-colors disabled:opacity-30"
                    style={{ borderColor: "#e3ded6", color: "#6f665e", fontFamily: "var(--font-lato), sans-serif" }}
                    onMouseEnter={(e) => { if (condolencePage !== 1) e.currentTarget.style.borderColor = "#8b5e34"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e3ded6"; }}
                  >
                    Previous
                  </button>
                  <span
                    className="text-xs"
                    style={{ color: "#d6ccc2", fontFamily: "var(--font-lato), sans-serif" }}
                  >
                    {condolencePage} / {totalCondolencePages}
                  </span>
                  <button
                    onClick={() => setCondolencePage((p) => Math.min(totalCondolencePages, p + 1))}
                    disabled={condolencePage === totalCondolencePages}
                    className="text-xs uppercase tracking-[0.2em] px-4 py-2 border transition-colors disabled:opacity-30"
                    style={{ borderColor: "#e3ded6", color: "#6f665e", fontFamily: "var(--font-lato), sans-serif" }}
                    onMouseEnter={(e) => { if (condolencePage !== totalCondolencePages) e.currentTarget.style.borderColor = "#8b5e34"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e3ded6"; }}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p
              className="text-center text-sm"
              style={{ color: "#d6ccc2", fontFamily: "var(--font-lato), sans-serif" }}
            >
              Be the first to leave a message of condolence.
            </p>
          )}
        </section>

        {/* DONATIONS */}
        <section id="donate" className="py-20">
          <Divider label="Condolence Gift" />

          <h2
            className="text-4xl md:text-5xl text-center mb-4"
            style={{ fontFamily: "var(--font-cormorant), serif", color: "#2b2a28", fontWeight: 700 }}
          >
            Send a Condolence Gift
          </h2>
          <p
            className="text-center text-sm mb-10 max-w-lg mx-auto"
            style={{ color: "#6f665e", fontFamily: "var(--font-lato), sans-serif" }}
          >
            If you wish to support the Nwosu family during this difficult time,
            kindly make a donation to the account details below.
          </p>

          <div
            className="p-6 border"
            style={{ background: "#faf7f2", borderColor: "#e3ded6" }}
          >
            <p
              className="text-xs uppercase tracking-[0.3em] mb-6"
              style={{ color: "#8b5e34", fontFamily: "var(--font-lato), sans-serif" }}
            >
              Nigerian Account (Naira)
            </p>
            <div className="space-y-4">
              {nigerianBankDetails.map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between gap-4">
                  <div>
                    <p
                      className="text-xs mb-0.5"
                      style={{ color: "#d6ccc2", fontFamily: "var(--font-lato), sans-serif" }}
                    >
                      {label}
                    </p>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "#2b2a28", fontFamily: "var(--font-lato), sans-serif" }}
                    >
                      {value}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(value, label)}
                    className="text-xs px-3 py-1.5 border transition-colors shrink-0"
                    style={{
                      borderColor: copiedField === label ? "#8b5e34" : "#e3ded6",
                      color: copiedField === label ? "#8b5e34" : "#6f665e",
                      fontFamily: "var(--font-lato), sans-serif",
                    }}
                  >
                    {copiedField === label ? "Copied" : "Copy"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <p
            className="text-center text-lg italic mt-10"
            style={{ color: "#6f665e", fontFamily: "var(--font-cormorant), serif" }}
          >
            Thank you for your kindness and support.
          </p>
          <p
            className="text-center text-xs mt-3"
            style={{ color: "#d6ccc2", fontFamily: "var(--font-lato), sans-serif" }}
          >
            For enquiries, please contact the family directly.
          </p>
        </section>

      </div>

      {/* FOOTER */}
      <footer
        className="text-center py-16 px-6 border-t"
        style={{ borderColor: "#e3ded6", background: "#faf7f2" }}
      >
        <div
          className="w-px h-12 mx-auto mb-8"
          style={{ background: "linear-gradient(to bottom, transparent, #d6ccc2)" }}
        />
        <p
          className="text-2xl italic mb-3"
          style={{ fontFamily: "var(--font-cormorant), serif", color: "#6f665e" }}
        >
          Until we meet again
        </p>
        <p
          className="text-xs tracking-[0.35em] uppercase"
          style={{ color: "#d6ccc2", fontFamily: "var(--font-lato), sans-serif" }}
        >
          Forever in our hearts
        </p>
      </footer>
    </main>
  );
}
