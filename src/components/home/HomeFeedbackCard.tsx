"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star,
  ExternalLink,
  Send,
  MessageSquareHeart,
  Sparkles,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const FEEDBACK_PORTAL_URL = "https://feedback.mapims.edu.in/feedback/";
const FEEDBACK_GIVE_URL = "https://feedback.mapims.edu.in/feedback/give";

const RATING_DESCRIPTIONS: Record<
  number,
  { label: string; tone: string; emoji: string }
> = {
  1: { label: "Needs Improvement", tone: "text-amber-700 bg-amber-50 border-amber-200", emoji: "🙁" },
  2: { label: "Fair Care", tone: "text-amber-700 bg-amber-50 border-amber-200", emoji: "😐" },
  3: { label: "Good Experience", tone: "text-blue-700 bg-blue-50 border-blue-200", emoji: "🙂" },
  4: { label: "Very Good", tone: "text-emerald-700 bg-emerald-50 border-emerald-200", emoji: "😊" },
  5: { label: "Excellent Care", tone: "text-emerald-800 bg-emerald-50 border-emerald-200", emoji: "🌟" },
};

export default function HomeFeedbackCard() {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Reset submitting state when navigating back via browser history (bfcache)
  useEffect(() => {
    const handlePageShow = () => {
      setIsSubmitting(false);
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  const activeRating = hoverRating || rating;
  const currentDesc = RATING_DESCRIPTIONS[activeRating] || RATING_DESCRIPTIONS[5];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedMsg = message.trim();
    if (!trimmedMsg) {
      setError("Please write your feedback message before submitting.");
      return;
    }

    setIsSubmitting(true);

    const trimmedName = name.trim();
    const params = [
      `star=${encodeURIComponent(rating)}`,
      `msg=${encodeURIComponent(trimmedMsg)}`,
    ];
    if (trimmedName) {
      params.push(`name=${encodeURIComponent(trimmedName)}`);
    }

    const targetUrl = `${FEEDBACK_GIVE_URL}?${params.join("&")}`;

    // Fallback timer so the button resets if navigation is cancelled or back button is clicked
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);

    // Redirect to feedback URL
    window.location.href = targetUrl;
  };

  const handlePortalRedirect = () => {
    window.location.href = FEEDBACK_PORTAL_URL;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-16 md:mt-20 rounded-3xl border border-slate-200/90 bg-gradient-to-b from-white via-slate-50/50 to-white p-6 sm:p-8 lg:p-10 shadow-xl shadow-slate-200/50"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-start">
        {/* Left Column: Context & Portal Shortcut (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-red-50 border border-red-100 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
              <MessageSquareHeart className="h-3.5 w-3.5" />
              <span>Patient Experience &amp; Feedback</span>
            </div>

            <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Share Your Hospital <span className="text-red-600">Feedback</span>
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Your feedback guides our doctors, nurses, and administrative teams
              to maintain compassionate, world-class healthcare. Rate your visit
              below or visit our official feedback portal.
            </p>
          </div>

          {/* Quick Portal Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>Official Patient Feedback Portal</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Looking for detailed surveys, department assessments, or paper upload?
              Access the dedicated portal directly.
            </p>
            <a
              href={FEEDBACK_PORTAL_URL}
              onClick={(e) => {
                e.preventDefault();
                handlePortalRedirect();
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 hover:underline transition"
            >
              <span>feedback.mapims.edu.in</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-3 pt-2 text-xs text-slate-400">
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-6 w-6 rounded-full bg-amber-100 border border-white flex items-center justify-center text-[10px] text-amber-600 font-bold"
                >
                  ★
                </div>
              ))}
            </div>
            <span>Every rating is reviewed by hospital administration</span>
          </div>
        </div>

        {/* Right Column: Interactive Feedback Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Star Rating with Range Select */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-slate-900">
                  Rate Your Experience <span className="text-red-500">*</span>
                </label>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${currentDesc.tone}`}
                >
                  <span>{currentDesc.emoji}</span>
                  <span>
                    {activeRating} / 5 — {currentDesc.label}
                  </span>
                </span>
              </div>

              {/* 5 Stars Interactive Selection */}
              <div className="flex items-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((starVal) => {
                  const isFilled = starVal <= activeRating;
                  return (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setRating(starVal)}
                      onMouseEnter={() => setHoverRating(starVal)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="group relative p-1.5 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg cursor-pointer"
                      aria-label={`${starVal} star${starVal > 1 ? "s" : ""}`}
                    >
                      <Star
                        className={`h-8 w-8 sm:h-9 sm:w-9 transition-colors ${
                          isFilled
                            ? "fill-amber-400 text-amber-400 drop-shadow-sm"
                            : "fill-slate-100 text-slate-300 group-hover:text-amber-200"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Optional Patient Name */}
            <div>
              <label
                htmlFor="feedback-name"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                Your Name <span className="text-slate-400 text-[11px] font-normal lowercase">(optional)</span>
              </label>
              <input
                id="feedback-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              />
            </div>

            {/* 3. Text Area for Feedback Message */}
            <div>
              <label
                htmlFor="feedback-message"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                Your Feedback Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="feedback-message"
                rows={4}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Tell us about your experience with our doctors, clinical care, nursing, or hospital facilities..."
                className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition focus:outline-none focus:ring-2 resize-y ${
                  error
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 bg-red-50/20"
                    : "border-slate-200 focus:border-red-500 focus:ring-red-500/20"
                }`}
              />
              {error && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 font-medium">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{error}</span>
                </p>
              )}
            </div>

            {/* 4. Action Buttons: 1. Feedback Portal, 2. Submit */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Button 1: Feedback Portal */}
              <button
                type="button"
                onClick={handlePortalRedirect}
                className="order-2 sm:order-1 inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 cursor-pointer"
              >
                <ExternalLink className="h-4 w-4 text-slate-500" />
                <span>Feedback Portal</span>
              </button>

              {/* Button 2: Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="order-1 sm:order-2 inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-6 text-sm font-bold text-white shadow-lg shadow-red-600/30 transition hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:opacity-70 cursor-pointer"
              >
                <Send className="h-4 w-4" />
                <span>{isSubmitting ? "Redirecting..." : "Submit Feedback"}</span>
              </button>
            </div>

            <p className="text-center text-[11px] text-slate-400 leading-relaxed">
              Clicking <strong>Submit</strong> will transfer your rating and message to the secure MAPIMS Feedback system.
            </p>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
