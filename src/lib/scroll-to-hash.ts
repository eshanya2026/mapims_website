export const SITE_HEADER_OFFSET = 112;

export function scrollToElementById(
  id: string,
  behavior: ScrollBehavior = "smooth"
) {
  const el = document.getElementById(id);
  if (!el) return false;

  const top =
    el.getBoundingClientRect().top + window.scrollY - SITE_HEADER_OFFSET;
  window.scrollTo({ top, behavior });
  return true;
}

export function scrollToHashWithRetry(
  id: string,
  behavior: ScrollBehavior = "smooth"
) {
  const attempt = () => scrollToElementById(id, behavior);

  requestAnimationFrame(attempt);
  setTimeout(attempt, 150);
  setTimeout(attempt, 400);

  return attempt();
}
