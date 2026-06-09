import { redirect } from "next/navigation";

type EditPostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  redirect(`/admin/posts?edit=${id}`);
}
