import { redirect } from "next/navigation";

type NewPostPageProps = {
  searchParams: Promise<{ section?: string }>;
};

export default async function NewPostPage({ searchParams }: NewPostPageProps) {
  const { section } = await searchParams;
  const query = section ? `?new=1&section=${section}` : "?new=1";
  redirect(`/admin/posts${query}`);
}
