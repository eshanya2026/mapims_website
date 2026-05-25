"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowRight, X } from "lucide-react";
import { getPostsForSection, type BlogPost, type BlogSection } from "@/data/blog-posts";

type BlogGridProps = {
  section: BlogSection;
};

export default function BlogGrid({ section }: BlogGridProps) {
  const posts = getPostsForSection(section);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-red-600 uppercase tracking-wider">
                  {post.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center text-slate-500 text-sm mb-3">
                  <Calendar className="w-4 h-4 mr-2 shrink-0" />
                  {post.date}
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedPost(post)}
                  className="inline-flex items-center text-red-600 font-semibold text-sm hover:underline text-left"
                >
                  Read More <ArrowRight className="ml-1 w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="text-center text-slate-500 py-12">No articles published yet.</p>
        )}
      </div>

      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 z-10"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-48 sm:h-56 object-cover rounded-t-2xl"
              />
              <div className="p-6 sm:p-8">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                  {selectedPost.category}
                </span>
                <p className="text-sm text-slate-500 mt-2 mb-3">{selectedPost.date}</p>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {selectedPost.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{selectedPost.content}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
