import { after } from "next/server";
import type { PostRecord } from "@/lib/db/types";
import {
  notifySubscribersOfPublishedPost,
  shouldAnnouncePostToNewsletter,
} from "@/lib/newsletter-publish-notifications";

export function scheduleNewsletterAnnouncement(
  post: PostRecord,
  options: { wasPublished: boolean }
) {
  if (!post.published || options.wasPublished) return;
  if (!shouldAnnouncePostToNewsletter(post.section)) return;

  after(async () => {
    await notifySubscribersOfPublishedPost(post);
  });
}
