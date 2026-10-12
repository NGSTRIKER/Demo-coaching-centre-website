'use client';

import React, { useState } from 'react';
import { EducationalResource } from '@/lib/resources-data';
import ResourceCard from './ResourceCard';

interface ResourceListWithFilterProps {
  resources: EducationalResource[];
  subjects: string[];
}

export default function ResourceListWithFilter({
  resources,
  subjects
}: ResourceListWithFilterProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredResources = resources.filter((resource) => {
    const matchesSubject =
      selectedSubject === 'All' || resource.subject.toLowerCase() === selectedSubject.toLowerCase();
    
    const matchesSearch =
      searchQuery.trim() === '' ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSubject && matchesSearch;
  });

  return (
    <div className="resources-filter-section">
      <div className="resources-toolbar">
        {/* Subject Filter Tabs */}
        <div className="filter-tabs-wrapper" role="tablist" aria-label="Filter resources by subject">
          {subjects.map((subject) => {
            const isActive = selectedSubject.toLowerCase() === subject.toLowerCase();
            return (
              <button
                key={subject}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`filter-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedSubject(subject)}
              >
                {subject}
                {subject === 'All' ? (
                  <span className="tab-count">{resources.length}</span>
                ) : (
                  <span className="tab-count">
                    {resources.filter((r) => r.subject.toLowerCase() === subject.toLowerCase()).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Search Input */}
        <div className="search-bar-wrapper">
          <svg
            className="search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            className="resources-search-input"
            placeholder="Search guides, formulas, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search resources"
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Results Meta Info */}
      <div className="filter-results-status" aria-live="polite">
        Showing <span className="results-bold">{filteredResources.length}</span>{' '}
        {filteredResources.length === 1 ? 'guide' : 'guides'}
        {selectedSubject !== 'All' && <span> in <strong>{selectedSubject}</strong></span>}
        {searchQuery && <span> matching &ldquo;{searchQuery}&rdquo;</span>}
      </div>

      {/* Grid of Resource Cards */}
      {filteredResources.length > 0 ? (
        <div className="resources-grid">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <div className="no-resources-found">
          <div className="empty-state-icon" aria-hidden="true">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" />
            </svg>
          </div>
          <h3 className="empty-state-title">No resources match your selection</h3>
          <p className="empty-state-text">
            Try choosing a different subject filter or resetting your search query.
          </p>
          <button
            type="button"
            className="reset-filters-btn"
            onClick={() => {
              setSelectedSubject('All');
              setSearchQuery('');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
