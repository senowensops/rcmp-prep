import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blog/posts';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function BlogSlider() {
  const recent = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className="px-6 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-head text-xs font-bold uppercase tracking-[0.2em] text-[var(--red)]">
              From the Blog
            </p>
            <h2 className="mt-1 font-head text-4xl font-extrabold uppercase leading-tight tracking-[0.03em] text-white sm:text-5xl">
              Latest Guides &amp; Tips
            </h2>
          </div>
          <Link
            href="/blog"
            className="shrink-0 font-head text-sm font-bold uppercase tracking-[0.1em] text-white/50 transition hover:text-white"
          >
            View All Articles →
          </Link>
        </div>

        {/* Cards — snap scroll on mobile, 3-col grid on desktop */}
        <div
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0"
          style={{ scrollbarWidth: 'none' }}
        >
          {recent.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex w-[80vw] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#161616] transition hover:-translate-y-1 hover:border-white/20 sm:w-auto"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 80vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-[var(--red)] px-3 py-1 font-head text-xs font-bold uppercase tracking-[0.1em] text-white">
                  {post.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="mb-2 text-xs text-white/35">{formatDate(post.date)}</p>
                <h3 className="font-head text-lg font-extrabold uppercase leading-tight tracking-[0.02em] text-white transition group-hover:text-[var(--red)]">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/50 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-4 font-head text-sm font-bold uppercase tracking-[0.1em] text-[var(--red)]">
                  Read →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
