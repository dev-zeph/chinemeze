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

const MODAL_OVERLAY: React.CSSProperties = {
  background: "rgba(43,42,40,0.65)",
  backdropFilter: "blur(4px)",
};

const MODAL_SHELL: React.CSSProperties = {
  background: "#fffdf9",
  border: "1px solid #e3ded6",
  maxHeight: "calc(100dvh - 2rem)",
};

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      className="shrink-0 w-8 h-8 flex items-center justify-center border transition-colors"
      style={{ borderColor: "#e3ded6", color: "#6f665e" }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#8b5e34"; e.currentTarget.style.color = "#8b5e34"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e3ded6"; e.currentTarget.style.color = "#6f665e"; }}
      aria-label="Close"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </button>
  );
}

function BiographyModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      style={MODAL_OVERLAY}
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-2xl flex flex-col min-h-0"
        style={MODAL_SHELL}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="shrink-0 flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: "#e3ded6" }}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] mb-0.5" style={{ color: "#8b5e34", fontFamily: "var(--font-lato), sans-serif" }}>
              Biography
            </p>
            <h3 className="text-lg md:text-xl" style={{ fontFamily: "var(--font-cormorant), serif", color: "#2b2a28", fontWeight: 700 }}>
              Chief Engr. Godswill Nwosu (KSC)
            </h3>
          </div>
          <CloseButton onClose={onClose} />
        </div>

        {/* Scrollable body */}
        <div
          className="flex-1 overflow-y-auto min-h-0 px-6 py-6 space-y-5"
          style={{ WebkitOverflowScrolling: "touch" as unknown as undefined, overscrollBehavior: "contain" }}
        >
          {BIOGRAPHY_PARAGRAPHS.map((para, i) => (
            <p
              key={i}
              className={i === 0 ? "text-base italic leading-relaxed" : "text-sm leading-7"}
              style={{
                color: i === 0 ? "#6f665e" : "#2b2a28",
                fontFamily: i === 0 ? "var(--font-cormorant), serif" : "var(--font-lato), sans-serif",
                fontWeight: i === 0 ? 400 : 300,
              }}
            >
              {para}
            </p>
          ))}
          <div className="pt-4 border-t" style={{ borderColor: "#e3ded6" }}>
            <p className="text-center text-base italic" style={{ color: "#8b5e34", fontFamily: "var(--font-cormorant), serif" }}>
              June 11, 1977 — May 31, 2026
            </p>
          </div>
        </div>

        {/* Footer hint */}
        <div
          className="shrink-0 flex items-center justify-center py-3 border-t"
          style={{ borderColor: "#e3ded6", background: "#faf7f2" }}
        >
          <span className="text-xs uppercase tracking-[0.2em]" style={{ color: "#d6ccc2", fontFamily: "var(--font-lato), sans-serif" }}>
            scroll to read more
          </span>
        </div>
      </div>
    </div>
  );
}

type Photo = { name: string; url: string; created_at?: string };

type FileEntry = { file: File; preview: string; status: "pending" | "uploading" | "done" | "error"; error?: string };

