export function extractToc(content: string) {
  const regex = /##\s+(.*)/g;
  const matches = [...content.matchAll(regex)];

  return matches.map((match) => {
    const title = match[1];
    const id = title.replace(/\s+/g, '-').toLowerCase();

    return { title, id };
  });
}
