import { getFeaturedNewsAndEvents } from "@/lib/content";
import NewsEvents from "./NewsEvents";

export default async function NewsEventsSection() {
  const posts = await getFeaturedNewsAndEvents(3);
  return <NewsEvents posts={posts} />;
}
