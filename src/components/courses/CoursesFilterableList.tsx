'use client';

import React, { useState } from 'react';
import { Course } from '@/lib/types';
import CourseCard from './CourseCard';

interface CoursesFilterableListProps {
  initialCourses: Course[];
}

type FilterCategory = 'all' | 'foundation' | 'secondary' | 'science' | 'commerce' | 'competitive';

interface FilterTab {
  id: FilterCategory;
  label: string;
}

const TABS: FilterTab[] = [
  { id: 'all', label: 'All Programs' },
  { id: 'foundation', label: 'Foundation (6th–8th)' },
  { id: 'secondary', label: 'Secondary (9th–10th)' },
  { id: 'science', label: 'Senior Science (PCM & PCB)' },
  { id: 'commerce', label: 'Senior Commerce' },
  { id: 'competitive', label: 'CUET Prep' },
];

export const CoursesFilterableList: React.FC<CoursesFilterableListProps> = ({ initialCourses }) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('all');

  const filteredCourses = selectedFilter === 'all'
    ? initialCourses
    : initialCourses.filter((course) => course.category === selectedFilter);

  return (
    <div className="courses-filterable-wrapper">
      {/* ── Filter / Tab Bar ── */}
      <div className="courses-filter-section" role="region" aria-label="Course Category Filters">
        <div className="courses-tabs-container" role="tablist" aria-label="Filter courses by category">
          {TABS.map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls="courses-grid"
                id={`tab-${tab.id}`}
                className={`courses-tab-button ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedFilter(tab.id)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Course Grid ── */}
      <div className="courses-grid-section" id="courses-grid" role="tabpanel" aria-labelledby={`tab-${selectedFilter}`}>
        <div className="courses-grid-header">
          <p className="courses-count" aria-live="polite">
            Showing <strong>{filteredCourses.length}</strong> {filteredCourses.length === 1 ? 'program' : 'programs'}
          </p>
        </div>

        <div className="courses-grid">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesFilterableList;