function UploadModal({ onClose, onUploaded }: { onClose: () => void; onUploaded: (p: Photo) => void }) {
  const [entries, setEntries] = useState<FileEntry[]>([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) { if (e.key === "Escape" && !uploading) onClose(); }
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose, uploading]);

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    const next: FileEntry[] = Array.from(fileList).map((f) => ({
      file: f,
      preview: URL.createObjectURL(f),
      status: "pending",
    }));
    setEntries((prev) => [...prev, ...next]);
  }

  function removeEntry(i: number) {
    setEntries((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleUpload() {
    if (entries.length === 0) return;
    setUploading(true);

    for (let i = 0; i < entries.length; i++) {
      if (entries[i].status === "done") continue;
      setEntries((prev) => prev.map((e, idx) => idx === i ? { ...e, status: "uploading" } : e));
      try {
        const fd = new FormData();
        fd.append("photo", entries[i].file);
        const res = await fetch("/api/photos", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        onUploaded(data);
        setEntries((prev) => prev.map((e, idx) => idx === i ? { ...e, status: "done" } : e));
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed";
        setEntries((prev) => prev.map((e, idx) => idx === i ? { ...e, status: "error", error: msg } : e));
      }
    }
    setUploading(false);
  }

  const allDone = entries.length > 0 && entries.every((e) => e.status === "done");
  const hasErrors = entries.some((e) => e.status === "error");
  const pending = entries.filter((e) => e.status !== "done").length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      style={MODAL_OVERLAY}
      onClick={() => { if (!uploading) onClose(); }}
    >
      <div
        className="w-full sm:max-w-lg flex flex-col min-h-0"
        style={MODAL_SHELL}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#e3ded6" }}>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] mb-0.5" style={{ color: "#8b5e34", fontFamily: "var(--font-lato), sans-serif" }}>Gallery</p>
            <h3 className="text-lg" style={{ fontFamily: "var(--font-cormorant), serif", color: "#2b2a28", fontWeight: 700 }}>
              Upload Photos {entries.length > 0 && <span style={{ color: "#d6ccc2" }}>({entries.length})</span>}
            </h3>
          </div>
          {!uploading && <CloseButton onClose={onClose} />}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto min-h-0 px-6 py-5 space-y-4" style={{ overscrollBehavior: "contain" }}>
          {/* Drop zone */}
          <div
            className="border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors py-8"
            style={{ borderColor: entries.length > 0 ? "#8b5e34" : "#e3ded6", background: "#faf7f2" }}
            onClick={() => inputRef.current?.click()}
            onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
            onDragOver={(e) => e.preventDefault()}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d6ccc2" strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
            </svg>
            <p className="text-xs uppercase tracking-[0.2em] text-center" style={{ color: "#d6ccc2", fontFamily: "var(--font-lato), sans-serif" }}>
              {entries.length > 0 ? "Add more photos" : "Tap to select or drag photos here"}
            </p>
            <p className="text-xs" style={{ color: "#e3ded6", fontFamily: "var(--font-lato), sans-serif" }}>
              JPEG · PNG · WebP · GIF — max 10 MB each
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }}
          />

          {/* Preview grid */}
          {entries.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {entries.map((entry, i) => (
                <div key={i} className="relative aspect-square overflow-hidden" style={{ border: "1px solid #e3ded6" }}>
                  <img src={entry.preview} alt="" className="w-full h-full object-cover" />

                  {/* Status overlay */}
                  {entry.status === "uploading" && (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(255,253,249,0.75)" }}>
                      <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5e34" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                    </div>
                  )}
                  {entry.status === "done" && (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(255,253,249,0.75)" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8b5e34" strokeWidth="2">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                  )}
                  {entry.status === "error" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-1" style={{ background: "rgba(255,253,249,0.85)" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c17f59" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
                      </svg>
                      <span className="text-center leading-tight" style={{ color: "#c17f59", fontSize: "0.6rem", fontFamily: "var(--font-lato), sans-serif" }}>
                        {entry.error ?? "Failed"}
                      </span>
                    </div>
                  )}

                  {/* Remove button — only when not uploading */}
                  {entry.status === "pending" && !uploading && (
                    <button
                      onClick={(e) => { e.stopPropagation(); removeEntry(i); }}
                      className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center"
                      style={{ background: "rgba(43,42,40,0.6)", color: "#fff" }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 flex gap-3 px-6 py-4 border-t" style={{ borderColor: "#e3ded6", background: "#faf7f2" }}>
          <button
            onClick={allDone ? onClose : () => { if (!uploading) onClose(); }}
            className="flex-1 py-3 text-xs uppercase tracking-[0.25em] border transition-colors"
            style={{ borderColor: "#e3ded6", color: "#6f665e", fontFamily: "var(--font-lato), sans-serif" }}
          >
            {allDone ? "Done" : "Cancel"}
          </button>
          {!allDone && (
            <button
              onClick={handleUpload}
              disabled={entries.length === 0 || uploading}
              className="flex-1 py-3 text-xs uppercase tracking-[0.25em] transition-colors disabled:opacity-40"
              style={{ background: "#8b5e34", color: "#fffdf9", fontFamily: "var(--font-lato), sans-serif" }}
              onMouseEnter={(e) => { if (!uploading) e.currentTarget.style.background = "#c17f59"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#8b5e34"; }}
            >
              {uploading
                ? `Uploading ${entries.filter((e) => e.status === "done").length}/${entries.length}...`
                : `Upload ${pending > 0 ? pending : entries.length} Photo${entries.length !== 1 ? "s" : ""}`}
            </button>
          )}
          {hasErrors && allDone === false && !uploading && (
            <button
              onClick={handleUpload}
              className="flex-1 py-3 text-xs uppercase tracking-[0.25em] border transition-colors"
              style={{ borderColor: "#c17f59", color: "#c17f59", fontFamily: "var(--font-lato), sans-serif" }}
            >
              Retry failed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function PhotoLightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && index > 0) onNavigate(index - 1);
      if (e.key === "ArrowRight" && index < photos.length - 1) onNavigate(index + 1);
    }
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose, onNavigate, index, photos.length]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    if (delta < 0 && index < photos.length - 1) onNavigate(index + 1);
    if (delta > 0 && index > 0) onNavigate(index - 1);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(43,42,40,0.95)" }}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center border transition-colors z-10"
        style={{ borderColor: "#6f665e", color: "#d6ccc2" }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#d6ccc2"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#6f665e"; }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Counter */}
      <div
        className="absolute top-4 left-4 text-xs z-10"
        style={{ color: "#6f665e", fontFamily: "var(--font-lato), sans-serif", letterSpacing: "0.15em" }}
      >
        {index + 1} / {photos.length}
      </div>

      {/* Prev arrow */}
      {index > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(index - 1); }}
          className="absolute left-3 md:left-6 w-10 h-10 flex items-center justify-center border transition-colors z-10"
          style={{ borderColor: "#6f665e", color: "#d6ccc2" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#d6ccc2"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#6f665e"; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {/* Image */}
      <img
        src={photos[index].url}
        alt="Gallery photo"
        className="max-w-full max-h-[90dvh] object-contain px-16"
        onClick={(e) => e.stopPropagation()}
        style={{ userSelect: "none" }}
      />

      {/* Next arrow */}
      {index < photos.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(index + 1); }}
          className="absolute right-3 md:right-6 w-10 h-10 flex items-center justify-center border transition-colors z-10"
          style={{ borderColor: "#6f665e", color: "#d6ccc2" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#d6ccc2"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#6f665e"; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      {/* Dot indicators */}
      {photos.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); onNavigate(i); }}
              className="w-1.5 h-1.5 rounded-full transition-colors"
              style={{ background: i === index ? "#d6ccc2" : "#6f665e" }}
            />
          ))}
        </div>
      )}
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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      style={MODAL_OVERLAY}
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-lg flex flex-col min-h-0"
        style={MODAL_SHELL}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="shrink-0 flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: "#e3ded6" }}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] mb-0.5" style={{ color: "#8b5e34", fontFamily: "var(--font-lato), sans-serif" }}>
              Condolence
            </p>
            <h3 className="text-lg" style={{ fontFamily: "var(--font-cormorant), serif", color: "#2b2a28", fontWeight: 700 }}>
              {c.name}
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs" style={{ color: "#d6ccc2", fontFamily: "var(--font-lato), sans-serif" }}>
              {index + 1}/{condolences.length}
            </span>
            <CloseButton onClose={onClose} />
          </div>
        </div>

        {/* Scrollable body */}
        <div
          className="flex-1 overflow-y-auto min-h-0 px-6 py-6"
          style={{ WebkitOverflowScrolling: "touch" as unknown as undefined, overscrollBehavior: "contain" }}
        >
          <p
            className="text-xl md:text-2xl italic leading-relaxed mb-6"
            style={{ color: "#2b2a28", fontFamily: "var(--font-cormorant), serif" }}
          >
            &ldquo;{c.message}&rdquo;
          </p>
          <div className="pt-4 border-t" style={{ borderColor: "#e3ded6" }}>
            <span className="text-xs" style={{ color: "#d6ccc2", fontFamily: "var(--font-lato), sans-serif" }}>
              {new Date(c.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div
          className="shrink-0 flex items-center justify-between px-6 py-3 border-t"
          style={{ borderColor: "#e3ded6", background: "#faf7f2" }}
        >
          <button
            onClick={() => onNavigate(index - 1)}
            disabled={index === 0}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] transition-colors disabled:opacity-30"
            style={{ color: "#6f665e", fontFamily: "var(--font-lato), sans-serif" }}
            onMouseEnter={(e) => { if (index > 0) e.currentTarget.style.color = "#8b5e34"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#6f665e"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
            Prev
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
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

const PHOTOS_PER_PAGE = 4;

export default function MemorialPage() {
  const [condolences, setCondolences] = useState<Condolence[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [galleryPage, setGalleryPage] = useState(1);
  const [biographyOpen, setBiographyOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [condolencePage, setCondolencePage] = useState(1);
  const [selectedCondolence, setSelectedCondolence] = useState<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const CONDOLENCES_PER_PAGE = 3;
  const totalCondolencePages = Math.ceil(condolences.length / CONDOLENCES_PER_PAGE);
  const pagedCondolences = condolences.slice(
    (condolencePage - 1) * CONDOLENCES_PER_PAGE,
    condolencePage * CONDOLENCES_PER_PAGE
  );

  const totalGalleryPages = Math.max(1, Math.ceil(photos.length / PHOTOS_PER_PAGE));
  const pagedPhotos = photos.slice((galleryPage - 1) * PHOTOS_PER_PAGE, galleryPage * PHOTOS_PER_PAGE);

  useEffect(() => {
    fetch("/api/condolences")
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setCondolences(data))
      .catch(() => {});
    fetch("/api/photos")
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setPhotos(data))
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


  return (
    <main style={{ background: "#fffdf9", minHeight: "100vh" }}>
      {biographyOpen && <BiographyModal onClose={() => setBiographyOpen(false)} />}
      {uploadOpen && (
        <UploadModal
          onClose={() => setUploadOpen(false)}
          onUploaded={(p) => { setPhotos((prev) => [p, ...prev]); setGalleryPage(1); }}
        />
      )}
      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={photos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(i) => setLightboxIndex(i)}
        />
      )}
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
            src="/godswill.png"
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
          June 11, 1977 &mdash; May 31, 2026
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

          <div className="flex items-center justify-between mb-10">
            <h2
              className="text-4xl md:text-5xl"
              style={{ fontFamily: "var(--font-cormorant), serif", color: "#2b2a28", fontWeight: 700 }}
            >
              Chinemeze.
            </h2>
            <button
              onClick={() => setUploadOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.2em] border transition-colors"
              style={{ borderColor: "#8b5e34", color: "#8b5e34", fontFamily: "var(--font-lato), sans-serif" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#8b5e34"; e.currentTarget.style.color = "#fffdf9"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#8b5e34"; }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
              </svg>
              Add Photo
            </button>
          </div>

          {photos.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center gap-3 py-16 border border-dashed"
              style={{ borderColor: "#e3ded6" }}
            >
              <p className="text-sm" style={{ color: "#d6ccc2", fontFamily: "var(--font-lato), sans-serif" }}>
                No photos yet. Be the first to share a memory.
              </p>
              <button
                onClick={() => setUploadOpen(true)}
                className="text-xs uppercase tracking-[0.2em] px-5 py-2.5 transition-colors"
                style={{ background: "#8b5e34", color: "#fffdf9", fontFamily: "var(--font-lato), sans-serif" }}
              >
                Upload Photo
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                {pagedPhotos.map((photo) => (
                  <div
                    key={photo.name}
                    className="aspect-square overflow-hidden cursor-pointer relative group"
                    style={{ border: "1px solid #e3ded6" }}
                    onClick={() => setLightboxIndex(photos.indexOf(photo))}
                  >
                    <img
                      src={photo.url}
                      alt="Gallery"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>

              {totalGalleryPages > 1 && (
                <div className="flex items-center justify-center gap-6 mt-8">
                  <button
                    onClick={() => setGalleryPage((p) => Math.max(1, p - 1))}
                    disabled={galleryPage === 1}
                    className="text-xs uppercase tracking-[0.2em] px-4 py-2 border transition-colors disabled:opacity-30"
                    style={{ borderColor: "#e3ded6", color: "#6f665e", fontFamily: "var(--font-lato), sans-serif" }}
                    onMouseEnter={(e) => { if (galleryPage !== 1) e.currentTarget.style.borderColor = "#8b5e34"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e3ded6"; }}
                  >
                    Previous
                  </button>
                  <span className="text-xs" style={{ color: "#d6ccc2", fontFamily: "var(--font-lato), sans-serif" }}>
                    {galleryPage} / {totalGalleryPages}
                  </span>
                  <button
                    onClick={() => setGalleryPage((p) => Math.min(totalGalleryPages, p + 1))}
                    disabled={galleryPage === totalGalleryPages}
                    className="text-xs uppercase tracking-[0.2em] px-4 py-2 border transition-colors disabled:opacity-30"
                    style={{ borderColor: "#e3ded6", color: "#6f665e", fontFamily: "var(--font-lato), sans-serif" }}
                    onMouseEnter={(e) => { if (galleryPage !== totalGalleryPages) e.currentTarget.style.borderColor = "#8b5e34"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e3ded6"; }}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
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
