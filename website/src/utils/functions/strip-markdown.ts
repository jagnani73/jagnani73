export function stripMarkdown(md: string): string {
  return md
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/^[-*]\s/gm, "")
    .replace(/\n+/g, " ")
    .trim();
}
