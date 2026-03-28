import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blog/posts';
import { BlogShareButtons } from '@/components/blog/BlogShareButtons';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | RCMPPrep.ca`,
    description: post.excerpt,
    alternates: {
      canonical: `https://rcmpprep.ca/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://rcmpprep.ca/blog/${post.slug}`,
      siteName: 'RCMPPrep.ca',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.coverImage,
          width: 800,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'RCMPPrep.ca',
    },
    publisher: {
      '@type': 'Organization',
      name: 'RCMPPrep.ca',
      url: 'https://rcmpprep.ca',
    },
    url: `https://rcmpprep.ca/blog/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://rcmpprep.ca/blog/${post.slug}`,
    },
  };

  const faqJsonLd = post.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
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
              className="font-head text-sm font-bold uppercase tracking-[0.12em] text-white/70 transition hover:text-white"
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

        {/* Back link */}
        <div className="mx-auto max-w-3xl px-6 pb-4 sm:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-head text-sm font-bold uppercase tracking-[0.1em] text-white/40 transition hover:text-white/70"
          >
            ← All Articles
          </Link>
        </div>

        {/* Cover image */}
        <div className="relative mx-auto max-w-5xl overflow-hidden px-6 sm:px-8">
          <div className="relative h-64 w-full overflow-hidden rounded-2xl sm:h-96">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 1024px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </div>

        {/* Article */}
        <article className="mx-auto max-w-3xl px-6 py-10 sm:px-8">
          {/* Meta */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[var(--red)] px-3 py-1 font-head text-xs font-bold uppercase tracking-[0.12em] text-white">
              {post.category}
            </span>
            <span className="text-sm text-white/40">{formatDate(post.date)}</span>
            <span className="text-sm text-white/30">·</span>
            <span className="text-sm text-white/40">{post.readTime}</span>
          </div>

          <h1 className="font-head text-4xl font-extrabold uppercase leading-[0.95] tracking-[0.03em] text-white sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-xl text-white/55 leading-relaxed">
            {post.subtitle}
          </p>

          {/* Content */}
          <div
            className="prose mt-10"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* FAQ Section */}
          {post.faqs.length > 0 && (
            <section className="mt-14 border-t border-white/10 pt-10">
              <h2 className="font-head text-2xl font-extrabold uppercase tracking-[0.04em] text-white">
                Frequently Asked Questions
              </h2>
              <dl className="mt-6 space-y-0 divide-y divide-white/10">
                {post.faqs.map((faq, i) => (
                  <div key={i} className="py-5">
                    <dt className="text-lg font-semibold text-white/90">
                      {faq.question}
                    </dt>
                    <dd className="mt-2 text-base leading-relaxed text-white/55">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {/* Sources */}
          {post.sources && post.sources.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wide mb-4">Sources</h3>
              <ol className="list-decimal list-inside space-y-2">
                {post.sources.map((source, i) => (
                  <li key={i} className="text-sm text-white/50">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--red)] hover:underline"
                    >
                      {source.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Share */}
          <div className="mt-12 border-t border-white/10 pt-8">
            <BlogShareButtons title={post.title} slug={post.slug} />
          </div>

          {/* CTA */}
          <div className="mt-10 rounded-2xl border border-[var(--red)]/25 bg-[var(--red)]/10 p-8 text-center">
            <p className="font-head text-sm font-bold uppercase tracking-[0.15em] text-[var(--red)]">
              Ready to practice?
            </p>
            <h2 className="mt-2 font-head text-3xl font-extrabold uppercase tracking-[0.04em] text-white">
              Put Your Prep Into Action
            </h2>
            <p className="mt-3 text-white/55">
              Practice tests built to mirror the real OEA — all 6 sections, timed, with full explanations.
            </p>
            <Link
              href="/test/1"
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-[var(--red)] px-8 py-4 font-head text-lg font-bold uppercase tracking-[0.08em] text-white transition hover:-translate-y-0.5 hover:bg-[var(--red-dk)]"
            >
              Start Full Practice Test →
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
