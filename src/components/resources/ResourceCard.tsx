import React from 'react';
import Link from 'next/link';
import { EducationalResource } from '@/lib/resources-data';

interface ResourceCardProps {
  resource: EducationalResource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  // Map subjects to badge variant classes or colors
  const subjectSlug = resource.subject.toLowerCase().replace(/\s+/g, '-');

  return (
    <article className="resource-card" data-subject={subjectSlug}>
      <div className="resource-card-header">
        <span className={`subject-badge badge-${subjectSlug}`}>
          {resource.subject}
        </span>
        {resource.classGrade && (
          <span className="grade-badge">{resource.classGrade}</span>
        )}
      </div>

      <div className="resource-card-body">
        <h3 className="resource-card-title">
          <Link href={`/resources/${resource.slug}`}>
            {resource.title}
          </Link>
        </h3>
        <p className="resource-card-description">
          {resource.description}
        </p>
      </div>

      <div className="resource-card-footer">
        <div className="resource-card-meta">
          <span className="meta-item read-time">
            <svg
              className="meta-icon"
              width="15"
              height="15"
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
          <span className="meta-separator">•</span>
          <time className="meta-item date" dateTime={resource.publishedDate}>
            {new Date(resource.publishedDate).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </time>
        </div>

        <Link
          href={`/resources/${resource.slug}`}
          className="read-more-link"
          aria-label={`Read full guide: ${resource.title}`}
        >
          <span>Read More</span>
          <svg
            className="arrow-icon"
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
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
