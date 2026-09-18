import { useState, type FormEvent } from "react";
import { Star, X, CheckCircle2, MessageSquareHeart, Sparkles } from "lucide-react";
import { API_BASE } from "@/lib/constants";

export interface SubmittedFeedback {
  _id: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
  course?: string | undefined;
  submittedAt: string;
}

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFeedbackAdded?: (feedback: SubmittedFeedback) => void;
}

const RATING_DESCRIPTIONS: Record<number, string> = {
  1: "Needs Improvement",
  2: "Fair / Satisfactory",
  3: "Good / Solid Experience",
  4: "Very Good / Highly Recommended",
  5: "Outstanding / Exceptional!",
};

export function FeedbackModal({ isOpen, onClose, onFeedbackAdded }: FeedbackModalProps) {
  const [rating, setRating] = useState<number>(5);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [course, setCourse] = useState("");
  const [quote, setQuote] = useState("");
  const [honeypot, setHoneypot] = useState(""); // Bot honeypot

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const activeStars = hoveredRating || rating;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!quote.trim()) {
      setError("Please write your feedback message.");
      return;
    }

    if (!rating || rating < 1 || rating > 5) {
      setError("Please select a rating from 1 to 5 stars.");
      return;
    }

    setLoading(true);

    try {
      let feedbackItem: SubmittedFeedback | null = null;
      try {
        const res = await fetch(`${API_BASE}/api/feedback`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            role: role.trim() || "Student",
            rating,
            quote: quote.trim(),
            course: course.trim() || undefined,
            website: honeypot, // Honeypot
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.feedback) {
            feedbackItem = data.feedback;
          }
        }
      } catch {
        // Local/offline fallback
      }

      if (!feedbackItem) {
        feedbackItem = {
          _id: `local-${Date.now()}`,
          name: name.trim(),
          role: role.trim() || "Student",
          rating,
          quote: quote.trim(),
          course: course.trim() || undefined,
          submittedAt: new Date().toISOString(),
        };
      }

      // Persist to localStorage
      try {
        const stored = JSON.parse(localStorage.getItem("sst_feedbacks") || "[]");
        localStorage.setItem("sst_feedbacks", JSON.stringify([feedbackItem, ...stored]));
      } catch {
        // Ignore storage error
      }

      setSuccess(true);
      if (feedbackItem && onFeedbackAdded) {
        onFeedbackAdded(feedbackItem);
      }

      // Auto close after 2 seconds
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch {
      setError("Could not submit feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setRating(5);
    setHoveredRating(0);
    setName("");
    setRole("");
    setCourse("");
    setQuote("");
    setError("");
    setSuccess(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-modal-title"
    >
      <div
        className="animate-fade-in relative my-auto w-full max-w-[480px] rounded-[28px] bg-white p-6 sm:p-7 shadow-2xl border border-white/60 overflow-hidden"
        style={{ background: "linear-gradient(160deg, #ffffff 65%, #f0f7ff 100%)" }}
      >
        {/* Close Button */}
        <button
          type="button"
          aria-label="Close"
          onClick={handleClose}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        {success ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <h3 className="text-2xl font-bold font-display text-slate-800">
              Thank You for Your Feedback!
            </h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              Your rating and thoughts help fellow students and allow us to continuously improve our
              programs.
            </p>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700">
              <Sparkles className="h-3.5 w-3.5" />
              Rating recorded successfully
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="text-center">
              <div className="mx-auto mb-2.5 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <MessageSquareHeart className="h-6 w-6" />
              </div>
              <h2
                id="feedback-modal-title"
                className="font-display text-xl sm:text-2xl font-bold text-slate-900"
              >
                Share Your Feedback
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                No login or sign-in required. Rate your experience and tell us your thoughts!
              </p>
            </div>

            {/* Error notification */}
            {error && (
              <div className="mt-4 rounded-xl bg-red-50 border border-red-200/80 p-3 text-center text-xs font-medium text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {/* Invisible Honeypot anti-bot field */}
              <div aria-hidden="true" className="hidden">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* 5-Star Rating Selector */}
              <div className="rounded-2xl border border-blue-100 bg-white/80 p-3.5 text-center shadow-xs">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Rating
                </label>
                <div
                  className="flex items-center justify-center gap-2"
                  role="radiogroup"
                  aria-label="Star rating"
                >
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isSelected = star <= activeStars;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="group p-1 transition-transform hover:scale-125 focus:outline-none"
                        aria-label={`Rate ${star} out of 5 stars`}
                        role="radio"
                        aria-checked={rating === star}
                      >
                        <Star
                          className={`h-8 w-8 transition-colors duration-150 ${
                            isSelected
                              ? "fill-amber-400 text-amber-400 drop-shadow-[0_2px_4px_rgba(251,191,36,0.4)]"
                              : "fill-slate-100 text-slate-300 group-hover:text-amber-300"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-xs font-medium text-slate-600 transition-all">
                  <span className="font-bold text-amber-500">{activeStars} / 5</span> —{" "}
                  {RATING_DESCRIPTIONS[activeStars]}
                </p>
              </div>

              {/* Name */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  maxLength={80}
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-input bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Role / College & Course (2 Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    Role / Headline
                  </label>
                  <input
                    type="text"
                    maxLength={80}
                    placeholder="e.g. Student, Trainee"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full rounded-xl border border-input bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    Course / Program
                  </label>
                  <input
                    type="text"
                    maxLength={80}
                    placeholder="e.g. Full-Stack Java, Python"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full rounded-xl border border-input bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Feedback Text Area */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Your Feedback &amp; Review <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  maxLength={1000}
                  placeholder="Tell us what you liked, how the mentorship was, and what skills you gained..."
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full resize-none rounded-xl border border-input bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting Review...
                  </>
                ) : (
                  <>
                    <Star className="h-4 w-4 fill-white" />
                    Submit 5-Star Feedback
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
