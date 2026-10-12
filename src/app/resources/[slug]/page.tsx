import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getResources,
  getResourceBySlug
} from '@/lib/resources-data';
import ResourceCard from '@/components/resources/ResourceCard';
import '@/styles/resources.css';
import '@/styles/resource-detail.css';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const resources = getResources();
  return resources.map((resource) => ({
    slug: resource.slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    return {
      title: 'Resource Not Found | ALIVE Institute',
      description: 'The requested educational guide could not be found.'
    };
  }

  const siteUrl = 'https://aliveinstitute.in';
  const pageUrl = `${siteUrl}/resources/${resource.slug}`;

  return {
    title: `${resource.title} | ALIVE Institute`,
    description: resource.description,
    keywords: resource.tags,
    authors: [{ name: resource.author.name }],
    openGraph: {
      title: resource.title,
      description: resource.description,
      url: pageUrl,
      type: 'article',
      publishedTime: resource.publishedDate,
      modifiedTime: resource.updatedDate || resource.publishedDate,
      authors: [resource.author.name],
      tags: resource.tags,
      siteName: 'ALIVE Institute Indore'
    },
    twitter: {
      card: 'summary_large_image',
      title: resource.title,
      description: resource.description
    },
    alternates: {
      canonical: pageUrl
    }
  };
}

/**
 * Format markdown-like text elements into semantic HTML elements
 */
function renderSectionContent(content: string) {
  const blocks = content.split('\n\n');

  return blocks.map((block, index) => {
    const trimmed = block.trim();

    // Check for Markdown Table
    if (trimmed.startsWith('|') && trimmed.includes('\n|')) {
      const rows = trimmed
        .split('\n')
        .map((r) => r.trim())
        .filter((r) => r.startsWith('|'));

      if (rows.length >= 2) {
        const headerCells = rows[0]
          .slice(1, -1)
          .split('|')
          .map((c) => c.trim());
        const bodyRows = rows.slice(2); // Skip separator row

        return (
          <div key={index} className="table-responsive-wrapper">
            <table className="article-table">
              <thead>
                <tr>
                  {headerCells.map((th, thIdx) => (
                    <th key={thIdx}>{th.replace(/\*\*/g, '')}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, rIdx) => {
                  const cells = row
                    .slice(1, -1)
                    .split('|')
                    .map((c) => c.trim());
                  return (
                    <tr key={rIdx}>
                      {cells.map((td, tdIdx) => (
                        <td key={tdIdx}>{td.replace(/\*\*/g, '')}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      }
    }

    // Check for math block $$ ... $$
    if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) {
      const formula = trimmed.replace(/^\$\$/g, '').replace(/\$\$$/g, '').trim();
      return (
        <div key={index} className="math-callout" role="region" aria-label="Mathematical formula">
          <code>{formula}</code>
        </div>
      );
    }

    // Check for subheadings ###
    if (trimmed.startsWith('### ')) {
      const title = trimmed.replace(/^### /, '');
      return (
        <h3 key={index} className="subsection-title">
          {title}
        </h3>
      );
    }

    // Check for Unordered list
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const listItems = trimmed
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.startsWith('- ') || line.startsWith('* '));

      return (
        <ul key={index}>
          {listItems.map((item, itemIdx) => {
            const raw = item.replace(/^[-*]\s+/, '');
            // simple inline bold formatter
            const parts = raw.split(/(\*\*.*?\*\*)/g);
            return (
              <li key={itemIdx}>
                {parts.map((part, pIdx) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
                  }
                  return part;
                })}
              </li>
            );
          })}
        </ul>
      );
    }

    // Check for Ordered list
    if (/^\d+\.\s+/.test(trimmed)) {
      const listItems = trimmed
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => /^\d+\.\s+/.test(line));

      return (
        <ol key={index}>
          {listItems.map((item, itemIdx) => {
            const raw = item.replace(/^\d+\.\s+/, '');
            const parts = raw.split(/(\*\*.*?\*\*)/g);
            return (
              <li key={itemIdx}>
                {parts.map((part, pIdx) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
                  }
                  return part;
                })}
              </li>
            );
          })}
        </ol>
      );
    }

    // Standard paragraph with inline bold formatting
    const parts = trimmed.split(/(\*\*.*?\*\*)/g);
    return (
      <p key={index}>
        {parts.map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </p>
    );
  });
}

export default async function ResourceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  const allResources = getResources();
  const relatedResources = allResources
    .filter((r) => r.slug !== resource.slug)
    .slice(0, 2);

  const subjectSlug = resource.subject.toLowerCase().replace(/\s+/g, '-');
  const siteUrl = 'https://aliveinstitute.in';

  // Article JSON-LD Structured Data Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: resource.title,
    description: resource.description,
    image: `${siteUrl}/images/og-resource-preview.png`,
    datePublished: resource.publishedDate,
    dateModified: resource.updatedDate || resource.publishedDate,
    author: {
      '@type': 'Organization',
      name: resource.author.name,
      url: siteUrl
    },
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'ALIVE Institute',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/resources/${resource.slug}`
    },
    articleSection: resource.subject,
    keywords: resource.tags.join(', ')
  };

  return (
    <article className="resource-detail-page">
      {/* Article Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="article-container">
        {/* Breadcrumb Navigation */}
        <nav className="article-breadcrumb" aria-label="Breadcrumb">
          <ol className="breadcrumb-list">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-separator" aria-hidden="true">
              /
            </li>
            <li className="breadcrumb-item">
              <Link href="/resources">Resources</Link>
            </li>
            <li className="breadcrumb-separator" aria-hidden="true">
              /
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <span className="breadcrumb-truncate">{resource.title}</span>
            </li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="article-header">
          <div className="article-badges">
            <span className={`subject-badge badge-${subjectSlug}`}>
              {resource.subject}
            </span>
            {resource.classGrade && (
              <span className="grade-badge">{resource.classGrade}</span>
            )}
          </div>

          <h1 className="article-title">{resource.title}</h1>

          <p className="article-dek">{resource.description}</p>

          <div className="article-meta-bar">
            <div className="author-info">
              <div className="author-avatar" aria-hidden="true">
                AI
              </div>
              <div className="author-details">
                <span className="author-name">{resource.author.name}</span>
                <span className="author-role">
                  {resource.author.role} • {resource.author.department}
                </span>
              </div>
            </div>

            <div className="publishing-meta">
              <time dateTime={resource.publishedDate}>
                Published on{' '}
                {new Date(resource.publishedDate).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </time>
              <span className="reading-time-pill">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {resource.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* Article Layout (Main Body + Sticky Sidebar) */}
        <div className="article-layout">
          {/* Main Content */}
          <div className="article-main-content">
            {resource.sections.map((section) => (
              <section key={section.id} id={section.id} className="content-section">
                <h2 className="section-heading">{section.title}</h2>
                <div className="section-body">{renderSectionContent(section.content)}</div>
              </section>
            ))}

            {/* Subject Tags */}
            <div className="article-tags-wrapper">
              <div className="tags-title">Topics &amp; Key Concepts</div>
              <ul className="tags-list">
                {resource.tags.map((tag) => (
                  <li key={tag} className="tag-item">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            {/* Author Bio Box */}
            <div className="author-bio-card">
              <div className="author-bio-avatar" aria-hidden="true">
                AI
              </div>
              <div className="author-bio-content">
                <h4>{resource.author.name}</h4>
                <div className="author-bio-dept">
                  {resource.author.department} — ALIVE Institute Indore
                </div>
                <p className="author-bio-desc">
                  Curated by experienced coaching mentors dedicated to building deep conceptual
                  clarity, eliminating exam fear, and achieving 95%+ marks in CBSE, ICSE, and MP
                  Board examinations.
                </p>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <aside className="article-sidebar" aria-label="Table of contents & guidance">
            <div className="sticky-sidebar-inner">
              {/* Table of Contents */}
              <nav className="toc-card" aria-label="Table of contents">
                <div className="toc-title">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                  <span>Table of Contents</span>
                </div>
                <ul className="toc-list">
                  {resource.sections.map((section) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`} className="toc-link">
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Sidebar Callout Card */}
              <div className="sidebar-cta-card">
                <span className="cta-card-badge">Personalized Mentorship</span>
                <h3 className="cta-card-title">Struggling with Board Prep?</h3>
                <p className="cta-card-text">
                  Join ALIVE Institute Indore for small batches (max 20 students), weekly diagnostic
                  evaluations, and 1-on-1 doubt clearing sessions.
                </p>
                <Link href="/contact" className="cta-card-btn">
                  Enquire Now
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Resources Section */}
        {relatedResources.length > 0 && (
          <section className="related-resources-section" aria-label="Related educational guides">
            <div className="related-section-header">
              <span className="section-label">CONTINUE LEARNING</span>
              <h2 className="related-section-heading">Related Study Guides</h2>
            </div>
            <div className="related-resources-grid">
              {relatedResources.map((relResource) => (
                <ResourceCard key={relResource.id} resource={relResource} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
