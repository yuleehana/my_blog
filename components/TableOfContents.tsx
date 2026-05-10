'use client';

interface TocItem {
  title: string;
  id: string;
}

export default function TableOfContents({ toc }: { toc: TocItem[] }) {
  const scrollTold = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-100 right-1 w-67.5 hidden xl:block">
      <ul className="flex flex-col gap-6 border-l border-text-primary/30 pl-6">
        {toc.map((item) => (
          <li key={item.id}>
            <button
              className="text-20 text-text-2 hover:text-text-point transition-colors text-left"
              onClick={() => scrollTold(item.id)}>
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
