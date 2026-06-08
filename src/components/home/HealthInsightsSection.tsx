import { getPublishedPosts } from "@/lib/content";
import HealthInsights from "./HealthInsights";

export default async function HealthInsightsSection() {
  const posts = (await getPublishedPosts("health-insights")).slice(0, 3);
  return <HealthInsights posts={posts} />;
}
