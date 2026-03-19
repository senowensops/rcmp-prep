import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blog/posts';

export const metadata: Metadata = {
  title: 'RCMP Prep Blog | Guides & Tips for the Online Assessment',
  description:
    'Expert tips, guides, and strategies for passing the RCMP Online Assessment and navigating the application process.',
  alternates: {
    canonical: 'https://rcmpprep.ca/blog',
  },
  openGraph: {
    title: 'RCMP Prep Blog | Guides & Tips for the Online Assessment',
    description:
      'Expert tips, guides, and strategies for passing the RCMP Online Assessment and navigating the application process.',
    url: 'https://rcmpprep.ca/blog',
    siteName: 'RCMPPrep.ca',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RCMP Prep Blog | Guides & Tips for the Online Assessment',
    description:
      'Expert tips, guides, and strategies for passing the RCMP Online Assessment and navigating the application process.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'RCMP Prep Blog',
  description:
    'Expert tips, guides, and strategies for passing the RCMP Online Assessment and navigating the application process.',
  url: 'https://rcmpprep.ca/blog',
  publisher: {
    '@type': 'Organization',
    name: 'RCMPPrep.ca',
    url: 'https://rcmpprep.ca',
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPage() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-[var(--dark)] text-white">
        {/* Nav */}
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-6 sm:px-8">
          <Link
            href="/"
            className="font-head text-2xl font-extrabold uppercase tracking-[0.08em] text-white"
          >
            RCMP<span className="text-[var(--red)]">PREP</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/blog"
              className="font-head text-sm font-bold uppercase tracking-[0.12em] text-white"
            >
              Blog
            </Link>
            <Link
              href="/sample"
              className="rounded-full border border-[var(--red)] bg-[var(--red)] px-5 py-2.5 font-head text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[var(--red-dk)]"
            >
              Try Free
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <header className="border-b border-white/10 px-6 py-16 text-center sm:px-8 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--red)]/30 bg-[var(--red)]/10 px-4 py-1.5 font-head text-xs font-bold uppercase tracking-[0.18em] text-[var(--red)]">
              Resources & Guides
            </div>
            <h1 className="font-head text-5xl font-extrabold uppercase leading-[0.95] tracking-[0.04em] text-white sm:text-6xl">
              RCMP Prep Blog
            </h1>
            <p className="mt-5 text-lg text-white/60">
              Guides and tips to help you prepare and succeed.
            </p>
          </div>
        </header>

        {/* Grid */}
        <main className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111] transition hover:-translate-y-1 hover:border-white/20"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-[var(--red)] px-3 py-1 font-head text-xs font-bold uppercase tracking-[0.12em] text-white">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-3 text-xs text-white/40">
                    <span>{formatDate(post.date)}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="font-head text-xl font-extrabold uppercase leading-tight tracking-[0.03em] text-white transition group-hover:text-[var(--red)]">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 font-head text-sm font-bold uppercase tracking-[0.1em] text-[var(--red)]">
                    Read More →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>

        {/* Footer CTA */}
        <section className="border-t border-white/10 px-6 py-16 text-center sm:px-8">
          <div className="mx-auto max-w-xl">
            <p className="font-head text-sm font-bold uppercase tracking-[0.15em] text-[var(--red)]">
              Ready to practice?
            </p>
            <h2 className="mt-2 font-head text-3xl font-extrabold uppercase tracking-[0.04em] text-white sm:text-4xl">
              Put Your Prep Into Action
            </h2>
            <p className="mt-4 text-white/55">
              Our practice tests mirror the real OEA — all 6 sections, timed, with full explanations.
            </p>
            <Link
              href="/sample"
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-[var(--red)] px-8 py-4 font-head text-lg font-bold uppercase tracking-[0.08em] text-white transition hover:-translate-y-0.5 hover:bg-[var(--red-dk)]"
            >
              Try Free Sample →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
