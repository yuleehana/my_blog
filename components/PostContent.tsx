import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function PostContent({ content }: { content: string }) {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => {
            const id = String(children).replace(/\s+/g, '-').toLowerCase();
            return (
              <h2
                id={id}
                className="text-content-title mb-4 text-text-point border-b pb-4 border-text-2/30">
                {children}
              </h2>
            );
          },
          p: ({ children }) => (
            <p className="text-24 leading-relaxed mb-25 text-text-2">{children}</p>
          ),
        }}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
