import { useState, type FormEvent } from "react";
import { Star, CheckCircle2, MessageSquarePlus, Sparkles, Send } from "lucide-react";
import { API_BASE } from "@/lib/constants";
import type { SubmittedFeedback } from "./FeedbackModal";

interface WriteYourOwnFeedbackProps {
  onFeedbackAdded: (feedback: SubmittedFeedback) => void;
}

const RATING_DESCRIPTIONS: Record<number, string> = {
  1: "Needs Improvement",
  2: "Fair / Satisfactory",
  3: "Good / Solid Experience",
  4: "Very Good / Highly Recommended",
  5: "Outstanding / Exceptional!",
};

export function WriteYourOwnFeedback({ onFeedbackAdded }: WriteYourOwnFeedbackProps) {
  const [rating, setRating] = useState<number>(5);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [course, setCourse] = useState("");
  const [quote, setQuote] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const activeStars = hoveredRating || rating;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!quote.trim()) {
      setError("Please write your feedback review.");
      return;
    }

    if (!rating || rating < 1 || rating > 5) {
      setError("Please select a rating between 1 and 5 stars.");
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
            website: honeypot,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.feedback) {
            feedbackItem = data.feedback;
          }
        }
      } catch {
        // Fallback for offline local dev environment
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

      // Persist to local storage
      try {
        const stored = JSON.parse(localStorage.getItem("sst_feedbacks") || "[]");
        localStorage.setItem("sst_feedbacks", JSON.stringify([feedbackItem, ...stored]));
      } catch {
        // Ignore storage error
      }

      setSuccess(true);
      onFeedbackAdded(feedbackItem);

      // Reset form fields
      setName("");
      setRole("");
      setCourse("");
      setQuote("");
      setRating(5);
      setHoveredRating(0);
    } catch {
      setError("Could not submit your review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-14 lg:mt-16 mx-auto max-w-5xl rounded-3xl border border-blue-100/90 bg-gradient-to-br from-white via-slate-50/70 to-blue-50/60 p-6 sm:p-8 lg:p-10 shadow-xl shadow-blue-900/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Heading & Context */}
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200/80 px-3.5 py-1 text-xs font-semibold text-amber-700">
            <MessageSquarePlus className="h-3.5 w-3.5 text-amber-500" />
            <span>Student Community Voice</span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0B2559] tracking-tight">
            Write your own
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed">
            Have you completed a course, built a project, or attended our training workshops? Share
            your authentic review and 5-star rating to help future learners!
          </p>

          {/* Highlights */}
          <div className="pt-2 space-y-2.5 text-xs font-medium text-slate-600">
            <div className="flex items-center gap-2.5">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold shrink-0">
                ✓
              </span>
              <span>No sign-in or login required</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-blue-100 text-blue-700 text-[11px] font-bold shrink-0">
                ✓
              </span>
              <span>Appears immediately on the feedback wall above</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-amber-100 text-amber-700 text-[11px] font-bold shrink-0">
                ✓
              </span>
              <span>Interactive 1 to 5 star rating</span>
            </div>
          </div>
        </div>

        {/* Right Column: Review Submission Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-sm">
          {success ? (
            <div className="py-8 text-center space-y-3.5">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-md shadow-emerald-500/10">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-bold font-display text-slate-800">
                Thank You for Your Feedback!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Your 5-star review has been published. It is now live on the student feedback wall
                above!
              </p>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700">
                <Sparkles className="h-3.5 w-3.5" />
                Live on Feedback Wall
              </div>
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Write another review
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Invisible Honeypot for bot protection */}
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

              {/* Interactive 5-Star Rating Selector */}
              <div className="rounded-2xl border border-amber-100/80 bg-amber-50/40 p-3.5 text-center">
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
                          className={`h-7 w-7 transition-colors duration-150 ${
                            isSelected
                              ? "fill-amber-400 text-amber-400 drop-shadow-[0_2px_4px_rgba(251,191,36,0.35)]"
                              : "fill-slate-100 text-slate-300 group-hover:text-amber-300"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <p className="mt-1.5 text-xs font-medium text-slate-600">
                  <span className="font-bold text-amber-600">{activeStars} / 5</span> —{" "}
                  {RATING_DESCRIPTIONS[activeStars]}
                </p>
              </div>

              {/* Error Banner */}
              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 p-2.5 text-center text-xs font-medium text-red-600">
                  {error}
                </div>
              )}

              {/* Name */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  maxLength={80}
                  placeholder="e.g. Tanmay Deshmukh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-input bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Role & Course (2 Columns) */}
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
                    Course / Workshop
                  </label>
                  <input
                    type="text"
                    maxLength={80}
                    placeholder="e.g. Java, Python, AWS"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full rounded-xl border border-input bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Feedback Review Textarea */}
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Your Review &amp; Experience <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  maxLength={1000}
                  placeholder="Share your experience with the courses, mentorship, projects, or placement guidance..."
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full resize-none rounded-xl border border-input bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0B2559] to-[#1e40af] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-all hover:from-[#13377a] hover:to-[#1d4ed8] hover:shadow-xl hover:shadow-blue-900/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting Review...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Review
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
