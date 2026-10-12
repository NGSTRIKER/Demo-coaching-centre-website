import React from 'react';
import Link from 'next/link';
import '@/styles/breadcrumb.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  // Always include Home as first item if not present
  const fullItems: BreadcrumbItem[] =
    items[0]?.href === '/' ? items : [{ label: 'Home', href: '/' }, ...items];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: fullItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `https://aliveinstitute.in${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`breadcrumb-nav ${className}`.trim()}
      >
        <ol className="breadcrumb-list">
          {fullItems.map((item, index) => {
            const isLast = index === fullItems.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="breadcrumb-item">
                {isLast || !item.href ? (
                  <span
                    className="breadcrumb-current"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="breadcrumb-link">
                    {item.label}
                  </Link>
                )}
                {!isLast && (
                  <span className="breadcrumb-separator" aria-hidden="true">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;
