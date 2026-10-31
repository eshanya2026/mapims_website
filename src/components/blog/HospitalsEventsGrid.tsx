"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Sparkles, Clock, Video, Play } from "lucide-react";
import type { ContentPost } from "@/lib/content";

type HospitalsEventsGridProps = {
  posts: ContentPost[];
};

type EventFilter = "all" | "incoming" | "past";

export default function HospitalsEventsGrid({ posts }: HospitalsEventsGridProps) {
  const [filter, setFilter] = useState<EventFilter>("all");

  const incomingEvents = useMemo(
    () => posts.filter((p) => Boolean(p.isIncoming)),
    [posts]
  );

  const pastEvents = useMemo(
    () => posts.filter((p) => !p.isIncoming),
    [posts]
  );

  const filteredPosts = useMemo(() => {
    if (filter === "incoming") return incomingEvents;
    if (filter === "past") return pastEvents;
    // For "all", incoming events come first
    return [...incomingEvents, ...pastEvents];
  }, [filter, incomingEvents, pastEvents]);

  return (
    <section className="section-padding bg-slate-50/50 py-12 md:py-16">
      <div className="page-container">
        {/* Filter Navigation */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                filter === "all"
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900"
              }`}
            >
              All Events ({posts.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("incoming")}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                filter === "incoming"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              Incoming Events ({incomingEvents.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter("past")}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                filter === "past"
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900"
              }`}
            >
              Past Events ({pastEvents.length})
            </button>
          </div>

          <span className="text-xs text-slate-500 hidden sm:inline-block">
            {filter === "all"
              ? "Showing incoming events first"
              : filter === "incoming"
              ? "Showing upcoming & incoming events only"
              : "Showing past events archive"}
          </span>
        </div>

        {/* When viewing All and there are incoming events, render Incoming first under an active header */}
        {filter === "all" && incomingEvents.length > 0 ? (
          <div className="space-y-16">
            {/* INCOMING EVENTS (FIRST) */}
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                    Incoming Events
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                      {incomingEvents.length} Upcoming
                    </span>
                  </h2>
                  <p className="text-sm text-slate-500">
                    Join our upcoming health camps, community outreach programs, and special medical events.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {incomingEvents.map((post, index) => (
                  <EventCard key={post.slug} post={post} index={index} isIncoming />
                ))}
              </div>
            </div>

            {/* PAST EVENTS */}
            {pastEvents.length > 0 ? (
              <div className="border-t border-slate-200/80 pt-12">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                      Past Events
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                        {pastEvents.length} Past
                      </span>
                    </h2>
                    <p className="text-sm text-slate-500">
                      Highlights and records from previously completed healthcare camps and programs.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {pastEvents.map((post, index) => (
                    <EventCard key={post.slug} post={post} index={index} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          /* Filtered or single list view */
          <>
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post, index) => (
                  <EventCard
                    key={post.slug}
                    post={post}
                    index={index}
                    isIncoming={Boolean(post.isIncoming)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="text-slate-500">
                  {filter === "incoming"
                    ? "No incoming events announced at this moment. Please check back soon!"
                    : "No events found in this category."}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function EventCard({
  post,
  index,
  isIncoming,
}: {
  post: ContentPost;
  index: number;
  isIncoming?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl ${
        isIncoming
          ? "border-2 border-emerald-500/30 hover:border-emerald-500"
          : "border border-slate-100 hover:border-red-100"
      }`}
    >
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {isIncoming ? (
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
              </span>
              Incoming Event
            </span>
          ) : null}
          {post.video ? (
            <span className="flex items-center gap-1.5 rounded-full bg-slate-900/90 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm backdrop-blur-sm">
              <Video className="h-3 w-3 text-red-400" />
              Video
            </span>
          ) : null}
          <div className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-600 shadow-sm backdrop-blur-sm">
            {post.category}
          </div>
        </div>
        {post.video ? (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950/60 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-red-600/90 shadow-xl">
              <Play className="h-5 w-5 fill-white translate-x-0.5" />
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center text-sm text-slate-500">
          <Calendar className="mr-2 h-4 w-4 shrink-0 text-slate-400" />
          {post.date}
        </div>
        <h3 className="mb-3 line-clamp-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-red-600">
          {post.title}
        </h3>
        <p className="mb-6 line-clamp-2 flex-1 text-sm text-slate-600">
          {post.excerpt}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-sm font-semibold text-red-600 group-hover:text-red-700 group-hover:underline"
        >
          Read Details & Schedule <ArrowRight className="ml-1.5 h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}
