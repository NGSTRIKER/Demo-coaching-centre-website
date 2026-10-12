import React from 'react';
import Link from 'next/link';
import { Course } from '@/lib/types';

export interface CourseCardProps {
  course: Course;
}

// Category bar color and category label mapping
const CATEGORY_META: Record<
  Course['category'],
  { label: string; accentColor: string; bgTone: string }
> = {
  foundation: {
    label: 'Foundation (6th-8th)',
    accentColor: '#1a7a4a', // Forest green
    bgTone: '#e6f4ed',
  },
  secondary: {
    label: 'Secondary (9th-10th)',
    accentColor: '#2a5a8c', // Muted navy / info
    bgTone: '#e8eef4',
  },
  science: {
    label: 'Senior Science (11th-12th)',
    accentColor: '#1a3a5c', // Primary deep navy
    bgTone: '#e8eef4',
  },
  commerce: {
    label: 'Senior Commerce (11th-12th)',
    accentColor: '#c4532a', // Terracotta accent
    bgTone: '#fdf0ec',
  },
  competitive: {
    label: 'Competitive Entrance',
    accentColor: '#8a4baf', // Purple accent
    bgTone: '#f5effb',
  },
};

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const meta = CATEGORY_META[course.category] || {
    label: 'Academic Program',
    accentColor: '#1a3a5c',
    bgTone: '#f1f3f5',
  };

  return (
    <article className="course-card" style={{ '--card-top-color': meta.accentColor } as React.CSSProperties}>
      <div className="course-card-top-bar" />

      <div className="course-card-content">
        <div className="course-card-header">
          <div className="course-card-meta">
            <span
              className="course-category-tag"
              style={{ color: meta.accentColor, backgroundColor: meta.bgTone }}
            >
              {meta.label}
            </span>
            <span className="course-classes-badge">{course.classes}</span>
          </div>

          <h3 className="course-card-title">
            <Link href={`/courses/${course.slug}`} className="course-card-title-link">
              {course.title}
            </Link>
          </h3>
        </div>

        {course.boards && course.boards.length > 0 && (
          <div className="course-boards-list" aria-label="Supported boards">
            {course.boards.map((board) => (
              <span key={board} className="course-board-badge">
                {board}
              </span>
            ))}
          </div>
        )}

        <p className="course-card-description">{course.shortDescription}</p>

        {course.subjects && course.subjects.length > 0 && (
          <div className="course-subjects-preview">
            <span className="course-subjects-label">Key Subjects:</span>
            <ul className="course-subjects-tags">
              {course.subjects.slice(0, 4).map((subject) => (
                <li key={subject} className="course-subject-tag">
                  {subject}
                </li>
              ))}
              {course.subjects.length > 4 && (
                <li className="course-subject-tag course-subject-more">
                  +{course.subjects.length - 4} more
                </li>
              )}
            </ul>
          </div>
        )}

        <div className="course-card-footer">
          <Link href={`/courses/${course.slug}`} className="course-card-link">
            <span>View Details</span>
            <span className="course-card-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
