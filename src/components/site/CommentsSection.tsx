import { useState, useEffect, type FormEvent } from "react";
import { MessageCircle, Send, Shield, Clock, CheckCircle2, Sparkles } from "lucide-react";
import { API_BASE } from "@/lib/constants";

interface PublicComment {
  _id: string;
  name: string;
  message: string;
  adminReply: string;
  submittedAt: string;
}

export function CommentsSection() {
  const [comments, setComments] = useState<PublicComment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Fetch approved comments
  useEffect(() => {
    fetch(`${API_BASE}/api/comments`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data)) {
          setComments(data);
        }
      })
      .catch(() => {
        // Ignore fetch error
      })
      .finally(() => setLoadingComments(false));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!message.trim()) {
      setError("Please enter your comment.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim() || undefined,
          message: message.trim(),
          website: honeypot,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        const data = await res.json();
        setError(data.message || "Could not submit comment. Please try again.");
      }
    } catch {
      setError("Could not connect to the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHrs < 24) return `${diffHrs}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <div className="mt-14 lg:mt-16 mx-auto max-w-5xl">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200/80 px-3.5 py-1 text-xs font-semibold text-blue-700 mb-3">
          <MessageCircle className="h-3.5 w-3.5 text-blue-500" />
          <span>Community Discussion</span>
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0B2559] tracking-tight">
          Comments &amp; Discussion
        </h3>
        <p className="mt-1.5 text-sm text-slate-600 max-w-md mx-auto">
          Share your thoughts, ask questions, or leave a message. Our team will respond!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Comment Form */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-7 shadow-sm sticky top-8">
            {success ? (
              <div className="py-6 text-center space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-md shadow-emerald-500/10">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h4 className="text-lg font-bold font-display text-slate-800">
                  Comment Submitted!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xs mx-auto leading-relaxed">
                  Your comment has been sent for review. It will appear here once approved by our
                  admin.
                </p>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  <Clock className="h-3.5 w-3.5" />
                  Pending Approval
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Write another comment
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Send className="h-4 w-4 text-blue-500" />
                  Leave a Comment
                </h4>

                {/* Honeypot */}
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
                    placeholder="e.g. Priya Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-input bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Email (optional) */}
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    Email <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="email"
                    maxLength={120}
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-input bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    Your Comment <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    maxLength={1000}
                    placeholder="Share your thoughts, questions, or experience..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full resize-none rounded-xl border border-input bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0B2559] to-[#1e40af] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-all hover:from-[#13377a] hover:to-[#1d4ed8] hover:shadow-xl hover:shadow-blue-900/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Post Comment
                    </>
                  )}
                </button>

                <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                  Comments are reviewed before being published. No login required.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Right: Comments List */}
        <div className="lg:col-span-7 space-y-4">
          {loadingComments ? (
            <div className="text-center py-12">
              <span className="h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin inline-block" />
              <p className="mt-2 text-sm text-slate-500">Loading comments...</p>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-12 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50">
              <MessageCircle className="h-10 w-10 text-slate-300 mx-auto" />
              <p className="mt-3 text-sm font-medium text-slate-500">No comments yet</p>
              <p className="mt-1 text-xs text-slate-400">
                Be the first to share your thoughts!
              </p>
            </div>
          ) : (
            comments.map((c) => (
              <div
                key={c._id}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-slate-300/80"
              >
                {/* Comment Header */}
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white shrink-0 shadow-sm">
                    {c.name.charAt(0).toUpperCase()}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold text-slate-800 truncate">
                      {c.name}
                    </span>
                    <span className="block text-[11px] text-slate-400">
                      {formatDate(c.submittedAt)}
                    </span>
                  </div>
                </div>

                {/* Comment Body */}
                <p className="mt-3 text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {c.message}
                </p>

                {/* Admin Reply */}
                {c.adminReply && (
                  <div className="mt-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-3.5 w-3.5 text-blue-600" />
                      <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">
                        Admin Reply
                      </span>
                      <Sparkles className="h-3 w-3 text-blue-400" />
                    </div>
                    <p className="text-sm text-blue-900/80 leading-relaxed whitespace-pre-wrap">
                      {c.adminReply}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
